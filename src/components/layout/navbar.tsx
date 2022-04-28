import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  subtitle?: string;
  rightButton?: {
    label: string;
    href: string;
  };

  rightLinks?: { href: string; label: string }[];
};

export function Navbar({ subtitle, rightButton, rightLinks = [] }: Props) {
  return (
    <header className="p-[10px] bg-gray-100 border shadow-inner">
      <div className="max-w-screen-sm flex justify-between m-auto">
        <div className="flex items-center">
          <h1 className="font-bold mr-[5px]">
            <a href="/">Quizer</a>
          </h1>

          {subtitle && <h3 className="text-[14px]">{subtitle}</h3>}
        </div>

        <aside>
          {rightLinks.map((rightLink) => (
            <NavLink
              to={rightLink.href}
              key={rightLink.label}
              className={({ isActive }) =>
                clsx(
                  "text-[14px] ml-[10px]",
                  isActive && "border-b-[1px] border-[#333]"
                )
              }
            >
              {rightLink.label}
            </NavLink>
          ))}

          {rightButton && (
            <a
              href={rightButton.href}
              className="text-[14px] border p-[5px] rounded-half bg-white"
            >
              {rightButton.label}
            </a>
          )}
        </aside>
      </div>
    </header>
  );
}
