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

const ChartRaceDemo = ({ title, delay }) => {
  const device = useDeviceDetection();
  const [data, setData] = useState<any>([]);
  const [fsc, setFsc] = useState<any>(false);
  useEffect(() => {
    const handleChange = () => {
      const newData = Array.from({ length: 74 }, (_, id) => ({
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
      "| Abd. Rahman Rahmola",
      "| Abdurahman Rahmola",
      "| Ahmad Bantahari",
      "| Alivah Fungsiani Inaku",
      "| Alwin Towapo",
      "| Alyan Ardari",
      "| Amir Sidariman",
      "| Andari Meysa Pritha Fadhila Hulikati",
      "| Ariono Dukalang",
      "| Asra Djibu",
      "| Asrin Musa",
      "| Astina Abubakar",
      "| Aswan Djamaluddin",
      "| Azis Hamid Humonggio",
      "| Bakran Kolosol",
      "| Burhan Mantulangi",
      "| Dedy Hamsah",
      "| Dewi Permatasari Sulistyoningsih",
      "| Dina Hodjo",
      "| Dinda Amelia Koni",
      "| Djafar Latip Kilo",
      "| Djarir Nawai",
      "| Djoni Dalanggo",
      "| Djulaeha Kaparang",
      "| Fachmi Rudiawansyah Mopangga",
      "| Faisal Rust'am",
      "| Frangky Tumaliang",
      "| H. Ismail Aljulu",
      "| H. Jusuf Makuta",
      "| H. Mikson Yapanto",
      "| Hamka Nento",
      "| Hamka Taha",
      "| Hamsia Abdul Azis",
      "| Harun Adam",
      "| Hasmiaty Tantu",
      "| Havid Abdul Gani",
      "| Hein Batiti",
      "| Herman Bater",
      "| Hj. Delfi Jusuf",
      "| Hj. Masna I. Djakatara",
      "| I Wayan Sudiarta",
      "| Ibrahim Bouti",
      "| Ikhwan",
      "| Imran Abdul",
      "| Imran Badjak",
      "| Imran Uno",
      "| Ir. Adrian Inaku",
      "| Ir. Hi. Anas Jusuf",
      "| Ir. La Ode Haimudin",
      "| Irianto Ibrahim Hiola",
      "| Ismail Ahmad",
      "| Ismayati Saidi",
      "| Iwan Moha",
      "| Iyam Mantali",
      "| Iyam Rajak",
      "| Khusnul Hidayah",
      "| Len Helen Mahieu",
      "| Lilan Sri Anindita Uni",
      "| Limonu Hippy",
      "| Liyona Lihawa",
      "| Lukman Rujua",
      "| M. Hidayat H. Bouty",
      "| Marittin Natilova Riu",
      "| Melis Olili",
      "| Moh. Firdaus Laima",
      "| Mohamad David N. Tamu",
      "| Muhammad Dzikyan",
      "| Mustafa Yasin",
      "| Nadjah Hamid",
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
              <div className="flex gap-2">
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
              <Select
               
                label="Pilih Desa"
                placeholder="Pilih Desa"
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
              <Select
               
                label="TPS"
                placeholder="TPS"
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
            </div>
            <Divider className="mb-5" />
            <ScrollShadow className={`h-[${fsc ? "100vh" : "500px"}]`}>
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
