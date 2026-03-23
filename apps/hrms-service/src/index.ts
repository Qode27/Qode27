import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import { asyncHandler, authGuard, errorHandler, requestContext } from '@kansalt/middleware';
import { env } from '@kansalt/utils';

const app = express();
const port = Number(env.HRMS_SERVICE_PORT ?? 4003);

app.use(cors());
app.use(express.json());
app.use(requestContext);
app.use(authGuard);

app.get('/health', (_req, res) => {
  res.json({ service: 'hrms-service', status: 'ok' });
});

app.get('/modules', asyncHandler(async (req, res) => {
  res.json({
    organizationId: req.context.organizationId,
    modules: [
      { key: 'employees', label: 'Employee Directory', enabled: true },
      { key: 'attendance', label: 'Attendance', enabled: true },
      { key: 'payroll', label: 'Payroll', enabled: false }
    ]
  });
}));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`hrms-service listening on ${port}`);
});
