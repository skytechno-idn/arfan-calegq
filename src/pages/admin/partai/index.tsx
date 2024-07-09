import DataTable from "@/components/Datatable";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import useSWR from "swr";
import { PARTAI } from "@/configs/admin-endpoints";
import { Pencil, PlusCircle, Trash } from "lucide-react";

import Modals from "./modals";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import DialogDelete from "@/components/DialogDelete";
import { usePartaiStore } from "@/stores/partaiStore";

const PartaiPage = () => {
  const [url, setUrl] = useState(`${PARTAI.GET}?page=1&pageSize=10&search=`);
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
  } = usePartaiStore();

  const renderCell = React.useCallback((row: any, columnKey: any) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "color":
        return (
          <div>
            <p>{row.color}</p>
          </div>
        );
      case "nama_partai":
        return <div>{row.nama_partai}</div>;
      case "label_partai":
        return (
          <div>
            <p>{row.label_partai}</p>
          </div>
        );
      case "nomor_urut":
        return (
          <div>
            <p>{row.nomor_urut}</p>
          </div>
        );
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
        `${PARTAI.DELETE}/${rowSelected.id}`
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
        <div className="text-2xl font-bold">Partai</div>
        <div className="tracking-tighter">Managemen Data Partai</div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div>
          <DialogDelete
            onClose={() => handleModalsTrigger("alertDelete")}
            title="Partai"
            rowSelected={rowSelected}
            processing={processing}
            isOpen={modals?.alertDelete}
            onTrigger={() => destroyRow()}
          />
          <Modals onMutate={() => mutate(false)} />
          {result && (
            <DataTable
              searchingKey="Nama Partai"
              loading={loadingData}
              triggerSearch={(e) => setUrl(`${PARTAI.GET}?page=1&search=${e}`)}
              triggerChangePage={(e) => setUrl(`${PARTAI.GET}?page=${e}`)}
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
                    Tambah Partai
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

export default PartaiPage;
