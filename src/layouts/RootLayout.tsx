
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { SWRConfig } from "swr";
import axiosInstance from "@/lib/axios";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({
    children,
}: {
    children: React.ReactNode | any;
}) {
    const router = useRouter();
    return (

        <NextUIProvider navigate={router.push} className={`safe-areas antialiased ${inter.className}`}>
            <ThemeProvider attribute="class" defaultTheme="light">
            <Toaster
  position="top-center"
  reverseOrder={false}
/>
                <SWRConfig
                    value={{
                        fetcher: (url: string) =>
                            axiosInstance.get(url).then((res: any) => {
                                return {
                                    ...res?.data,
                                    status: res?.status,
                                };
                            }
                            )
                    }}
                >
                    {children}
                </SWRConfig>
            </ThemeProvider>
        </NextUIProvider>



    );
}

