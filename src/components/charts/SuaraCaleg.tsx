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
import { generateColors } from "@/lib/helper";
const ChartRaceSuaraCaleg = ({ title, delay, query }) => {
  const device = useDeviceDetection();
  const [data, setData] = useState<any>([]);
  const [fsc, setFsc] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);

  const handleChange = async () => {
    try {
      const response = await axiosInstance.get(
        `${DASHBOARD.SUARA_CALEG}${query}`
      );
      if (response?.data?.success) {
        const ress = response?.data?.result;
        const newData = ress?.map((item, index) => {
          return {
            id: item?.id_caleg,
            title: "| " + item?.caleg?.nama_caleg,
            value: item?.jml_suara ?? 0,
            color: getRandomColor(),
          };
        });
        setData(newData);
        console.log(newData);
      }
    } catch (error) {
    } 
  };

  useEffect(() => {
    handleChange();
    const interval = setInterval(() => {
      setLoading(true);
      handleChange();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setData([]);
    handleChange();
  }, [query]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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

export default ChartRaceSuaraCaleg;
