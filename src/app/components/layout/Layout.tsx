import React, { ReactNode } from "react";
import { Footer } from "../ui/Footer";
import { Header } from "../ui/Header";
import ur from "../../assets/bg.jpg";
type LayoutProps = {
  children: ReactNode;
};
// export const bgColor = "fff";
export const bgColor = "2a2d34";
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      style={{ backgroundImage: `url(${ur})` }}
      className={`w-[100%]  bg-gray-200 min-h-screen overflow-hidden`}
    >
      <div
        className={`max-w-screen-xl m-auto bg-[#2a2d34] h-full flex flex-col px-2 pt-2 shadow-my2`}
      >
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};
