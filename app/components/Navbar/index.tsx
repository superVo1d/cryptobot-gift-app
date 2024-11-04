"use client";

import Link from "next/link";
import { FC } from "react";
import Icon from "../Icon";
import navbarStyles from "./styles.module.scss";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const Navbar: FC = () => {
  const pathname = usePathname();

  const items = [
    {
      name: "Store",
      path: "/",
      icon: "store",
    },
    {
      name: "Gifts",
      path: "/gifts",
      icon: "gift",
    },
    {
      name: "Leaderboard",
      path: "/leaderboard",
      icon: "leaderboard",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "profile",
    },
  ];

  return (
    <nav className={navbarStyles.navbar}>
      <ul>
        {items.map(({ name, path, icon }) => (
          <li
            key={path}
            className={classNames(navbarStyles.navbar__item, {
              [navbarStyles.navbar__item_active]: path === pathname,
            })}
          >
            <Link href={path}>
              <Icon icon={icon} className={navbarStyles.icon} />
              <div>{name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export { Navbar };
