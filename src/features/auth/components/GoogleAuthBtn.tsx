import React, { useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useToast } from "../../../hooks/useToast";
import { axiosInstance } from "../../../config/axios";

declare global {
  interface Window {
    google: any;
  }
}

const GoogleAuthBtn = () => {
  const router = useRouter();
  const toast = useToast();
  const handleGoogleLogin = async (response: any) => {
    try {
      // console.log("Google ID token:", response.credential);

      const idToken = response.credential;
      console.log(idToken);
      // const res = await axiosInstance.post(
      //   backendRoutes.authRoutes.GOOGLE_AUTH,
      //   {
      //     id_token: idToken,
      //   },
      // );

      // if (res.status === 200 && res.data.token) {
      //   Cookies.set("access_token", res.data.token, {
      //     expires: 1,
      //     secure: process.env.NODE_ENV === "production",
      //     sameSite: "Lax",
      //     path: "/",
      //   });
      //   toast.success(res.data.message);
      //   router.push(pageRoutes.dashboardRoutes.OVERVIEW);
      // }
      // console.log(res);
      // if (!res) {
      //   toast.error("Google authentication failed");
      // }
    } catch (e) {
      console.log(e);
      toast.error("Google authentication failed");
    }
  };

  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleGoogleLogin,
      ux_mode: "popup",
      auto_select: false,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-hidden-btn"),
      { theme: "outline", size: "large" },
    );
  }, []);

  const handleClick = () => {
    const btn = document.querySelector(
      "#google-hidden-btn div[role=button]",
    ) as HTMLElement;

    btn?.click();
  };

  return (
    <>
      <div id="google-hidden-btn" style={{ display: "none" }} />
      <Button
        onClick={handleClick}
        type="submit"
        className="w-full bg-white text-black-500 font-normal hover:bg-neutral-100 border border-black-300"
      >
        <FcGoogle size={22} />
        <span>Continue with Google</span>
      </Button>
    </>
  );
};

export default GoogleAuthBtn;
