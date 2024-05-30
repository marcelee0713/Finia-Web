import React from "react";
import Image from "next/image";

interface props {
  image: string | any;
}

export const ImageBackground = ({ image }: props) => {
  return (
    <Image
      alt="Background"
      src={image}
      quality={100}
      fill
      priority
      sizes="100vw"
      style={{
        objectFit: "cover",
        zIndex: -1,
      }}
      className="animate-animFullHeight"
    />
  );
};
