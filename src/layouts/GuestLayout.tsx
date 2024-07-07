import React, { ReactNode } from "react";
import RootLayout from "./RootLayout";



const GuestLayout = ({ children }: { children: ReactNode }) => {

  return (
    <RootLayout>

      <main className="bg-white  min-h-screen ">
        <div>{children}</div>
      </main>

    </RootLayout>
  );
};

export default GuestLayout;
