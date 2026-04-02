import type { SVGProps } from "react";

export function ChevronUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 17 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.3535 8.70711L8.35352 0.707108L0.353515 8.70711"
        stroke="currentColor"
      />
    </svg>
  );
}
