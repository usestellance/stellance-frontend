"use client";
import React from "react";
import Logo from "./ui/Logo";
// import { PiUserCircleThin } from "react-icons/pi";
import { useSideBarStore } from "../../store/NavStore";
import { userAuth } from "../../store/userAuth";
import { useRouter } from "next/navigation";
import { accountSetUpRoute, profileRoute } from "../../utils/route";
import ThemeRadio from "./ThemeRadio";

export default function AppHeader() {
  const { toggleSideBar } = useSideBarStore();
  const { credentials } = userAuth();
  const router = useRouter();
  const isProfileComplete = credentials?.user?.profile_complete || false;
  // console.log("credentials header", credentials);

  const gotoProfile = () => {
    if (isProfileComplete) {
      router.push(profileRoute);
    } else {
      router.push(accountSetUpRoute);
    }
  };

  return (
    <header className="z-30 fixed md:flex md:justify-end  top-0 bg-white  dark:bg-primary right-0 left-0">
      <div className="myContainer w-full py-6 flex justify-between  items-center bg-red400">
        <div className="">
          <div className="md:hidden">
            <Logo />
          </div>
        </div>
        <div className="flex items-center gap-[13px] sm:gap-4 lg:gap-5">
        <ThemeRadio />
          {/* notification svg */}
          <svg
            // width="22"
            // height="22"
            viewBox="0 0 22 22"
            // fill="none"
            className="fill-white md:fill-primary dark:md:fill-white h-[22px] w-[22px] sm:h-6 sm:w-6 lg:h-7 lg:w-7 object-contain"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.0488 17.9165C13.3864 17.9167 13.5751 18.292 13.3994 18.5601L13.3594 18.6118L13.3584 18.6128C13.0989 18.9032 12.7882 19.1428 12.4424 19.3198L12.292 19.3921C11.9364 19.551 11.555 19.6424 11.167 19.6626L11 19.6665H10.999C10.6095 19.6668 10.2239 19.5952 9.86133 19.4556L9.70703 19.3921C9.3514 19.2331 9.02872 19.0096 8.75488 18.7339L8.64062 18.6128V18.6118L8.60254 18.563C8.43401 18.3103 8.59154 17.9579 8.89355 17.9214L8.97754 17.9175L8.97656 17.9165H13.0488ZM11.0039 2.3335C12.0152 2.33531 12.8709 3.00548 13.1514 3.92627H13.1523L13.1885 4.05908L13.1934 4.0835L13.2354 4.31299L13.4395 4.42725C14.2635 4.89213 14.9801 5.52291 15.5469 6.27686L15.7812 6.60693C16.3039 7.39531 16.656 8.2825 16.8184 9.21143L16.877 9.61182L16.9014 9.8667L16.916 10.0835V12.8091L16.9219 12.8462L16.9414 12.9712L16.9424 12.979L16.9443 12.9858C17.0927 13.7841 17.5344 14.4979 18.1826 14.9868L18.1895 14.9927L18.1963 14.9976L18.3496 15.105L18.3623 15.1138L18.376 15.1216L18.5244 15.2124L18.5312 15.2173L18.5391 15.2212C18.8894 15.42 18.7777 15.9517 18.3926 15.9966L18.3076 16.0005H3.66602C3.26422 16.0001 3.10828 15.4999 3.39746 15.2642L3.46094 15.2212C3.82197 15.0169 4.14004 14.7455 4.39844 14.4224L4.50586 14.2808C4.78134 13.8947 4.96904 13.4522 5.05566 12.9858L5.05762 12.9771L5.05859 12.9673L5.07812 12.8364L5.08301 12.8003V12.7642L5.08398 10.0503C5.13137 9.07913 5.3853 8.13073 5.82715 7.26807L6.0293 6.90186C6.59827 5.94086 7.3946 5.13442 8.34766 4.55225L8.34668 4.55127L8.56738 4.42236L8.75195 4.31299L8.80078 4.10498L8.81055 4.06494L8.80957 4.06396C8.9027 3.67255 9.09975 3.31468 9.37695 3.02588L9.50098 2.90576C9.84457 2.59876 10.274 2.40445 10.7314 2.34912L10.7305 2.34814L10.8672 2.33643L11.0039 2.3335Z"
              //   stroke="#18234F"
              className="stroke-primary dark:stroke-white "
            />
          </svg>

          {/* user svg */}
          {/* <PiUserCircleThin className="text-[28px] block dark:hidden" /> */}
          <svg
            onClick={gotoProfile}
            className="cursor-pointer h-6 w-6 sm:h-8 sm:w-8 lg:h-9 lg:w-9"
            // width="24"
            // height="24"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.6663 9.16667C14.6663 10.1391 14.28 11.0718 13.5924 11.7594C12.9048 12.447 11.9721 12.8333 10.9997 12.8333C10.0272 12.8333 9.09458 12.447 8.40695 11.7594C7.71932 11.0718 7.33301 10.1391 7.33301 9.16667C7.33301 8.19421 7.71932 7.26157 8.40695 6.57394C9.09458 5.88631 10.0272 5.5 10.9997 5.5C11.9721 5.5 12.9048 5.88631 13.5924 6.57394C14.28 7.26157 14.6663 8.19421 14.6663 9.16667Z"
              //   fill="white"
              className="fill-primary dark:fill-white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.6257 20.1595C5.73663 19.9633 1.83301 15.9373 1.83301 11.0002C1.83301 5.93741 5.93692 1.8335 10.9997 1.8335C16.0624 1.8335 20.1663 5.93741 20.1663 11.0002C20.1663 16.0629 16.0624 20.1668 10.9997 20.1668C10.9578 20.1671 10.916 20.1671 10.8741 20.1668C10.7911 20.1668 10.7082 20.1641 10.6257 20.1595ZM5.11742 16.7843C5.04889 16.5875 5.02556 16.3778 5.04917 16.1707C5.07278 15.9636 5.14273 15.7645 5.25381 15.5882C5.3649 15.4119 5.51428 15.2628 5.69086 15.1521C5.86743 15.0414 6.06668 14.9719 6.2738 14.9487C9.84697 14.5532 12.1744 14.5889 15.7301 14.957C15.9375 14.9786 16.1373 15.0472 16.3141 15.1577C16.491 15.2681 16.6403 15.4175 16.7507 15.5944C16.8611 15.7713 16.9297 15.971 16.9513 16.1784C16.9728 16.3858 16.9467 16.5954 16.875 16.7912C18.399 15.2493 19.2524 13.1681 19.2497 11.0002C19.2497 6.44387 15.556 2.75016 10.9997 2.75016C6.44338 2.75016 2.74967 6.44387 2.74967 11.0002C2.74967 13.2533 3.65305 15.2957 5.11742 16.7843Z"
              //   fill="white"
              className="fill-primary dark:fill-white"
            />
          </svg>

          <div
            onClick={gotoProfile}
            className="cursor-pointer max-md:hidden text-xl lg:text-[24px] font-bold"
          >
            {credentials?.user?.profile?.first_name || ""}
          </div>

          {/* Menu icon */}
          <svg
            onClick={toggleSideBar}
            className="cursor-pointer h-7 w-7 sm:h-10 sm:w-10 md:hidden"
            // width="28"
            // height="28"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.25 5.5H18.5625M3.4375 11H18.5625M3.4375 16.5H18.5625M3.4375 7.5625L5.5 5.5L3.4375 3.4375"
              //   stroke="#18234F"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-primary dark:stroke-white"
            />
          </svg>
        </div>
      </div>
    </header>
  );
}
