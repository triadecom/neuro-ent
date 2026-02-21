import svgPaths from "@/lib/svg-icons";

export function CheckIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" viewBox="0 0 16.2548 11.8774">
        <path d={svgPaths.p20916a70} fill="#FB623F" />
      </svg>
    </div>
  );
}

export function CloseIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" viewBox="0 0 11.6667 11.6667">
        <path d={svgPaths.p24d87800} fill="white" />
      </svg>
    </div>
  );
}

export function StarIcon({ color = "white" }: { color?: string }) {
  return (
    <div className="relative shrink-0 size-[28px]">
      <svg className="block size-full" fill="none" viewBox="0 0 28 28">
        <g clipPath="url(#star-clip)">
          <path clipRule="evenodd" d={svgPaths.p52b9570} fill={color} fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p1e4dcd00} fill={color} fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p3389ef80} fill={color} fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p3772ec00} fill={color} fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p4819240} fill={color} fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.pe250280} fill={color} fillRule="evenodd" />
        </g>
        <defs>
          <clipPath id="star-clip">
            <rect fill="white" height="28" width="28" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export function ArrowIcon() {
  return (
    <svg
      className="shrink-0 size-[16px]"
      fill="none"
      viewBox="0 0 8 8"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.33333"
    >
      <path d={svgPaths.p14d5a980} />
      <path d={svgPaths.p1dd99a80} />
    </svg>
  );
}
