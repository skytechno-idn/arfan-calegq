import DataTable from "@/components/Datatable";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import useSWR from "swr";
import { ADMIN } from "@/configs/admin-endpoints";
import { Pencil, PlusCircle, Trash } from "lucide-react";

import Modals from "./modals";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import DialogDelete from "@/components/DialogDelete";
import { useAdminStore } from "@/stores/adminStore";

const AdminPage = () => {
  const [url, setUrl] = useState(`${ADMIN}?page=1&pageSize=10&search=`);
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
  } = useAdminStore();

  const renderCell = React.useCallback((row: any, columnKey: any) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "nama_admin":
        return <div>{row.nama_admin}</div>;
      case "email_admin":
        return (
          <div>
            <p>{row.email_admin}</p>
          </div>
        );
      case "telp_admin":
        return (
          <div>
            <p>{row.telp_admin}</p>
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
      const response = await axiosInstance.delete(`${ADMIN}/${rowSelected.id}`);
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
        <div className="text-2xl font-bold">Admin</div>
        <div className="tracking-tighter">Managemen Data ADmin</div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div>
          <DialogDelete
            onClose={() => handleModalsTrigger("alertDelete")}
            title="Admin"
            rowSelected={rowSelected}
            processing={processing}
            isOpen={modals?.alertDelete}
            onTrigger={() => destroyRow()}
          />
          <Modals onMutate={() => mutate(false)} />
          {result && (
            <DataTable
              searchingKey="Nama,Email"
              loading={loadingData}
              triggerSearch={(e) => setUrl(`${ADMIN}?page=1&search=${e}`)}
              triggerChangePage={(e) => setUrl(`${ADMIN}?page=${e}`)}
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
                    Tambah Admin
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

export default AdminPage;
