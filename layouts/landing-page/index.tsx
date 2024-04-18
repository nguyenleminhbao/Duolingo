"use client";
import { Button } from "@/components/ui/button";
import useAsync from "@/hooks/use-async";
import { login } from "@/services/auth/post";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  auth,
  currentUser,
  useAuth,
} from "@clerk/nextjs";

import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function LandingLayout() {
  const { userId } = useAuth();
  const { data: loginData, run: runLogin } = useAsync(login, true);
  useEffect(() => {
    const isLogin = localStorage ? localStorage?.getItem("accessToken") : false;
    if (userId && !isLogin) {
      runLogin(() => login(userId));
      if (loginData) {
        localStorage.setItem("accessToken", loginData?.accessToken as string);
      }
    }
  }, [loginData]);

  return (
    <div className="max-w-[988px] flex flex-1 mx-auto w-full flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <section className=" relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/hero.svg" alt="hero" fill />
      </section>
      <section className=" flex flex-col items-center gap-y-8">
        <h1 className=" font-bold text-xl lg:text-3xl text-neutral-600 max-w-[480px] text-center">
          Learn, practice, and master new language with Lingo.
        </h1>
        <div className=" flex flex-col lg:flex-row gap-3 max-w-[330px]">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                afterSignInUrl="/"
                afterSignUpUrl="/courses"
              >
                <Button variant="secondary" size="lg">
                  Get started
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
                afterSignInUrl="/"
                afterSignUpUrl="/courses"
              >
                <Button variant="primaryOutline" size="lg">
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/courses">Continue Courses</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
          {/* <Button variant="secondary" className="w-full" asChild>
              <Link href="/learn">Continue Learning</Link>
            </Button> */}
        </div>
      </section>
    </div>
  );
}
