import { Menu } from "@/components";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <aside className="fixed left-[0]">
        <Menu />
      </aside>
      {/* if updating padding values here also update in menu */}
      <main className="pl-[calc(60px+8px)] p-[8px] md:pl-[calc(256px+16px)] md:p-[16px] w-[100%] min-h-screen bg-[#f0f2f5]">
        {children}
      </main>
    </>
  );
}
