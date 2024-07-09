import Image from "next/image";
import { Inter } from "next/font/google";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const redirectInterval = setInterval(() => {
      router.push("/auth/signin");
    }, 5000);

    return () => {
      clearInterval(redirectInterval);
    };
  }, []);
  return (
    <div className="h-96 flex flex-col items-center justify-center ">
      <Spinner size="lg" />
    </div>
  );
}
