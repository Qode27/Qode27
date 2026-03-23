import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { AppointmentStatus, BillingStatus, Role, VisitType } from '@prisma/client';
import { prisma } from '@kansalt/prisma';
import { asyncHandler, authGuard, errorHandler, requestContext, requireRoles } from '@kansalt/middleware';
import { env, makeCode } from '@kansalt/utils';
import { z } from 'zod';

const app = express();
const port = Number(env.HMS_SERVICE_PORT ?? 4002);
const attachedSimsRepoPath = 'external/sims-hospital';
const simsModuleCatalog = [
  { key: 'patients', source: 'kansalt-native', status: 'active' },
  { key: 'doctors', source: 'kansalt-native', status: 'active' },
  { key: 'visits', source: 'sims-inspired', status: 'active' },
  { key: 'invoices', source: 'sims-inspired', status: 'active' },
  { key: 'prescriptions', source: 'kansalt-native', status: 'active' },
  { key: 'reports', source: 'sims-inspired', status: 'active' },
  { key: 'ipd', source: 'sims-inspired', status: 'active' },
  { key: 'rooms', source: 'platform-defaults', status: 'active' },
  { key: 'settings', source: 'organization-backed', status: 'active' },
  { key: 'users', source: 'tenant-user-backed', status: 'active' }
] as const;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(requestContext);
app.use(authGuard);

const cuidParamSchema = z.object({ id: z.string().cuid() });

const patientSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(1),
  gender: z.string().min(1),
  phone: z.string().min(8),
  email: z.string().email().optional(),
  dateOfBirth: z.string(),
  address: z.string().min(5),
  bloodGroup: z.string().optional()
});

const doctorSchema = z.object({
  name: z.string().min(2),
  specialization: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  licenseNumber: z.string().min(4)
});

const appointmentSchema = z.object({
  patientId: z.string().cuid(),
  doctorId: z.string().cuid(),
  visitType: z.nativeEnum(VisitType),
  status: z.nativeEnum(AppointmentStatus).default(AppointmentStatus.SCHEDULED),
  scheduledAt: z.string(),
  notes: z.string().optional()
});

const billingSchema = z.object({
  patientId: z.string().cuid(),
  appointmentId: z.string().cuid().optional(),
  amount: z.number().positive(),
  status: z.nativeEnum(BillingStatus).default(BillingStatus.PENDING),
  lineItems: z.array(z.object({
    label: z.string().min(2),
    amount: z.number().positive()
  })).min(1)
});

const invoicePaymentSchema = z.object({
  amount: z.number().positive(),
  note: z.string().optional()
});

const visitNoteSchema = z.object({
  note: z.string().min(2)
});

const transferToIpdSchema = z.object({
  doctorId: z.string().cuid().optional(),
  scheduledAt: z.string().optional(),
  notes: z.string().optional()
});

const ipdAdmissionSchema = z.object({
  patientId: z.string().cuid(),
  doctorId: z.string().cuid(),
  scheduledAt: z.string(),
  notes: z.string().optional()
});

const ipdUpdateSchema = z.object({
  doctorId: z.string().cuid().optional(),
  scheduledAt: z.string().optional(),
  status: z.nativeEnum(AppointmentStatus).optional(),
  notes: z.string().optional()
});

const settingsSchema = z.object({
  name: z.string().min(2).optional(),
  contactEmail: z.string().email().optional().nullable(),
  contactPhone: z.string().min(8).optional().nullable(),
  products: z.array(z.enum(['HMS', 'HRMS'])).optional(),
  featureFlags: z.array(z.string().min(2)).optional(),
  isActive: z.boolean().optional()
});

const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.nativeEnum(Role).optional()
});

const prescriptionSchema = z.object({
  patientId: z.string().cuid(),
  doctorId: z.string().cuid(),
  appointmentId: z.string().cuid().optional(),
  diagnosis: z.string().min(2),
  notes: z.string().optional(),
  medicines: z.array(z.object({
    name: z.string().min(2),
    dosage: z.string().min(1),
    duration: z.string().min(1),
    instructions: z.string().min(1)
  })).min(1)
});

