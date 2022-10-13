import React from "react";

interface ImageProps {
  className: string;
  src: string;
  alt?: string;
  height?: string;
  width?: string;
}

export const Image: React.FC<ImageProps> = ({
  className,
  src,
  alt,
  height,
  width,
}) => {
  return (
    <>
      <img
        className={className}
        src={src}
        alt={alt}
        height={height}
        width={width}
      ></img>
    </>
  );
};
