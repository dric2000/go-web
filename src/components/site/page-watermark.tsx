import Image from "next/image";
import filigrane from "@assets/filigrane.png";

export function PageWatermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <Image
        src={filigrane}
        alt=""
        fill
        priority={false}
        className="object-cover opacity-40 select-none"
      />
    </div>
  );
}
