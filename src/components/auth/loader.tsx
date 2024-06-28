import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <Image
        src={"/logo.svg"}
        className="animate-pulse"
        width={200}
        height={200}
        alt="logo"
      />
    </div>
  );
};

export default Loader;
