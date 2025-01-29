import React from "react";
import Image from "next/image";

interface DateInfoProps {
  icon: string;
  label: string;
  value: string;
}

const DateInfo = ({ icon, label, value }: DateInfoProps) => (
  <div className="flex items-center gap-2">
    <Image src={icon} alt="" width={18} height={18} aria-hidden="true" />
    <p className="text-light-100 text-xs line-clamp-2">
      <span className="font-medium">{label}:</span> {value}
    </p>
  </div>
);

export default DateInfo;