async function nextCode(model: 'patient' | 'doctor' | 'appointment' | 'billing' | 'prescription', organizationId: string) {
  const countMap = {
    patient: prisma.patient.count({ where: { organizationId } }),
    doctor: prisma.doctor.count({ where: { organizationId } }),
    appointment: prisma.appointment.count({ where: { organizationId } }),
    billing: prisma.billing.count({ where: { organizationId } }),
    prescription: prisma.prescription.count({ where: { organizationId } })
  };

  const prefixMap = {
    patient: 'PAT',
    doctor: 'DOC',
    appointment: 'APT',
    billing: 'INV',
    prescription: 'RX'
  };

  return makeCode(prefixMap[model], await countMap[model]);
}

function mapInvoice(bill: any) {
  return {
    id: bill.id,
    invoiceNo: bill.invoiceNumber,
    invoiceType: 'GENERAL',
    subtotal: bill.amount,
    total: bill.amount,
    paidAmount: bill.status === BillingStatus.PAID ? bill.amount : 0,
    dueAmount: bill.status === BillingStatus.PAID ? 0 : bill.amount,
    paymentStatus: bill.status,
    createdAt: bill.createdAt,
    updatedAt: bill.updatedAt,
    patient: 'patient' in bill ? bill.patient : undefined,
    appointment: 'appointment' in bill ? bill.appointment : undefined,
    items: bill.lineItems
  };
}

function mapVisit(visit: any) {
  return {
    id: visit.id,
    visitNo: visit.appointmentNo,
    type: visit.visitType,
    status: visit.status,
    scheduledAt: visit.scheduledAt,
    notes: visit.notes,
    patient: visit.patient,
    doctor: visit.doctor,
    invoiceCount: visit.billings?.length ?? 0,
    prescriptionGenerated: (visit.prescriptions?.length ?? 0) > 0
  };
}

function mapIpdAdmission(visit: any) {
  return {
    id: visit.id,
    admissionNo: visit.appointmentNo,
    status: visit.status,
    admittedAt: visit.scheduledAt,
    notes: visit.notes,
    patient: visit.patient,
    doctor: visit.doctor,
    sourceVisitId: visit.id
  };
}

function buildDefaultRooms(organizationId: string) {
  return [
    {
      id: `${organizationId}-ward-a`,
      ward: 'General Ward',
      name: 'Ward A',
      active: true,
      beds: [
        { id: `${organizationId}-ward-a-bed-1`, bedNumber: 'A-01', active: true, occupied: false },
        { id: `${organizationId}-ward-a-bed-2`, bedNumber: 'A-02', active: true, occupied: false }
      ]
    },
    {
      id: `${organizationId}-icu`,
      ward: 'Critical Care',
      name: 'ICU',
      active: true,
      beds: [
        { id: `${organizationId}-icu-bed-1`, bedNumber: 'ICU-01', active: true, occupied: false },
        { id: `${organizationId}-icu-bed-2`, bedNumber: 'ICU-02', active: true, occupied: false }
      ]
    }
  ];
}

app.get('/health', (_req, res) => {
  res.json({
    service: 'hms-service',
    status: 'ok',
    attachedSimsRepoPath,
    enterpriseModules: simsModuleCatalog
  });
});

app.get('/modules', (_req, res) => {
  res.json({
    attachedSimsRepoPath,
    modules: simsModuleCatalog
  });
});

app.get('/summary', asyncHandler(async (req, res) => {
  const organizationId = req.context.organizationId!;
  const [patients, doctors, appointments, bills] = await Promise.all([
    prisma.patient.count({ where: { organizationId } }),
    prisma.doctor.count({ where: { organizationId } }),
    prisma.appointment.count({ where: { organizationId } }),
    prisma.billing.findMany({ where: { organizationId } })
  ]);

  res.json({
    patients,
    doctors,
    appointments,
    revenue: bills.filter((bill) => bill.status === BillingStatus.PAID).reduce((sum, bill) => sum + bill.amount, 0),
    outstanding: bills.filter((bill) => bill.status === BillingStatus.PENDING).reduce((sum, bill) => sum + bill.amount, 0),
    source: 'kansalt-hms-with-sims-module-catalog'
  });
}));

