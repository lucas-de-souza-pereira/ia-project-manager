import type { SVGProps } from "react";

export function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 17 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.3535 0.353515L8.35352 8.35352L0.353515 0.353515"
        stroke="currentColor"
      />
    </svg>
  );
}
