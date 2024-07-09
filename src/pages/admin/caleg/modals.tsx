import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  SelectItem,
  Select,
} from "@nextui-org/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FormSchema } from "@/schema/Admin/CalegSchema";
import axiosInstance from "@/lib/axios";
import { mapValues } from "lodash";
import { InfoIcon } from "lucide-react";

import { CALEG, SAKSI, TPS } from "@/configs/admin-endpoints";
;
import { z } from "zod";
import { useCalegStore } from "@/stores/calegStore";

type FormSchemaType = z.infer<typeof FormSchema>;
export default function Modals({ onMutate, kecamatanData }) {
  const kecamatanitems = kecamatanData?.map((item) => ({
    value: item?.id,
    label: `${item?.id} - ${item.kecamatan.nama_kacamatan} | ${item?.desa?.nama_desa} - TPS ${item?.nama_tps}`,
  }));
  const {
    modals,
    handleModalsTrigger,
    setProcessing,
    processing,
    rowSelected,
  } = useCalegStore();

  const {
    trigger,
    getValues,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: useCalegStore.getState().defaultFormValues,
    shouldUnregister: false,
  });

  useEffect(() => {
    reset();
    mapValues(rowSelected, (value, key: any) => {
      setValue(key, value);
    });
  }, [rowSelected]);

  const onSubmit = async (data) => {
    setProcessing(true);

    try {
      let response: any;
      if (rowSelected) {
        response = await axiosInstance.put(
          `${CALEG.UPDATE}${rowSelected.id}`,
          data
        );
      } else {
        response = await axiosInstance.post(`${CALEG.CREATE}`, data);
      }
      if (response?.data.success) {
        toast.success("success");
        handleModalsTrigger("form");
        reset();
        onMutate();
      } else {
        toast.error(response.data.message ?? "fail");
      }
    } catch (e) {
      toast.error("error");
      console.log(e);
    } finally {
      setProcessing(false);
    }
  };

  const RenderForm = () => (
    <div className="grid grid-cols-1 gap-2 gap-y-2">
      <div>
        {/* <Select
          label="Kecamatan"
          placeholder="Pilih Kecamatan"
          //   defaultSelectedKeys={
          //     new Set([`${getValues("role") || rowSelected?.role}`])
          //   }
          //   {...register("role")}
          //   onSelectionChange={(target: any) =>
          //     setValue("role", target.anchorKey)
          //   }
          //   isInvalid={!!errors?.role}
          //   errorMessage={errors?.role?.message}
        >
          {tpsitems?.map((tps) => (
            <SelectItem key={tps.value}>{tps.label}</SelectItem>
          ))}
        </Select> */}
      </div>
      <div>
        {/* <Select
          label="TPS"
          placeholder="Pilih TPS"
          defaultSelectedKeys={
            new Set([`${getValues("id_tps") || rowSelected?.id_tps}`])
          }
          {...register("id_tps")}
          onSelectionChange={(target: any) =>
            setValue("id_tps", target.anchorKey)
          }
          isInvalid={!!errors?.id_tps}
          errorMessage={errors?.id_tps?.message}
        >
          {tpsitems?.map((tps) => (
            <SelectItem key={tps.value}>{tps.label}</SelectItem>
          ))}
        </Select> */}
      </div>
      <Input
        type="text"
        label="Nama Caleg"
        placeholder="Masukan Data"
        defaultValue={getValues("nama_caleg") || rowSelected?.nama_caleg}
        {...register("nama_caleg")}
        isInvalid={!!errors?.nama_caleg}
        errorMessage={errors?.nama_caleg?.message}
      />

      <Input
        type="number"
        label="Nomor Urut"
        placeholder="Masukan Data"
        // defaultValue={getValues("nomor_urut") || rowSelected?.nomor_urut}
        // {...register("nomor_urut")}
        // isInvalid={!!errors?.nomor_urut}
        // errorMessage={errors?.nomor_urut?.message}
      />
    </div>
  );
  return (
    <>
      <Modal
        hideCloseButton
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={modals.form}
        onOpenChange={() => handleModalsTrigger("form")}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="leading-5">
                  <div className="font-semibold">
                    {rowSelected ? "Ubah Caleg" : "Tambah Caleg"}
                  </div>
                  <small className=" tracking-tighter text-gray-600">
                    Silahkan isi data dengan benar
                  </small>
                </div>
              </ModalHeader>
              <form>
                <ModalBody>
                  <RenderForm />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onClick={() => {
                      reset();
                      handleModalsTrigger("form", null);
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    type="button"
                    isLoading={processing}
                    isDisabled={processing}
                    color="primary"
                    onClick={async () => {
                      const output = await trigger();
                      if (output) {
                        onSubmit(getValues());
                      }
                    }}
                  >
                    Simpan
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
