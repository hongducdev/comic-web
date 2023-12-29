"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface FallbackImageProps {
  src: string;
  backupSrc?: string;
  [rest: string]: any;
}

const FallbackImageChapter: React.FC<FallbackImageProps> = ({
  src,
  backupSrc,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      src={
        imgSrc ? imgSrc : backupSrc ? backupSrc : "/images/default_image.jpg"
      }
      alt=""
      loading="lazy"
      priority
      {...rest}
      onError={() =>
        setImgSrc(backupSrc ? backupSrc : "/images/default_image.jpg")
      }
    />
  );
};

export default FallbackImageChapter;
