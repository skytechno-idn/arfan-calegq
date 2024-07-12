import DataTable from "@/components/Datatable";
import React, { useState } from "react";
import {
  Button,
  Chip,
} from "@nextui-org/react";
import useSWR from "swr";
import { SAKSI, TPS } from "@/configs/admin-endpoints";
import { Pencil, PlusCircle, Trash } from "lucide-react";

import Modals from "./modals";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import DialogDelete from "@/components/DialogDelete";
import { formatRibuan } from "@/lib/helper";
import { useTpsStore } from "@/stores/tpsStore";
import dayjs from "@/lib/dayjs";

const TpsPage = () => {
  const [url, setUrl] = useState(`${TPS.GET}?page=1&pageSize=10&search=`);
  const {
    data: responseData,
    mutate: mutate,
    isLoading: loadingData,
  } = useSWR(`${url}`, {
    keepPreviousData: true,
  });

 

  const {
    rows: result,
    totalPage,
    totalRow: totalRows,
    page,
    pageSize,
  } = responseData || {};

  const {
    handleModalsTrigger,
    modals,
    rowSelected,
    setProcessing,
    processing,
    columns,
  } = useTpsStore();

  const renderCell = React.useCallback((row: any, columnKey: any) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "nama_tps":
        return <div>{row?.desa?.nama_desa} {row.nama_tps}</div>;
      case "dpt":
        return (
          <div>
            <Chip size="sm" color="primary">
              {formatRibuan(row?.jml_dpt ?? 0)}
            </Chip>
          </div>
        );
      case "kecamatan":
        return (
          <div>
            <p className="text-sm">{row?.kecamatan?.nama_kacamatan}</p>
          </div>
        );
      case "kelurahan":
        return (
          <div>
            <p>{row?.desa?.nama_desa}</p>
          </div>
        );

        case "createdAt":
          return (
            <div className="tracking-tighter ">
              {dayjs(row.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </div>
          );
        case "updatedAt":
          return (
            <div className="tracking-tighter ">
              {dayjs(row.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
            </div>
          );
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            {/* <Button
              size="sm"
              onClick={() => handleModalsTrigger("form", row)}
              isIconOnly
              color="primary"
              startContent={<Pencil size={15} />}
            />
            <Button
              size="sm"
              onClick={() => handleModalsTrigger("alertDelete", row)}
              isIconOnly
              color="danger"
              startContent={<Trash size={15} />}
            /> */}
          </div>
        );
      default:
        return <span>{cellValue}</span>;
    }
  }, []);

  const destroyRow = async () => {
    setProcessing(true);
    try {
      const response = await axiosInstance.delete(
        `${TPS.DELETE}/${rowSelected.id}`
      );
      if (response?.data.success) {
        toast.success("success");
        handleModalsTrigger("alertDelete");
        mutate(false);
      } else {
        toast.error(response.data.message ?? "fail");
      }
    } catch (e) {
      toast.error("error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <div className="mb-5">
        <div className="text-2xl font-bold">TPS</div>
        <div className="tracking-tighter">Managemen Data TPS</div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div>
          <DialogDelete
            onClose={() => handleModalsTrigger("alertDelete")}
            title="TPS"
            rowSelected={rowSelected}
            processing={processing}
            isOpen={modals?.alertDelete}
            onTrigger={() => destroyRow()}
          />
          <Modals
          
            onMutate={() => mutate(false)}
          />
          {result && (
            <DataTable
              searchingKey="Nama TPS"
              loading={loadingData}
              triggerSearch={(e) => setUrl(`${TPS.GET}?page=1&search=${e}`)}
              triggerChangePage={(e) => setUrl(`${TPS.GET}?page=${e}`)}
              data={result}
              page={page}
              totalPage={totalPage}
              totalRows={totalRows}
              columns={columns}
              renderCell={renderCell}
              rightTop={
                <>
                  {/* <Button
                    color="primary"
                    onClick={() => handleModalsTrigger("form", null)}
                    startContent={<PlusCircle />}
                  >
                    Tambah TPS
                  </Button> */}
                </>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TpsPage;