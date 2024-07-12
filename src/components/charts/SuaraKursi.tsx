import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { mapValues } from "lodash";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
  ScrollShadow,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { Maximize2, Minimize2 } from "lucide-react";

import useDeviceDetection from "@/hooks/UseDeviceDetect";
import useSWR from "swr";
import { DASHBOARD, LOCATION } from "@/configs/admin-endpoints";
import axiosInstance from "@/lib/axios";
const ChartRaceSuaraKursi = ({ title, delay }) => {
  const [data, setData] = useState<any>([]);
  const [fsc, setFsc] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    const handleChange = async () => {
      try {
        const response = await axiosInstance.get(`${DASHBOARD.KURSI}`);
        if (response?.data?.success) {
          const ress = response?.data?.result;

          setData(ress);
        }
      } catch (error) {
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    handleChange();
    const interval = setInterval(() => {
      setLoading(true);
      handleChange();
    }, delay ?? 2000);

    return () => clearInterval(interval);
  }, []);

  const RenderKursi = ({ kursi, ind }) => (
    <div className="border p-2 rounded-lg flex gap-2 items-center mb-1 relative">
      <div className="absolute right-2 top-2 lg:block hidden">
        <Chip color="primary" size="lg">
          Kursi {ind}
        </Chip>
      </div>
      <div>
        <Image
          isBlurred
          className="w-12 h-12 object-scale-down"
          src={`/images/partai/${data?.[kursi]?.logo_partai}`}
          alt={data?.[kursi]?.nama_partai}
        />
      </div>
      <div className="flex flex-col">
        <div className="font-semibold lg:text-lg text-xs tracking-tighter">
          {data?.[kursi]?.caleg?.["caleg.nama_caleg"]
            ? `# ${ind} |  ${data?.[kursi]?.caleg?.["caleg.nama_caleg"]}`
            : "KOSONG"}{" "}
        </div>
        <div className="lg:text-base text-xs">{data?.[kursi]?.nama_partai}</div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        <Card
          className={`${
            fsc ? "inset-0 fixed z-50" : ""
          } ease-in-out duration-300`}
        >
          <CardHeader>
            <div className="flex w-full justify-between items-center">
              <div className="w-full">{title}</div>
              <Button
                size="sm"
                color="primary"
                isIconOnly
                onClick={() => {
                  setFsc(!fsc);
                }}
              >
                {fsc ? (
                  <Maximize2 className="w-5 h-5" />
                ) : (
                  <Minimize2 className="w-5 h-5" />
                )}
              </Button>
            </div>
          </CardHeader>
          <Divider className="mb-5" />
          <CardBody>
            <div className="mb-2">
              <div>
                {loading && (
                  <div className="flex items-center gap-2">
                    <Spinner size="sm" />
                    <div>{"Sedang Memuat ...."}</div>
                  </div>
                )}
              </div>
            </div>

            <ScrollShadow className={`${fsc ? "h-[100vh]" : "h-[400px]"} pr-3`}>
              <RenderKursi kursi={"KURSI1"} ind="1" />
              <RenderKursi kursi={"KURSI2"} ind="2" />
              <RenderKursi kursi={"KURSI3"} ind="3" />
              <RenderKursi kursi={"KURSI4"} ind="4" />
              <RenderKursi kursi={"KURSI5"} ind="5" />
              <RenderKursi kursi={"KURSI6"} ind="6" />
              <RenderKursi kursi={"KURSI7"} ind="7" />
              <RenderKursi kursi={"KURSI8"} ind="8" />
              <RenderKursi kursi={"KURSI9"} ind="9" />
              <RenderKursi kursi={"KURSI10"} ind="10" />
              <RenderKursi kursi={"KURSI11"} ind="11" />
            </ScrollShadow>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ChartRaceSuaraKursi;
