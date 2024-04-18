/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="">
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4">
        {/* <Image src="./hero.svg" alt="hero image" width={400} height={400} /> */}
        <img
          src="./hero.svg"
          alt="hero-image"
          className="lg:max-w-sm sm:max-w-md mx-auto"
        />
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="lg:text-3xl text-center lg:max-w-md">
            Learn, practice, and master new Languages with Lingo
          </h1>
          <div className="flex flex-col items-center py-6 gap-y-2">
            <ClerkLoading>
              <Loader className="animate-spin h-5 w-5" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <SignUpButton
                  mode="modal"
                  afterSignInUrl="/learn"
                  afterSignUpUrl="/learn"
                >
                  <Button variant="destructive" className="">
                    Get Started
                  </Button>
                </SignUpButton>
                <SignInButton
                  mode="modal"
                  afterSignInUrl="/learn"
                  afterSignUpUrl="/learn"
                >
                  <p className="cursor-pointer font-bold">
                    I Already have an account
                  </p>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button variant="outline">
                  <Link href="/learn">Continue Learning</Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
