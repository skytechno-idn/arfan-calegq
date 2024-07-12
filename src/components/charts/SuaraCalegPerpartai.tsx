import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  ScrollShadow,
} from "@nextui-org/react";
import { Maximize2, Minimize2 } from "lucide-react";

import useDeviceDetection from "@/hooks/UseDeviceDetect";
import { DASHBOARD } from "@/configs/admin-endpoints";
import axiosInstance from "@/lib/axios";
import {
  formatRibuan,
  getPartyInfo,
  groupPartaiCaleg,
} from "@/lib/helper";
const ChartRaceSuaraCalegPerpartai = ({ title, delay, query }) => {
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
        const newData = groupPartaiCaleg(ress);
        console.log(newData);
        setData(newData);
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
              {data  && Object.keys(data).map((id_partai) => (
                <div
                  key={id_partai}
                  className="bg-gray-100 rounded-lg overflow-hidden mb-2"
                >
                  <div className=" p-2 bg-white flex items-center gap-3 border rounded-t-lg">
                    <Image
                      isBlurred
                      className="w-12 h-12 object-scale-down border"
                      src={getPartyInfo(parseInt(id_partai))?.logo}
                      alt="partai"
                    />
                    <div>
                      <div className="font-semibold">
                        {getPartyInfo(parseInt(id_partai))?.label}
                       
                      </div>
                      <div>
                        Total Suara Caleg :{" "}
                        <strong>{formatRibuan(
                          data?.[id_partai]?.jumlah_total_suara_caleg
                        )}</strong>
                      </div>
                    </div>
                  </div>
                  <div className=" p-2">
                    <ul>
                      {Object.values(data[id_partai].caleg).map(
                        (caleg: any) => (
                          <li key={caleg.id_caleg} className="border-b-2 py-1">
                            <strong className="text-sm">
                              {" "}
                              {caleg.nomor_urut} # {caleg.nama_caleg}
                            </strong>{" "}
                            - T. Suara:{" "}
                            <strong>{formatRibuan(caleg.jml_suara)}</strong>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              ))}
              
            </ScrollShadow>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ChartRaceSuaraCalegPerpartai;
