import MobileLayout from "@/layouts/MobileLayout";
import { Page } from "konsta/react";
import React from "react";

const HomePage = () => {
  return (
    <MobileLayout>
      <div>
          <div className="bg-primary p-5 ">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white"></div>
                <div>Calego</div>
              </div>
            </div>
          </div>
          <div className="p-3 -mt-8">
            <div className="w-full bg-white p-5 rounded-lg ">
              <div>
                <span className="font-semibold">TPS </span>: 001
              </div>
              <div>
                <span className="font-semibold">Kecamatan</span> : 001
              </div>
              <div>
                <span className="font-semibold">Kabupaten</span> :
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="grid grid-cols-3  gap-2">
              <div className="bg-white p-3 rounded-lg">
                <span className="tracking-tighter text-sm font-semibold">Total DPT</span>
                <div className="font-bold">12.000</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <span className="tracking-tighter text-sm font-semibold">Total Saksi</span>
                <div className="font-bold">12.000</div>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <span className="tracking-tighter text-sm font-semibold">Total TPS</span>
                <div className="font-bold">12.000</div>
              </div>
            </div>

            <div className="mt-5">
              <div className="font-semibold">Agenda</div>
              <div className="mt-2 grid grid-cols-1 gap-2">
                <div className="bg-white p-3 rounded-lg">
                  asasa
                  <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quos, architecto! Vero optio blanditiis soluta eveniet
                    laboriosam sint deserunt corrupti ab esse at nesciunt,
                    libero ut dicta molestiae laborum voluptatum. Minus.
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="font-semibold">Sebaran Wilayah Saksi</div>
              <div className="mt-2 grid grid-cols-1 gap-2">
                <div className="bg-white p-3 rounded-lg">
                  <span className="tracking-tighter text-sm">Buntulia</span>
                  <div>12.000</div>
                </div>

                <div className="bg-white p-3 rounded-lg">
                  <span className="tracking-tighter text-sm">Popayato</span>
                  <div>12.000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </MobileLayout>
  );
};

export default HomePage;