app.get('/patients', asyncHandler(async (req, res) => {
  const patients = await prisma.patient.findMany({
    where: { organizationId: req.context.organizationId },
    orderBy: { createdAt: 'desc' }
  });
  res.json(patients);
}));

app.get('/patients/:id', asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const patient = await prisma.patient.findFirst({
    where: { organizationId: req.context.organizationId!, id },
    include: {
      appointments: { include: { doctor: true }, orderBy: { scheduledAt: 'desc' } },
      billings: { orderBy: { createdAt: 'desc' } },
      prescriptions: { include: { doctor: true }, orderBy: { createdAt: 'desc' } }
    }
  });

  if (!patient) {
    return res.status(404).json({ message: 'Patient not found' });
  }

  res.json(patient);
}));

app.post('/patients', requireRoles(Role.ADMIN, Role.DOCTOR, Role.RECEPTIONIST), asyncHandler(async (req, res) => {
  const payload = patientSchema.parse(req.body);
  const organizationId = req.context.organizationId!;
  const patient = await prisma.patient.create({
    data: {
      organizationId,
      patientCode: await nextCode('patient', organizationId),
      ...payload,
      dateOfBirth: new Date(payload.dateOfBirth)
    }
  });
  res.status(201).json(patient);
}));

app.patch('/patients/:id', requireRoles(Role.ADMIN, Role.DOCTOR, Role.RECEPTIONIST), asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const payload = patientSchema.partial().parse(req.body);
  const existing = await prisma.patient.findFirst({ where: { organizationId: req.context.organizationId!, id } });

  if (!existing) {
    return res.status(404).json({ message: 'Patient not found' });
  }

  const patient = await prisma.patient.update({
    where: { id },
    data: {
      ...payload,
      ...(payload.dateOfBirth ? { dateOfBirth: new Date(payload.dateOfBirth) } : {})
    }
  });
  res.json(patient);
}));

app.get('/doctors', asyncHandler(async (req, res) => {
  const doctors = await prisma.doctor.findMany({
    where: { organizationId: req.context.organizationId },
    orderBy: { createdAt: 'desc' }
  });
  res.json(doctors);
}));

app.post('/doctors', requireRoles(Role.ADMIN), asyncHandler(async (req, res) => {
  const payload = doctorSchema.parse(req.body);
  const organizationId = req.context.organizationId!;
  const doctor = await prisma.doctor.create({
    data: {
      organizationId,
      employeeCode: await nextCode('doctor', organizationId),
      ...payload
    }
  });
  res.status(201).json(doctor);
}));

app.get('/appointments', asyncHandler(async (req, res) => {
  const appointments = await prisma.appointment.findMany({
    where: { organizationId: req.context.organizationId },
    include: { patient: true, doctor: true },
    orderBy: { scheduledAt: 'asc' }
  });
  res.json(appointments);
}));

app.get('/visits', asyncHandler(async (req, res) => {
  const visits = await prisma.appointment.findMany({
    where: { organizationId: req.context.organizationId },
    include: {
      patient: true,
      doctor: true,
      billings: true,
      prescriptions: true
    },
    orderBy: { scheduledAt: 'desc' }
  });

  res.json({
    data: visits.map((visit) => ({
      ...mapVisit(visit)
    }))
  });
}));

app.get('/visits/:id', asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const visit = await prisma.appointment.findFirst({
    where: { organizationId: req.context.organizationId!, id },
    include: {
      patient: true,
      doctor: true,
      billings: true,
      prescriptions: true
    }
  });

  if (!visit) {
    return res.status(404).json({ message: 'Visit not found' });
  }

  res.json({
    data: {
      ...mapVisit(visit),
      invoices: visit.billings.map((bill) => mapInvoice({ ...bill })),
      prescriptions: visit.prescriptions
    }
  });
}));

