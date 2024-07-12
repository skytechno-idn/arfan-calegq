import { LOCATION } from "@/configs/admin-endpoints";
import { padNumber } from "@/lib/helper";
import { Button, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const FilterDashboard = ({ onFilter }) => {
  const [filterKec, setFilterKec] = useState<any>("all");
  const [filterDesa, setFilterDesa] = useState<any>("");
  const [filterTPS, setFilterTPS] = useState<any>("");
  const [dataKec, setDataKec] = useState<any>([]);
  const [dataDesa, setDataDesa] = useState<any>([]);
  const [dataTPS, setDataTPS] = useState<any>([]);

  const { data: responseDataKec, isLoading: loadingDataKec } = useSWR(
    `${LOCATION.KEC}`
  );
  const { data: responseDataDESA, isLoading: loadingDataDESA } = useSWR(
    filterKec && filterKec !== "all" ? `${LOCATION.DESA}${filterKec}` : null
  );
  const { data: responseDataTPS, isLoading: loadingDataTPS } = useSWR(
    filterDesa && filterDesa !== "all" && filterKec && filterKec !== "all"
      ? `${LOCATION.TPS}${filterDesa}`
      : null
  );

  useEffect(() => {
    setDataKec(responseDataKec?.result || []);
    setDataDesa([]);
    setDataTPS([]);
  }, [responseDataKec]);

  useEffect(() => {
    setDataDesa(responseDataDESA?.result || []);
    setDataTPS([]);
  }, [responseDataDESA, filterKec]);

  useEffect(() => {
    setDataTPS(responseDataTPS?.result || []);
  }, [responseDataTPS, filterDesa]);
  const filterLocation = () => {
    const query = `?id_kecamatan=${
      filterKec === "all" ? "" : filterKec
    }&id_desa=${filterDesa === "all" ? "" : filterDesa}&id_tps=${
      filterTPS === "all" ? "" : filterTPS
    }`;
    console.log(query);
    onFilter(query);
  };
  return (
    <div className="lg:flex lg:flex-row flex-col justify-center gap-3 items-center">
      <div className="lg:flex-1">
        <div className="grid lg:grid-cols-3 gap-2 items-center">
          <div>
            <Select
              className="w-full"
              isLoading={loadingDataKec}
              label="Pilih Kecamatan"
              placeholder="Pilih Kecamatan"
              selectedKeys={new Set([filterKec])}
              onSelectionChange={(e) => {
                const selectedKec: any = Array.from(e)
                  ? Array.from(e)?.[0]
                  : "all";
                if (selectedKec === "all") {
                  setFilterDesa([]);
                  setFilterTPS([]);
                }
                setFilterKec(selectedKec);
              }}
            >
              <SelectItem key={"all"}>SEMUA</SelectItem>
              {dataKec?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.nama_kacamatan}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <Select
              isDisabled={filterKec === "all" ? true : false}
              className="w-full"
              isLoading={loadingDataDESA}
              label="Pilih Desa"
              placeholder="Pilih Desa"
              selectedKeys={new Set([filterDesa])}
              onSelectionChange={(e) => {
                const selectedDesa: any = Array.from(e)
                  ? Array.from(e)?.[0]
                  : "all";
                if (selectedDesa === "all") {
                  setFilterTPS([]);
                }
                setFilterDesa(selectedDesa);
              }}
            >
              <SelectItem key={"all"}>SEMUA</SelectItem>
              {dataDesa?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.nama_desa}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div>
            <Select
              isDisabled={filterKec === "all" ? true : false}
              className="w-full"
              isLoading={loadingDataTPS}
              label="Pilih TPS"
              placeholder="Pilih TPS"
              selectedKeys={new Set([filterTPS])}
              onSelectionChange={(e) => {
                const selectedTPS: any = Array.from(e)
                  ? Array.from(e)?.[0]
                  : "all";
                setFilterTPS(selectedTPS);
              }}
            >
              <SelectItem key={"all"}>SEMUA</SelectItem>
              {dataTPS?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {padNumber(item.nama_tps)}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="lg:mt-0 mt-2">
        <Button
          color="primary"
          className="lg:w-auto w-full"
          onClick={filterLocation}
        >
          Filter Race Bar (RB)
        </Button>
      </div>
    </div>
  );
};

export default FilterDashboard;
