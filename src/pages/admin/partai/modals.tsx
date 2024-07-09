import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FormSchema } from "@/schema/Admin/PartaiSchema";
import axiosInstance from "@/lib/axios";
import { mapValues } from "lodash";

import { PARTAI } from "@/configs/admin-endpoints";
import { z } from "zod";

import { usePartaiStore } from "@/stores/partaiStore";

type FormSchemaType = z.infer<typeof FormSchema>;
export default function Modals({ onMutate }) {
  const {
    modals,
    handleModalsTrigger,
    setProcessing,
    processing,
    rowSelected,
  } = usePartaiStore();

  const {
    trigger,
    getValues,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: usePartaiStore.getState().defaultFormValues,
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
          `${PARTAI.UPDATE}${rowSelected.id}`,
          data
        );
      } else {
        response = await axiosInstance.post(`${PARTAI.CREATE}`, data);
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
      <Input
        type="text"
        label="Nama Partai"
        placeholder="Masukan Data"
        defaultValue={getValues("nama_partai") || rowSelected?.nama_partai}
        {...register("nama_partai")}
        isInvalid={!!errors?.nama_partai}
        errorMessage={errors?.nama_partai?.message}
      />

      <Input
        type="text"
        label="Label Partai"
        placeholder="Masukan Data"
        defaultValue={getValues("label_partai") || rowSelected?.label_partai}
        {...register("label_partai")}
        isInvalid={!!errors?.label_partai}
        errorMessage={errors?.label_partai?.message}
      />

      <Input
        type="text"
        label="Warna Partai"
        placeholder="Masukan Data"
        defaultValue={getValues("color") || rowSelected?.color}
        {...register("color")}
        isInvalid={!!errors?.color}
        errorMessage={errors?.color?.message}
      />

      <Input
        type="number"
        label="Nomor Urut"
        placeholder="Masukan Data"
        defaultValue={getValues("nomor_urut") || rowSelected?.nomor_urut}
        {...register("nomor_urut")}
        isInvalid={!!errors?.nomor_urut}
        errorMessage={errors?.nomor_urut?.message}
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
                    {rowSelected ? "Ubah Partai" : "Tambah Partai"}
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