app.post('/visits/:id/notes', requireRoles(Role.DOCTOR), asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const payload = visitNoteSchema.parse(req.body);
  const existing = await prisma.appointment.findFirst({ where: { organizationId: req.context.organizationId!, id } });

  if (!existing) {
    return res.status(404).json({ message: 'Visit not found' });
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: {
      notes: existing.notes ? `${existing.notes}\n${payload.note}` : payload.note
    },
    include: { patient: true, doctor: true, billings: true, prescriptions: true }
  });

  res.status(201).json({ data: mapVisit(updated) });
}));

app.post('/appointments', requireRoles(Role.ADMIN, Role.DOCTOR, Role.RECEPTIONIST), asyncHandler(async (req, res) => {
  const payload = appointmentSchema.parse(req.body);
  const organizationId = req.context.organizationId!;
  const appointment = await prisma.appointment.create({
    data: {
      organizationId,
      appointmentNo: await nextCode('appointment', organizationId),
      patientId: payload.patientId,
      doctorId: payload.doctorId,
      visitType: payload.visitType,
      status: payload.status,
      notes: payload.notes,
      scheduledAt: new Date(payload.scheduledAt)
    },
    include: { patient: true, doctor: true }
  });
  res.status(201).json(appointment);
}));

app.patch('/appointments/:id/status', requireRoles(Role.ADMIN, Role.DOCTOR, Role.RECEPTIONIST), asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const { status } = z.object({ status: z.nativeEnum(AppointmentStatus) }).parse(req.body);
  const existing = await prisma.appointment.findFirst({ where: { organizationId: req.context.organizationId!, id } });

  if (!existing) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  const appointment = await prisma.appointment.update({
    where: { id },
    data: { status },
    include: { patient: true, doctor: true }
  });
  res.json(appointment);
}));

app.patch('/visits/:id/status', requireRoles(Role.ADMIN, Role.DOCTOR, Role.RECEPTIONIST), asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const { status } = z.object({ status: z.nativeEnum(AppointmentStatus) }).parse(req.body);
  const existing = await prisma.appointment.findFirst({ where: { organizationId: req.context.organizationId!, id } });

  if (!existing) {
    return res.status(404).json({ message: 'Visit not found' });
  }

  const visit = await prisma.appointment.update({
    where: { id },
    data: { status },
    include: { patient: true, doctor: true }
  });

  res.json({ data: visit });
}));

app.post('/visits/:id/transfer-to-ipd', requireRoles(Role.ADMIN, Role.RECEPTIONIST), asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const payload = transferToIpdSchema.parse(req.body);
  const existing = await prisma.appointment.findFirst({
    where: { organizationId: req.context.organizationId!, id },
    include: { patient: true, doctor: true, billings: true, prescriptions: true }
  });

  if (!existing) {
    return res.status(404).json({ message: 'Visit not found' });
  }

  if (existing.visitType === VisitType.IPD) {
    return res.status(400).json({ message: 'Visit is already marked as IPD' });
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: {
      visitType: VisitType.IPD,
      doctorId: payload.doctorId ?? existing.doctorId,
      scheduledAt: payload.scheduledAt ? new Date(payload.scheduledAt) : existing.scheduledAt,
      notes: payload.notes ?? existing.notes
    },
    include: { patient: true, doctor: true, billings: true, prescriptions: true }
  });

  res.status(201).json({
    data: {
      ...mapVisit(updated),
      transferStatus: 'OPD_TO_IPD_COMPLETED'
    }
  });
}));

