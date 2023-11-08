import React, { useState } from "react";

interface NavItem {
  id: string;
  name: string;
  children: React.ReactNode;
}

interface NavProps {
  items: NavItem[];
  defaultKey: string;
}

const Nav: React.FC<NavProps> = ({ items, defaultKey }) => {
  const [nav, setNav] = useState(defaultKey);

  if (!items || !items.length) {
    return null;
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        {items.map((item) => (
          <div key={item.id}>
            <div
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                fontWeight: item.id === nav ? "bold" : "normal",
              }}
              onClick={() => setNav(item.id)}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>

      <div style={{ border: "1px solid #000" }}>
        页面内容：{items.find((item) => item.id === nav)?.children}
      </div>
    </>
  );
};

export default Nav;
