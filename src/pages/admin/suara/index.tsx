import DataTable from "@/components/Datatable";
import React, { useState } from "react";
import { Button, Chip, ChipProps, Link } from "@nextui-org/react";
import useSWR from "swr";
import { ADMIN, SUARA } from "@/configs/admin-endpoints";
import { Check, Eye, Pencil, PlusCircle, X } from "lucide-react";
import { useSuaraStore } from "@/stores/suaraStore";
import { formatRibuan, padNumber } from "@/lib/helper";
import dayjs from "@/lib/dayjs";

const SuaraPage = () => {
  const [url, setUrl] = useState(`${SUARA.GET}?page=1&pageSize=10&search=`);
  const {
    data: responseData,
    mutate: mutate,
    isLoading: loadingData,
  } = useSWR(`${url}`, {
    keepPreviousData: true,
    refreshInterval: 4000,
  });

  const {
    rows: result,
    totalPage,
    totalRow: totalRows,
    page,
    pageSize,
  } = responseData || {};

  const { columns } = useSuaraStore();

  function getStatusText(status) {
    switch (status) {
      case "REJECTED":
        return "DITOLAK";
      case "APPROVED":
        return "DITERIMA";
      case "WAITING APPROVED":
        return "BUTUH KONFIRMASI";
      case "REPAIR":
        return "DIREVISI";
      default:
        return "Status tidak dikenali";
    }
  }
  const statusColorMap: Record<string, ChipProps["color"]> = {
    WAITING_APPROVAL: "warning",
    REPAIR: "warning",
    NEW: "primary",
    REJECTED: "danger",
    APPROVED: "success",
  };
  const renderCell = React.useCallback((row: any, columnKey: any) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "jml_suara_sah":
        return (
          <div className="text-success font-bold ">
            {formatRibuan(row.jml_suara_sah)}
          </div>
        );

      case "jml_suara_rusak":
        return (
          <div>
            <p className="text-danger font-bold ">
              {formatRibuan(row.jml_suara_rusak)}
            </p>
          </div>
        );
      case "kecamatan":
        return (
          <div>
            <p>{row.kecamatan?.nama_kacamatan}</p>
          </div>
        );
      case "jml_suara_masuk":
        return (
          <div>
            <p className="text-primary font-bold ">
              {formatRibuan(
                parseInt(row.jml_suara_sah) + parseInt(row.jml_suara_rusak)
              )}
            </p>
          </div>
        );
      case "dpt":
        return (
          <div>
            <Chip color="primary"> {row.tps?.jml_dpt}</Chip>
          </div>
        );
      case "tps":
        return (
          <div>
            <p>
              Ds.{row?.desa?.nama_desa} | {padNumber(row.tps?.nama_tps)}
            </p>
          </div>
        );
      case "status":
        return (
          <div>
            <Chip
              className="capitalize"
              color={statusColorMap[row.status]}
              size="sm"
              variant="flat"
            >
              {getStatusText(row.status)}
            </Chip>
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
            <Button
              as={Link}
              href={`/admin/suara/detail/${row?.id}`}
              size="sm"
              isIconOnly
              color="primary"
              startContent={<Eye size={15} />}
            />
          </div>
        );
      default:
        return <span>{cellValue}</span>;
    }
  }, []);

  return (
    <div>
      <div className="mb-5">
        <div className="text-2xl font-bold">Suara</div>
        <div className="tracking-tighter">Managemen Data Suara</div>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div>
          {result && (
            <DataTable
              searchingKey="Nama,Email"
              loading={loadingData}
              triggerSearch={(e) => setUrl(`${SUARA.GET}?page=1&search=${e}`)}
              triggerChangePage={(e) => setUrl(`${SUARA.GET}?page=${e}`)}
              data={result}
              page={page}
              totalPage={totalPage}
              totalRows={totalRows}
              columns={columns}
              renderCell={renderCell}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SuaraPage;
