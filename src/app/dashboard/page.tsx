"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/home");
  });
  return <></>;
}
