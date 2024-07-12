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
import { FormSchema } from "@/schema/Admin/TpsSchema";
import axiosInstance from "@/lib/axios";
import { mapValues } from "lodash";
import { InfoIcon } from "lucide-react";

import { SAKSI, TPS } from "@/configs/admin-endpoints";
import { useTpsStore } from "@/stores/tpsStore";
import { z } from "zod";
import DesaSelect from "@/components/selects/DesaSelect";

type FormSchemaType = z.infer<typeof FormSchema>;
export default function Modals({ onMutate }) {
 
  const {
    modals,
    handleModalsTrigger,
    setProcessing,
    processing,
    rowSelected,
  } = useTpsStore();

  const {
    trigger,
    getValues,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: useTpsStore.getState().defaultFormValues,
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
          `${TPS.UPDATE}${rowSelected.id}`,
          data
        );
      } else {
        response = await axiosInstance.post(`${TPS.CREATE}`, data);
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
        <DesaSelect
          error={errors?.id_desa}
          {...register("id_desa")}
          defaultSelected={getValues("id_desa") || rowSelected?.id_desa}
          label="Desa"
          placeholder="Pilih Desa"
          onChange={(e: any) => {
            setValue("id_desa", e.id);
          }}
        />
      </div>

      <Input
        type="text"
        label="Nama TPS"
        placeholder="Masukan Data"
        defaultValue={getValues("nama_tps") || rowSelected?.nama_tps}
        {...register("nama_tps")}
        isInvalid={!!errors?.nama_tps}
        errorMessage={errors?.nama_tps?.message}
      />

      <Input
        type="number"
        label="Jumlah DPT"
        placeholder="Masukan Data"
        defaultValue={getValues("jml_dpt") || rowSelected?.jml_dpt}
        {...register("jml_dpt")}
        isInvalid={!!errors?.jml_dpt}
        errorMessage={errors?.jml_dpt?.message}
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
                    {rowSelected ? "Ubah TPS" : "Tambah TPS"}
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
