import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";

const Footer = () => {
  const buttonPaths = [
    {
      path: "/hr.svg",
      language: "Croatian",
    },
    {
      path: "/it.svg",
      language: "Italian",
    },
    {
      path: "/jp.svg",
      language: "Japanese",
    },
    {
      path: "/es.svg",
      language: "Spanish",
    },
    {
      path: "/fr.svg",
      language: "French",
    },
  ];
  return (
    <footer className="hidden lg:block h-20 w-full">
      <div className="max-w-screen-lg mx-auto flex items-center justify-center h-full">
        {buttonPaths.map((data, index) => {
          return (
            <Button key={index} variant="ghost" className="">
              <Image
                src={data.path}
                alt={data.language}
                height={40}
                width={40}
                className="rounded-md"
              />
              <p className="px-3">{data.language}</p>
            </Button>
          );
        })}
        {/* <Button
          variant="ghost"
          className="flex justify-center items-center gap-2"
        >
          <Image
            src="/hr.svg"
            alt="Crotian"
            height={40}
            width={40}
            className="rounded-md"
          />
          <p>Croatian</p>
        </Button> */}
      </div>
    </footer>
  );
};

export default Footer;
