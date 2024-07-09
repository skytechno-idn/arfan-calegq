import DataTable from "@/components/Datatable";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import useSWR from "swr";
import { SAKSI, TPS } from "@/configs/admin-endpoints";
import { Pencil, PlusCircle, Trash } from "lucide-react";
import { useSaksiStore } from "@/stores/saksiStore";
import Modals from "./modals";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import DialogDelete from "@/components/DialogDelete";
import { formatRibuan } from "@/lib/helper";

const SaksiPage = () => {
  const [url, setUrl] = useState(`${SAKSI.GET}?page=1&pageSize=10&search=`);
  const {
    data: responseData,
    mutate: mutate,
    isLoading: loadingData,
  } = useSWR(`${url}`, {
    keepPreviousData: true,
  });
  const { data: responseDataTPS, isLoading: loadingDataTPS } = useSWR(
    SAKSI.GET_TPS,
    {
      keepPreviousData: true,
    }
  );

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
  } = useSaksiStore();

  const renderCell = React.useCallback((row: any, columnKey: any) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "nama_saksi":
        return <div>{row.nama_saksi}</div>;
      case "email_saksi":
        return (
          <div>
            <p>{row.email_saksi}</p>
          </div>
        );
      case "telp_saksi":
        return (
          <div>
            <p>{row.telp_saksi}</p>
          </div>
        );
      case "tps":
        return (
          <div>
            <p>
              TPS <b> {row.tps?.nama_tps}</b>
            </p>
          </div>
        );
      case "dpt":
        return (
          <div>
            <Chip size="sm" color="primary">
              {formatRibuan(row.tps?.jml_dpt ?? 0)}
            </Chip>
          </div>
        );
      case "kecamatan":
        return (
          <div>
            <p className="text-sm">{row?.tps?.kecamatan?.nama_kacamatan}</p>
          </div>
        );
      case "kelurahan":
        return (
          <div>
            <p className="text-sm">{row?.tps?.desa?.nama_desa}</p>
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
        `${SAKSI.DELETE}/${rowSelected.id}`
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
        <div className="text-2xl font-bold">Saksi</div>
        <div className="tracking-tighter">Managemen Data Saksi</div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div>
          <DialogDelete
            onClose={() => handleModalsTrigger("alertDelete")}
            title="Saksi"
            rowSelected={rowSelected}
            processing={processing}
            isOpen={modals?.alertDelete}
            onTrigger={() => destroyRow()}
          />
          <Modals
            tpsData={responseDataTPS?.result ?? []}
            kecamatanData={responseDataKECAMATAN?.result ?? []}
            onMutate={() => mutate(false)}
          />
          {result && (
            <DataTable
              searchingKey="Nama,Email"
              loading={loadingData}
              triggerSearch={(e) => setUrl(`${SAKSI}?page=1&search=${e}`)}
              triggerChangePage={(e) => setUrl(`${SAKSI}?page=${e}`)}
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
                    Tambah Saksi
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

export default SaksiPage;
