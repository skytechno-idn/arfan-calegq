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
import { FormSchema, TypeAdminSchema } from "@/schema/Admin/AdminSchema";
import axiosInstance from "@/lib/axios";
import { mapValues } from "lodash";
import { InfoIcon } from "lucide-react";

import { ADMIN } from "@/configs/admin-endpoints";

import { useAdminStore } from "@/stores/adminStore";

type FormSchemaType = TypeAdminSchema;
export default function Modals({ onMutate}) {

 
  const {
    modals,
    handleModalsTrigger,
    setProcessing,
    processing,
    rowSelected,
  } = useAdminStore();

  const {
    trigger,
    getValues,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema(!!rowSelected)),
    defaultValues: useAdminStore.getState().defaultFormValues,
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
          `${ADMIN}/${rowSelected.id}`,
          data
        );
      } else {
        response = await axiosInstance.post(`${ADMIN}`, data);
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
        label="Nama Lengkap Admin"
        placeholder="Masukan Data"
        defaultValue={getValues("nama_admin") || rowSelected?.nama_admin}
        {...register("nama_admin")}
        isInvalid={!!errors?.nama_admin}
        errorMessage={errors?.nama_admin?.message}
      />

      <Input
        type="text"
        label="Nomor Telepon"
        placeholder="Masukan Data"
        defaultValue={getValues("telp_admin") || rowSelected?.telp_admin}
        {...register("telp_admin")}
        isInvalid={!!errors?.telp_admin}
        errorMessage={errors?.telp_admin?.message}
      />

      <Input
        type="text"
        label="Email"
        defaultValue={getValues("email_admin") || rowSelected?.email_admin}
        placeholder="Masukan email"
        {...register("email_admin")}
        isInvalid={!!errors?.email_admin}
        errorMessage={errors?.email_admin?.message}
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
                    {rowSelected ? "Ubah Admin" : "Tambah Admin"}
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
