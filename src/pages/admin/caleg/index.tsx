



import DataTable from "@/components/Datatable";
import React, { useState } from "react";
import { Button, Chip } from "@nextui-org/react";
import useSWR from "swr";
import { CALEG, SAKSI, TPS } from "@/configs/admin-endpoints";
import { Pencil, PlusCircle, Trash } from "lucide-react";

import Modals from "./modals";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import DialogDelete from "@/components/DialogDelete";

import { useCalegStore } from "@/stores/calegStore";

const CalegPage = () => {
  const [url, setUrl] = useState(`${CALEG.GET}?page=1&pageSize=10&search=`);
  const {
    data: responseData,
    mutate: mutate,
    isLoading: loadingData,
  } = useSWR(`${url}`, {
    keepPreviousData: true,
  });

  const { data: responseDataKECAMATAN, isLoading: loadingDataKECAMATAN } =
    useSWR(SAKSI.GET_KECAMATAN, {
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
  } = useCalegStore();

  const renderCell = React.useCallback((row: any, columnKey: any) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "nama_caleg":
        return <div>MARISA {row.nama_caleg}</div>;
      case "partai":
        return <div>GERINDRA</div>;

      case "createdAt":
        return (
          <div className="tracking-tighter ">
            {/* {dayjs(row.createdAt).format("DD-MM-YYYY HH:mm:ss")} */}
          </div>
        );
      case "updatedAt":
        return (
          <div className="tracking-tighter ">
            {/* {dayjs(row.updatedAt).format("DD-MM-YYYY HH:mm:ss")} */}
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Button
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
            />
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
        <div className="text-2xl font-bold">Caleg</div>
        <div className="tracking-tighter">Managemen Data Caleg</div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div>
          <DialogDelete
            onClose={() => handleModalsTrigger("alertDelete")}
            title="Caleg"
            rowSelected={rowSelected}
            processing={processing}
            isOpen={modals?.alertDelete}
            onTrigger={() => destroyRow()}
          />
          <Modals
            kecamatanData={responseDataKECAMATAN?.result ?? []}
            onMutate={() => mutate(false)}
          />
          {result && (
            <DataTable
              searchingKey="Nama Caleg"
              loading={loadingData}
              triggerSearch={(e) => setUrl(`${CALEG.GET}?page=1&search=${e}`)}
              triggerChangePage={(e) => setUrl(`${CALEG.GET}?page=${e}`)}
              data={result}
              page={page}
              totalPage={totalPage}
              totalRows={totalRows}
              columns={columns}
              renderCell={renderCell}
              rightTop={
                <>
                  <Button
                    color="primary"
                    onClick={() => handleModalsTrigger("form", null)}
                    startContent={<PlusCircle />}
                  >
                    Tambah Caleg
                  </Button>
                </>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CalegPage;
