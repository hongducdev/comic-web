"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface FallbackImageProps {
  backupSrc: string;
  [rest: string]: any;
}

const FallbackImageChapter: React.FC<FallbackImageProps> = ({
  backupSrc,
  ...rest
}) => {
  const [imgBackSrc, setImgBackSrc] = useState(backupSrc);

  useEffect(() => {
    setImgBackSrc(backupSrc);
  }, [backupSrc]);

  return (
    <Image
      src={imgBackSrc ? imgBackSrc : "/images/default_image.jpg"}
      alt="Comic image"
      placeholder="blur"
      blurDataURL="/images/default_image.jpg"
      priority
      {...rest}
      onError={() => setImgBackSrc("/images/default_image.jpg")}
    />
  );
};

export default FallbackImageChapter;
