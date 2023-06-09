"use client";

import React, { useEffect } from "react";
import {
  ShopOutlined,
  BarChartOutlined,
  HomeOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Home", "home", <HomeOutlined />),
  getItem("Merchant", "merchant", <ShopOutlined />),
  //   { type: "divider" },
  getItem("Statistics", "statistics", <BarChartOutlined />),
];

export default function App() {
  const router = useRouter();
  const pathName = usePathname();
  const onClick: MenuProps["onClick"] = (e) => {
    const keyPath = e.keyPath.reverse().join("/");
    router.push(`/dashboard/${keyPath}`);
  };
  function getDefaultSelectedKey() {
    const key = pathName.replace(/^\/dashboard\/|\/$/g, "");
    return key;
  }

  return (
    <div>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={[
          getDefaultSelectedKey() === "/dashboard"
            ? "home"
            : getDefaultSelectedKey(),
        ]}
        mode="inline"
        items={items}
        //if updating width value here also update in layout.tsx
        className="h-[100vh] overflow-auto w-[60px] md:w-[256px] "
        inlineCollapsed={false}
      />
    </div>
  );
}