app.get('/billing', asyncHandler(async (req, res) => {
  const items = await prisma.billing.findMany({
    where: { organizationId: req.context.organizationId },
    include: { patient: true, appointment: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(items);
}));

app.get('/invoices', asyncHandler(async (req, res) => {
  const invoices = await prisma.billing.findMany({
    where: { organizationId: req.context.organizationId },
    include: { patient: true, appointment: true },
    orderBy: { createdAt: 'desc' }
  });

  res.json({
    data: invoices.map((invoice) => mapInvoice(invoice))
  });
}));

app.get('/invoices/:id', asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const invoice = await prisma.billing.findFirst({
    where: { organizationId: req.context.organizationId!, id },
    include: { patient: true, appointment: true }
  });

  if (!invoice) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  res.json({ data: mapInvoice(invoice) });
}));

app.post('/billing', requireRoles(Role.ADMIN, Role.RECEPTIONIST), asyncHandler(async (req, res) => {
  const payload = billingSchema.parse(req.body);
  const organizationId = req.context.organizationId!;
  const bill = await prisma.billing.create({
    data: {
      organizationId,
      invoiceNumber: await nextCode('billing', organizationId),
      patientId: payload.patientId,
      appointmentId: payload.appointmentId,
      amount: payload.amount,
      status: payload.status,
      lineItems: payload.lineItems
    },
    include: { patient: true, appointment: true }
  });
  res.status(201).json(bill);
}));

app.patch('/billing/:id/status', requireRoles(Role.ADMIN, Role.RECEPTIONIST), asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const { status } = z.object({ status: z.nativeEnum(BillingStatus) }).parse(req.body);
  const existing = await prisma.billing.findFirst({ where: { organizationId: req.context.organizationId!, id } });

  if (!existing) {
    return res.status(404).json({ message: 'Billing record not found' });
  }

  const bill = await prisma.billing.update({
    where: { id },
    data: { status },
    include: { patient: true, appointment: true }
  });
  res.json(bill);
}));

app.post('/invoices/:id/payments', requireRoles(Role.ADMIN, Role.RECEPTIONIST), asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const payload = invoicePaymentSchema.parse(req.body);
  const invoice = await prisma.billing.findFirst({
    where: { organizationId: req.context.organizationId!, id }
  });

  if (!invoice) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  const updated = await prisma.billing.update({
    where: { id },
    data: {
      status: payload.amount >= invoice.amount ? BillingStatus.PAID : BillingStatus.PENDING
    },
    include: { patient: true, appointment: true }
  });

  res.status(201).json({
    data: {
      ...mapInvoice(updated),
      paymentAttemptAmount: payload.amount,
      note: payload.note
    }
  });
}));

app.get('/ipd', asyncHandler(async (req, res) => {
  const admissions = await prisma.appointment.findMany({
    where: {
      organizationId: req.context.organizationId,
      visitType: VisitType.IPD
    },
    include: { patient: true, doctor: true },
    orderBy: { scheduledAt: 'desc' }
  });

  res.json({
    data: admissions.map((admission) => mapIpdAdmission(admission))
  });
}));

app.get('/ipd/:id', asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const admission = await prisma.appointment.findFirst({
    where: {
      organizationId: req.context.organizationId!,
      id,
      visitType: VisitType.IPD
    },
    include: { patient: true, doctor: true, billings: true, prescriptions: true }
  });

  if (!admission) {
    return res.status(404).json({ message: 'IPD admission not found' });
  }

  res.json({
    data: {
      ...mapIpdAdmission(admission),
      invoices: admission.billings.map((bill) => mapInvoice(bill)),
      prescriptions: admission.prescriptions
    }
  });
}));

app.post('/ipd', requireRoles(Role.ADMIN, Role.RECEPTIONIST), asyncHandler(async (req, res) => {
  const payload = ipdAdmissionSchema.parse(req.body);
  const organizationId = req.context.organizationId!;
  const admission = await prisma.appointment.create({
    data: {
      organizationId,
      appointmentNo: await nextCode('appointment', organizationId),
      patientId: payload.patientId,
      doctorId: payload.doctorId,
      visitType: VisitType.IPD,
      status: AppointmentStatus.SCHEDULED,
      notes: payload.notes,
      scheduledAt: new Date(payload.scheduledAt)
    },
    include: { patient: true, doctor: true }
  });

  res.status(201).json({ data: mapIpdAdmission(admission) });
}));

