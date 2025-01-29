import React from "react";
import Image from "next/image";

interface DateInfoProps {
  icon: string;
  label: string;
  value: string;
}

const DateInfo = ({ icon, label, value }: DateInfoProps) => (
  <div className="flex items-center gap-2 mx-auto">
    <Image src={icon} alt="" width={18} height={18} aria-hidden="true" />
    <p className="text-light-100 text-xs line-clamp-3">
      <span className="font-medium">{label}:</span> {value}
    </p>
  </div>
);

export default DateInfo;
