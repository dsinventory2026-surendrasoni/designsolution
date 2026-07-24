// app/admin/dashboard/page.js
// Server component - verifies auth then renders client dashboard

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import AdminDashboard from "./AdminDashboard";

export const metadata = {
  title: "Admin Dashboard — DS Group of Companies",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    redirect("/admin");
  }

  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== "admin") {
    redirect("/admin?expired=1");
  }

  return <AdminDashboard adminEmail={decoded.email} />;
}
