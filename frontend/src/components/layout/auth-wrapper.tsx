import { ReactNode } from "react";
import Image from "next/image";

interface AuthWrapperProps {
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
}

export function AuthWrapper({
  children,
  imageSrc,
  imageAlt,
}: AuthWrapperProps) {
  return (
    <div className="flex min-h-screen w-full">
      <div className="w-full flex flex-col lg:w-3/8 bg-background p-8">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col h-full">
          {children}
        </div>
      </div>

      <div className="hidden lg:block lg:w-5/8 relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
