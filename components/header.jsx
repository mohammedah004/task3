'use client';
import { usePathname } from "next/navigation";
const itemsMenu = [
      { name: "Dashboard",link:"/Dashboard" },
      { name: "Products",link:"/Dashboard/Products" },
      { name: "Add Product", link:"/Dashboard/Products/addProducts" },
      { name: "Users",link:"/Dashboard/Users" },
];

export const Header = () => {
      const path =usePathname()

      return (
      <div className="header">
            <div className="text">{itemsMenu.find((ele)=>path===ele.link)?.name}</div>
            <div className="user">M</div>
      </div>
      )
}
