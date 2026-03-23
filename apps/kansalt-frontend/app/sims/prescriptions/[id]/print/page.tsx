import { redirect } from 'next/navigation';

export default async function PrescriptionPrintRedirectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`https://hms.kansalt.com/prescriptions/${id}/print`);
}
