"use client";

import React from "react";
import { Button } from "../../../components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useToast } from "../../../hooks/useToast";
import { authClient } from "../../../lib/authClient";
import { overviewRoutes } from "../../../config/routes";

const GoogleAuthBtn = () => {
  const router = useRouter();
  const toast = useToast();

  const handleClick = async () => {
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        // callbackURL: overviewRoutes.OVERVIEW, // where to redirect after login
      });

      console.log(res);
    } catch (e) {
      console.error(e);
      toast.error("Google authentication failed");
    }
  };

  return (
    <Button
      onClick={handleClick}
      type="button"
      className="w-full bg-white text-black-500 font-normal hover:bg-neutral-100 border border-black-300"
    >
      <FcGoogle size={22} />
      <span>Continue with Google</span>
    </Button>
  );
};

export default GoogleAuthBtn;
