import MobileLayout from "@/layouts/MobileLayout";
import { Rocket } from "lucide-react";
import React from "react";

const BeritaPage = () => {
  return (
    <div className="h-96 flex flex-col items-center justify-center">
      <Rocket className="w-10 h-10 mb-2"/>
      <div className="font-semibold">
      Fitur Belum Tersedia
      </div>
    </div>
  );
};

BeritaPage.getLayout = (page) => <MobileLayout>{page}</MobileLayout>;

export default BeritaPage;
