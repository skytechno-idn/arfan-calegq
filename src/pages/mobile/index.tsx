import { GET_MYTPS } from "@/configs/saksi-endpoints";
import MobileLayout from "@/layouts/MobileLayout";
import { formatRibuan, padNumber } from "@/lib/helper";
import { User } from "@nextui-org/react";
import { Page } from "konsta/react";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";

const HomePage = () => {
  const { data: session, status } = useSession();
  const { user }: any = session || {};
  const {
    data: responseData,
    mutate: mutate,
    isLoading: loadingData,
  } = useSWR(`${GET_MYTPS}`, {
    keepPreviousData: true,
  });
  const { result,total_saksi,
    total_tps } = responseData || {};
  console.log(responseData);
  return (
    <div>
      <div className="bg-primary p-5 ">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-white">
              {user?.name}
              <div className="font-semibold text-xs text-white">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 -mt-8">
        <div className="w-full bg-white p-5 rounded-lg ">
          <div>
            <span className="font-semibold">TPS </span>:{" "}
            <b>{padNumber(parseInt(result?.nama_tps))}</b>
          </div>
          <div>
            <span className="font-semibold">Kecamatan</span> :{" "}
            <b> {result?.kecamatan?.nama_kacamatan}</b>
          </div>
          <div>
            <span className="font-semibold">Desa / Keluarahan</span> :{" "}
            <b>{result?.desa?.nama_desa}</b>
          </div>
        </div>
      </div>
      <div className="px-3">
        <div className="grid grid-cols-3  gap-2">
          <div className="bg-white p-3 rounded-lg">
            <span className="tracking-tighter text-sm font-semibold">
             DPT TPS ini
            </span>
            <div className="font-bold">{formatRibuan(result?.jml_dpt)}</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <span className="tracking-tighter text-sm font-semibold">
             Semua Saksi
            </span>
            <div className="font-bold">{formatRibuan(total_saksi)}</div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <span className="tracking-tighter text-sm font-semibold">
             Semua TPS
            </span>
            <div className="font-bold">{formatRibuan(total_tps)}</div>
          </div>
        </div>
       
        <div className="mt-5">
          <div className="font-semibold">Agenda</div>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="border rounded-lg bg-white  p-2">
              <b>Fitur Mendatang</b>
              <div>dalam tahap pengembangan</div>
            </div>
            {/* <div className="bg-white p-3 rounded-lg">
              asasa
              <div>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos,
                architecto! Vero optio blanditiis soluta eveniet laboriosam sint
                deserunt corrupti ab esse at nesciunt, libero ut dicta molestiae
                laborum voluptatum. Minus.
              </div>
            </div> */}
          </div>
        </div>
        <div className="mt-5">
          <div className="font-semibold">Sebaran Wilayah Saksi</div>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="border rounded-lg bg-white  p-2">
              <b>Fitur Mendatang</b>
              <div>dalam tahap pengembangan</div>
            </div>
            {/* <div className="bg-white p-3 rounded-lg">
              <span className="tracking-tighter text-sm">Buntulia</span>
              <div>12.000</div>
            </div>

            <div className="bg-white p-3 rounded-lg">
              <span className="tracking-tighter text-sm">Popayato</span>
              <div>12.000</div>
            </div> */}
          </div>
        </div>
        <div className="mt-5">
          <div className="font-semibold">Berita Terkini</div>
          <div className="mt-2 grid grid-cols-1 gap-2">
            <div className="border rounded-lg bg-white  p-2">
              <b>Fitur Mendatang</b>
              <div>dalam tahap pengembangan</div>
            </div>
            {/* <div className="bg-white p-3 rounded-lg">
              <span className="tracking-tighter text-sm">Buntulia</span>
              <div>12.000</div>
            </div>

            <div className="bg-white p-3 rounded-lg">
              <span className="tracking-tighter text-sm">Popayato</span>
              <div>12.000</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
HomePage.getLayout = (page) => <MobileLayout>{page}</MobileLayout>;

export default HomePage;
