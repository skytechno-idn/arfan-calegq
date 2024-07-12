import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
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
const ChartRace = dynamic(() => import("react-chart-race"), { ssr: false });

import useDeviceDetection from "@/hooks/UseDeviceDetect";
import useSWR from "swr";
import { DASHBOARD, LOCATION } from "@/configs/admin-endpoints";
import axiosInstance from "@/lib/axios";
const ChartRaceSuaraPartai = ({ title, delay, query }) => {
  const device = useDeviceDetection();
  const [data, setData] = useState<any>([]);
  const [fsc, setFsc] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);

  const handleChange = async () => {
    try {
      const response = await axiosInstance.get(
        `${DASHBOARD.SUARA_PARTAI}${query}`
      );
      if (response?.data?.success) {
        const newData = response?.data?.result?.map((item, index) => ({
          id: item?.id_partai,
          title: "| " + item?.partai?.label_partai,
          value: parseInt(item?.jml_suara),
          color: item?.partai?.color,
        }));
        setData(newData);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    handleChange();
    const interval = setInterval(() => {
      setLoading(true);
      handleChange();
    }, delay ?? 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setData([]);
    handleChange();
  }, [query]);

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
          <Divider />
          <CardBody>
            <ScrollShadow className={`${fsc ? "h-[100vh]" : "h-[400px]"}`}>
              <ChartRace
                data={data as any}
                backgroundColor="transparent"
                width={fsc ? (device !== "Desktop" ? 180 : 500) : 250}
                padding={0}
                itemHeight={fsc ? (device !== "Desktop" ? 10 : 20) : 10}
                gap={10}
                titleStyle={{ font: "normal 700 15px Arial", color: "#000" }}
                valueStyle={{
                  font: "normal 600 15px  Arial",
                  color: "#888",
                }}
              />
            </ScrollShadow>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ChartRaceSuaraPartai;
