
import DashboardClient from "@/components/dashboard/DashboardClient";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - LinkVault',
  description: 'Manage your saved links.',
};

export default function DashboardPage() {
    return <DashboardClient />;
}
