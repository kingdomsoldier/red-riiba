import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AdminShell from "@/components/admin/layout/AdminShell";

export const metadata: Metadata = {
  title: {
    default: "Admin | RED RIIBA",
    template: "%s | Admin RED RIIBA",
  },
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-gray-50 font-sans text-riiba-green-dark">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}