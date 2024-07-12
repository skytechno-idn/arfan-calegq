import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GuestLayout from "@/layouts/GuestLayout";

const LandingPage = () => {
  const router = useRouter();
  useEffect(() => {
    const redirectInterval = setInterval(() => {
      router.push("/auth/signin");
    }, 1000);

    return () => {
      clearInterval(redirectInterval);
    };
  }, []);
  return (
    <div className="h-96 flex flex-col items-center justify-center ">
      <Spinner size="lg" />
    </div>
  );
};
LandingPage.getLayout = (page) => <GuestLayout>{page}</GuestLayout>;
export default LandingPage;
