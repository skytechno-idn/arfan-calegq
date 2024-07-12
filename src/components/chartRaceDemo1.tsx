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
} from "@nextui-org/react";
import { Maximize2, Minimize2 } from "lucide-react";
const ChartRace = dynamic(() => import("react-chart-race"), { ssr: false });

import useDeviceDetection from "@/hooks/UseDeviceDetect";
import useSWR from "swr";
import { DASHBOARD } from "@/configs/admin-endpoints";
const ChartRaceDemo = ({ title, delay }) => {
 
  const device = useDeviceDetection();
  const [data, setData] = useState<any>([]);
  const [fsc, setFsc] = useState<any>(false);
  useEffect(() => {
    const handleChange = () => {
      const newData = Array.from({ length: 18 }, (_, id) => ({
        id,
        title: getRandomName(),
        value: getRandomInt(10, 900),
        color: getRandomColor(),
      }));
      setData(newData);
    };

    handleChange();
    const interval = setInterval(() => {
      handleChange();
    }, delay ?? 2000);

    return () => clearInterval(interval);
  }, []);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getRandomName = () => {
    const names = [
      "| Gerindra",
      "| Golkar",
      "| NasDem",
      "| Demokrat",
      "| PKB",
      "| PAN",
      "| PKS",
      "| PPP",
      "| PSI",
      "| Hanura",
      "| Demokrat",
      "| Garuda",
      "| PDI Perjuangan",
      "| PKPI",
      "| PBB",
      "| Perindo",
      "| Berkarya",
      "| PAN",
      "| PBB",
      "| PSI",
    ];
    return names[Math.floor(Math.random() * names.length)];
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
            <div className="mb-5">
              <Select
              
                label="Pilih Kecamatan"
                placeholder="Pilih Kecamatan"
                // {...register("type")}
                // isInvalid={errors?.type ? true : false}
                // errorMessage={errors?.type?.message}
              >
                {[
                  {
                    label: "Semua",
                    key: "admin",
                  },
                  {
                    label: "Popayato",
                    key: "relawan",
                  },
                  {
                    label: "Lemito",
                    key: "saksi",
                  },
                ].map((animal) => (
                  <SelectItem key={animal.key}>{animal.label}</SelectItem>
                ))}
              </Select>
            </div>
            <Divider className="mb-5"/>
            <ScrollShadow className={`${fsc ? "h-[100vh]" : "h-[500px]"}`}>
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

export default ChartRaceDemo;
