import React, { ReactNode } from "react";
import RootLayout from "./RootLayout";

const GuestLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RootLayout>
      <main className="bg-white   lg:w-1/3  w-full mx-auto">
        <div>{children}</div>
      </main>
    </RootLayout>
  );
};

export default GuestLayout;
