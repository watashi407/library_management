import React from "react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            src="/icons/admin/logo.svg"
            alt="logo"
            width={37}
            height={37}
          />
          <h1>Watashi Libro</h1>
        </div>
        <div className="mt-10"></div>
      </div>
    </div>
  );
};

export default Sidebar;
