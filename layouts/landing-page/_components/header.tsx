"use client";

import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export const Header = () => {
  const { userId } = useAuth();
  useEffect(() => {
    if (!userId) {
      localStorage && localStorage.removeItem("accessToken");
      localStorage && localStorage.removeItem("refreshToken");
    } 
  }, [userId]);
  return (
    <header className="h-20 w-full border-b-2 px-4 border-slate-200">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full ">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" alt="mascot" height={40} width={40} />
          <h1 className="text-2xl text-green-600 tracking-wide font-bold">
            Duolingo
          </h1>
        </div>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/"></UserButton>
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              afterSignInUrl="/"
              afterSignUpUrl="/courses"
            >
              <Button variant="ghost" size="lg">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};