app.patch('/ipd/:id', requireRoles(Role.ADMIN, Role.RECEPTIONIST), asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const payload = ipdUpdateSchema.parse(req.body);
  const existing = await prisma.appointment.findFirst({
    where: {
      organizationId: req.context.organizationId!,
      id,
      visitType: VisitType.IPD
    }
  });

  if (!existing) {
    return res.status(404).json({ message: 'IPD admission not found' });
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: {
      doctorId: payload.doctorId,
      status: payload.status,
      notes: payload.notes,
      ...(payload.scheduledAt ? { scheduledAt: new Date(payload.scheduledAt) } : {})
    },
    include: { patient: true, doctor: true }
  });

  res.json({ data: mapIpdAdmission(updated) });
}));

app.post('/ipd/:id/discharge', requireRoles(Role.ADMIN, Role.RECEPTIONIST, Role.DOCTOR), asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const existing = await prisma.appointment.findFirst({
    where: {
      organizationId: req.context.organizationId!,
      id,
      visitType: VisitType.IPD
    },
    include: { patient: true, doctor: true }
  });

  if (!existing) {
    return res.status(404).json({ message: 'IPD admission not found' });
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: {
      status: AppointmentStatus.COMPLETED
    },
    include: { patient: true, doctor: true }
  });

  res.json({
    data: {
      ...mapIpdAdmission(updated),
      dischargedAt: new Date().toISOString()
    }
  });
}));

app.get('/prescriptions', asyncHandler(async (req, res) => {
  const prescriptions = await prisma.prescription.findMany({
    where: { organizationId: req.context.organizationId },
    include: { patient: true, doctor: true, appointment: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(prescriptions);
}));

app.post('/visits/:id/prescription/mark-printed', requireRoles(Role.ADMIN, Role.DOCTOR, Role.RECEPTIONIST), asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const prescription = await prisma.prescription.findFirst({
    where: { organizationId: req.context.organizationId!, appointmentId: id },
    include: { patient: true, doctor: true, appointment: true }
  });

  if (!prescription) {
    return res.status(404).json({ message: 'Prescription not found for this visit' });
  }

  res.json({
    data: {
      ...prescription,
      printableUrl: `/sims/prescriptions/${prescription.id}/print`,
      printedAt: new Date().toISOString()
    }
  });
}));

app.get('/rooms', asyncHandler(async (req, res) => {
  const activeQuery = z.object({ active: z.enum(['true', 'false']).optional() }).parse(req.query);
  const rooms = buildDefaultRooms(req.context.organizationId!);
  const data = activeQuery.active === 'false' ? [] : rooms;

  res.json({
    data,
    source: 'platform-defaults-until-room-model-migration'
  });
}));

app.get('/settings/public', asyncHandler(async (req, res) => {
  const organization = await prisma.organization.findUnique({
    where: { id: req.context.organizationId! },
    select: {
      id: true,
      name: true,
      slug: true,
      contactEmail: true,
      contactPhone: true,
      updatedAt: true
    }
  });

  res.json({
    data: organization
  });
}));

app.get('/settings', asyncHandler(async (req, res) => {
  const organization = await prisma.organization.findUnique({
    where: { id: req.context.organizationId! }
  });

  res.json({
    data: organization
  });
}));

app.put('/settings', requireRoles(Role.ADMIN), asyncHandler(async (req, res) => {
  const payload = settingsSchema.parse(req.body);
  const organization = await prisma.organization.update({
    where: { id: req.context.organizationId! },
    data: {
      name: payload.name,
      contactEmail: payload.contactEmail,
      contactPhone: payload.contactPhone,
      products: payload.products as any,
      featureFlags: payload.featureFlags as any,
      isActive: payload.isActive
    }
  });

  res.json({ data: organization });
}));

app.get('/users', requireRoles(Role.ADMIN), asyncHandler(async (req, res) => {
  const query = z.object({
    role: z.nativeEnum(Role).optional()
  }).parse(req.query);

  const users = await prisma.user.findMany({
    where: {
      organizationId: req.context.organizationId!,
      role: query.role
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: { createdAt: 'desc' }
  });

  res.json({ data: users });
}));

app.patch('/users/:id', requireRoles(Role.ADMIN), asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const payload = userUpdateSchema.parse(req.body);
  const existing = await prisma.user.findFirst({
    where: {
      organizationId: req.context.organizationId!,
      id
    }
  });

  if (!existing) {
    return res.status(404).json({ message: 'User not found' });
  }

  const user = await prisma.user.update({
    where: { id },
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });

  res.json({ data: user });
}));

