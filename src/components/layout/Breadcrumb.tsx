"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((seg) => seg);

  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    const label = decodeURIComponent(segment.replace(/-/g, " ")).replace(/\b\w/g, (l) => l.toUpperCase());

    return (
      <li key={href} className="flex items-center">
        <Link
          href={href}
          className={`hover:underline capitalize ${isLast ? "text-black font-semibold" : "text-gray-500"
            }`}
        >
          {label}
        </Link>
        {!isLast && <span className="mx-2 text-gray-400">/</span>}
      </li>
    );
  });

  return (
    <div className="container">
      <nav className="bg-white py-4 ">
        {breadcrumbItems.length > 0 && (
          <ol className="flex flex-wrap items-center text-sm">
            <li className="flex items-center">
              <Link
                href="/"
                className="hover:underline capitalize text-gray-500"
              >
                Home
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            {breadcrumbItems}
          </ol>
        )}
      </nav>
    </div>
  );
};

export default Breadcrumb;