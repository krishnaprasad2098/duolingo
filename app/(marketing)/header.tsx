import React from "react";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
const Header = () => {
  return (
    <div>
      <div className="flex justify-between px-9 py-3">
        <div className=" flex items-center justify-start gap-2">
          <Image
            src="./mascot.svg"
            width={40}
            height={40}
            alt="duolingo-logo"
          />
          <p>Lingo</p>
        </div>

        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              afterSignInUrl="/learn"
              afterSignUpUrl="/learn"
            >
              <Button variant="ghost">Login</Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
      {/* <ClerkLoading>
        <Loader className="animate-spin h-5 w-5" />
      </ClerkLoading> */}
    </div>
  );
};

export default Header;
