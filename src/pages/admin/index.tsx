import ChartRaceDemo from "@/components/chartRaceDemo";
import ChartRaceDemo1 from "@/components/chartRaceDemo1";
import ChartRaceSuaraCaleg from "@/components/charts/SuaraCaleg";
import ChartRaceSuaraCalegPerpartai from "@/components/charts/SuaraCalegPerpartai";
import ChartRaceSuaraKursi from "@/components/charts/SuaraKursi";
import ChartRaceSuaraPartai from "@/components/charts/SuaraPartai";
import FilterDashboard from "@/components/FilterDashboard";
import { DASHBOARD, LOCATION } from "@/configs/admin-endpoints";
import { formatRibuan } from "@/lib/helper";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";

import {
  Archive,
  CalendarClock,
  DoorClosed,
  FileTextIcon,
  Flag,
  Percent,
  SquareUserRound,
  User2,
  Users2,
} from "lucide-react";
import React, { useState } from "react";
import useSWR from "swr";

const HomePage = () => {
  const { data: responseDataMAIN, isLoading: loadingData } = useSWR(
    `${DASHBOARD.SUARA_MAIN}`,
    {
      keepPreviousData: true,
      refreshInterval: 5000,
    }
  );

  const [queryFilter, SetQueryFilter] = useState(
    "?id_kecamatan=&id_desa=&id_tps="
  );

  const { result } = responseDataMAIN || {};

  const statsData = [
    {
      label: "DATA Peserta CALEG",
      value: result?.jml_caleg,
      bgColor: "bg-primary",
      icon: SquareUserRound,
    },
    {
      label: "DATA TPS",
      value: result?.jml_tps,
      bgColor: "bg-warning",
      icon: DoorClosed,
    },
    {
      label: "DATA Partai",
      value: result?.jml_partai,
      bgColor: "bg-danger",
      icon: Flag,
    },
    {
      label: "DATA Saksi",
      value: result?.jml_saksi,
      bgColor: "bg-success",
      icon: User2,
    },

    {
      label: "Data Suara Per TPS Masuk",
      value: `${formatRibuan(result?.data_masuk ?? 0)} dari ${formatRibuan(
        result?.jml_tps ?? 0
      )} TPS`,
      bgColor: "bg-warning",
      icon: Archive,
    },
    {
      label: "Presentase Suara Masuk",
      value: result?.data_masuk
        ? formatRibuan((result?.data_masuk / result?.jml_tps) * 100) + "%"
        : "0%",
      bgColor: "bg-primary",
      icon: Percent,
    },
  ];
  const StatsGrid = () => {
    return (
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-2">
        {!loadingData &&
          statsData.map((stat, index) => (
            <div
              key={index}
              className={`rounded-lg ${stat.bgColor} lg:p-5 p-2 text-white group`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="tracking-tighter lg:text-base text-xs leading-1">
                    {stat.label}
                  </div>
                  <div className="lg:text-2xl text-sm font-bold ">
                    {stat.value}
                  </div>
                </div>
                <div>
                  <stat.icon
                    className="rotate-12 lg:w-12 lg:h-12 w-8
h-8 group-hover:rotate-0 text-white opacity-20"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  };

  const RenderPartai = () => (
    <div>
      <ChartRaceSuaraPartai
        query={queryFilter}
        delay="10000"
        title="RB Suara Partai"
      />
    </div>
  );

  const RenderCaleg = () => (
    <div>
      <ChartRaceSuaraCaleg
        query={queryFilter}
        delay="10000"
        title="RB Suara Caleg"
      />
    </div>
  );
  const RenderCalegPerpartai = () => (
    <div>
      <ChartRaceSuaraCalegPerpartai
        query={queryFilter}
        delay="10000"
        title="RB Suara Caleg Per Partai"
      />
    </div>
  );

  const RenderKursi = () => (
    <div>
      <ChartRaceSuaraKursi delay="100000" title="RB Suara Perebutan Kursi" />
    </div>
  );
  return (
    <div>
      <StatsGrid />
      <Divider className="my-2" />
      <div className="mt-2 grid lg:grid-cols-3">
        <div className="col-span-2">
          <FilterDashboard onFilter={(q) => SetQueryFilter(q)} />
        </div>
      </div>
      <div className="grid lg:grid-cols-5 gap-2 mt-3">
        <div className="lg:col-span-3">
          <RenderCaleg />
        </div>
        <div className="lg:col-span-2">
          <RenderCalegPerpartai />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-2 mt-3">
        <div>
          <RenderPartai />
        </div>
        <div>
          <RenderKursi />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
