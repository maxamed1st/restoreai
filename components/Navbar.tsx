'use client'

import FormActionButton from "@/lib/FormActionButton";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();
  return (
    <nav className="flex justify-end items-baseline w-full h-10 border">
      {status == "unauthenticated" && <FormActionButton text="Sign in" path="/api/auth/signin?callbackUrl=/dashboard" />}
      {status == "authenticated" && <FormActionButton text="Sign out" path="/api/auth/signout?callbackUrl=/" />}
    </nav>
  )
}
