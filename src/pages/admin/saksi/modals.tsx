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
import { FormSchema, TypeSaksiSchema } from "@/schema/Admin/SaksiSchema";
import axiosInstance from "@/lib/axios";
import { mapValues } from "lodash";
import { InfoIcon } from "lucide-react";

import { SAKSI } from "@/configs/admin-endpoints";
import { useSaksiStore } from "@/stores/saksiStore";

type FormSchemaType = TypeSaksiSchema;
export default function Modals({ onMutate, tpsData, kecamatanData }) {

  const tpsitems = tpsData?.map((item) => ({
    value: item?.id,
    label: `${item?.id} - ${item.kecamatan.nama_kacamatan} | ${item?.desa?.nama_desa} - TPS ${item?.nama_tps}`,
  }));
  const kecamatanitems = tpsData?.map((item) => ({
    value: item?.id,
    label: `${item?.id} - ${item.kecamatan.nama_kacamatan} | ${item?.desa?.nama_desa} - TPS ${item?.nama_tps}`,
  }));
  const {
    modals,
    handleModalsTrigger,
    setProcessing,
    processing,
    rowSelected,
  } = useSaksiStore();

  const {
    trigger,
    getValues,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema(!!rowSelected)),
    defaultValues: useSaksiStore.getState().defaultFormValues,
    shouldUnregister: false,
  });

  useEffect(() => {
    reset();
    mapValues(rowSelected, (value, key: any) => {
      if (key !== "password") {
        setValue(key, value);
      }
    });
  }, [rowSelected]);

  const onSubmit = async (data) => {
    setProcessing(true);

    try {
      let response: any;
      if (rowSelected) {
        response = await axiosInstance.put(
          `${SAKSI}/update/${rowSelected.id}`,
          data
        );
      } else {
        response = await axiosInstance.post(`${SAKSI}/create`, data);
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
        <Select
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
        </Select>
      </div>
      <div>
        <Select
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
        </Select>
      </div>
      <Input
        type="text"
        label="Nama Lengkap Saksi"
        placeholder="Masukan Data"
        defaultValue={getValues("nama_saksi") || rowSelected?.nama_saksi}
        {...register("nama_saksi")}
        isInvalid={!!errors?.nama_saksi}
        errorMessage={errors?.nama_saksi?.message}
      />

      <Input
        type="text"
        label="Nomor Telepon"
        placeholder="Masukan Data"
        defaultValue={getValues("telp_saksi") || rowSelected?.telp_saksi}
        {...register("telp_saksi")}
        isInvalid={!!errors?.telp_saksi}
        errorMessage={errors?.telp_saksi?.message}
      />

      <Input
        type="text"
        label="Email"
        defaultValue={getValues("email_saksi") || rowSelected?.email_saksi}
        placeholder="Masukan email"
        {...register("email_saksi")}
        isInvalid={!!errors?.email_saksi}
        errorMessage={errors?.email_saksi?.message}
      />

      <Input
        description={
          rowSelected && (
            <div className="bg-warning-100 flex items-center gap-1 p-1 font-semibold rounded-xl tracking-tighter text-warning-900">
              <InfoIcon className="text-waring w-5" />
              Abaikan jika anda tidak ingin menganti password
            </div>
          )
        }
        {...register("password")}
        type="password"
        label="Password"
        placeholder="Masukan Password"
        isInvalid={!!errors["password"]}
        errorMessage={errors["password"]?.message}
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
                    {rowSelected ? "Ubah Saksi" : "Tambah Saksi"}
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
