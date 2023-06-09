"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/home");
  });

  return (
    <main className="">
      <h1>Hello</h1>
    </main>
  );
}
