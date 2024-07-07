import type { AppProps as NextAppProps } from "next/app";
import "@/styles/globals.css";
import ErrorBoundary from "./_error";
import React from "react";
import { NextComponentType } from "next";
import "dayjs/locale/id";
import dayjs from "dayjs";

import ProtectedLayout from "@/layouts/ProtectedLayout";
dayjs.locale("id");
type GetLayout = (page: React.ReactNode) => React.ReactNode;

type ComponentProp = NextComponentType & {
  getLayout?: GetLayout;
};

type AppProps = NextAppProps & { Component: ComponentProp };
function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const getLayout =
    Component.getLayout || ((page) => <ProtectedLayout>{page}</ProtectedLayout>);
  return (
    <ErrorBoundary>
      <React.StrictMode>
        {getLayout(<Component {...pageProps} />)}
      </React.StrictMode>
    </ErrorBoundary>
  );
}

export default MyApp;