app.get('/prescriptions/:id', asyncHandler(async (req, res) => {
  const { id } = cuidParamSchema.parse(req.params);
  const prescription = await prisma.prescription.findFirst({
    where: { organizationId: req.context.organizationId!, id },
    include: { patient: true, doctor: true, appointment: true }
  });

  if (!prescription) {
    return res.status(404).json({ message: 'Prescription not found' });
  }

  res.json({
    ...prescription,
    printableUrl: `/sims/prescriptions/${prescription.id}/print`
  });
}));

app.post('/prescriptions', requireRoles(Role.ADMIN, Role.DOCTOR), asyncHandler(async (req, res) => {
  const payload = prescriptionSchema.parse(req.body);
  const organizationId = req.context.organizationId!;
  const prescription = await prisma.prescription.create({
    data: {
      organizationId,
      prescriptionNo: await nextCode('prescription', organizationId),
      patientId: payload.patientId,
      doctorId: payload.doctorId,
      appointmentId: payload.appointmentId,
      diagnosis: payload.diagnosis,
      notes: payload.notes,
      medicines: payload.medicines
    },
    include: { patient: true, doctor: true, appointment: true }
  });
  res.status(201).json({
    ...prescription,
    printableUrl: `/sims/prescriptions/${prescription.id}/print`
  });
}));

app.get('/reports/dashboard', asyncHandler(async (req, res) => {
  const organizationId = req.context.organizationId!;
  const [patients, doctors, visits, invoices] = await Promise.all([
    prisma.patient.count({ where: { organizationId } }),
    prisma.doctor.count({ where: { organizationId } }),
    prisma.appointment.count({ where: { organizationId } }),
    prisma.billing.findMany({ where: { organizationId } })
  ]);

  res.json({
    data: {
      patients,
      doctors,
      visits,
      totalInvoices: invoices.length,
      totalRevenue: invoices.filter((invoice) => invoice.status === BillingStatus.PAID).reduce((sum, invoice) => sum + invoice.amount, 0),
      outstanding: invoices.filter((invoice) => invoice.status === BillingStatus.PENDING).reduce((sum, invoice) => sum + invoice.amount, 0)
    }
  });
}));

app.get('/reports/analytics', asyncHandler(async (req, res) => {
  const organizationId = req.context.organizationId!;
  const [appointments, doctors, invoices] = await Promise.all([
    prisma.appointment.findMany({
      where: { organizationId },
      include: { doctor: true }
    }),
    prisma.doctor.findMany({ where: { organizationId } }),
    prisma.billing.findMany({ where: { organizationId } })
  ]);

  const visitsByDoctor = doctors.map((doctor) => ({
    doctorId: doctor.id,
    doctorName: doctor.name,
    visits: appointments.filter((appointment) => appointment.doctorId === doctor.id).length
  }));

  res.json({
    data: {
      visitsByDoctor,
      invoiceStatusBreakdown: {
        paid: invoices.filter((invoice) => invoice.status === BillingStatus.PAID).length,
        pending: invoices.filter((invoice) => invoice.status === BillingStatus.PENDING).length,
        cancelled: invoices.filter((invoice) => invoice.status === BillingStatus.CANCELLED).length
      },
      appointmentStatusBreakdown: {
        scheduled: appointments.filter((appointment) => appointment.status === AppointmentStatus.SCHEDULED).length,
        inProgress: appointments.filter((appointment) => appointment.status === AppointmentStatus.IN_PROGRESS).length,
        completed: appointments.filter((appointment) => appointment.status === AppointmentStatus.COMPLETED).length,
        cancelled: appointments.filter((appointment) => appointment.status === AppointmentStatus.CANCELLED).length
      }
    }
  });
}));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`hms-service listening on ${port}`);
});
