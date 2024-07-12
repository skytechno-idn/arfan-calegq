import type { AppProps as NextAppProps } from "next/app";
import "@/styles/globals.css";
import ErrorBoundary from "./_error";
import React from "react";
import { NextComponentType } from "next";
import "dayjs/locale/id";
import dayjs from "dayjs";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import { SessionProvider } from "next-auth/react";
import Router from 'next/router';
import NProgress from 'nprogress';
dayjs.locale("id");
type GetLayout = (page: React.ReactNode) => React.ReactNode;

type ComponentProp = NextComponentType & {
  getLayout?: GetLayout;
};

type AppProps = NextAppProps & { Component: ComponentProp };

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
NProgress.configure({ showSpinner: false })


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const getLayout =
    Component.getLayout ??
    ((page) => <ProtectedLayout>{page}</ProtectedLayout>);
  return (
    <ErrorBoundary>
      <React.StrictMode>
        <SessionProvider session={session}>
          {getLayout(<Component {...pageProps} />)}
        </SessionProvider>
      </React.StrictMode>
    </ErrorBoundary>
  );
}

export default MyApp;
