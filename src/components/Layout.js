import React from "react";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Nav />
      </div>
      <main>{children}</main>
    </>
  );
};

export default Layout;
