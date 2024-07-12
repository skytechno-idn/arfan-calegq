import { AUTH, GET_MYTPS } from "@/configs/saksi-endpoints";
import MobileLayout from "@/layouts/MobileLayout";
import axiosInstance from "@/lib/axios";
import { formatRibuan, padNumber } from "@/lib/helper";
import { FormSchema } from "@/schema/Mobile/ProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Link,
  User,
} from "@nextui-org/react";
import { BlockTitle, Navbar, Page } from "konsta/react";
import { mapValues } from "lodash";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";
import { z } from "zod";
type FormSchemaType = z.infer<typeof FormSchema>;
const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [rowSelected, setRowSelected] = useState<any>();
  const [processing, setProcessing] = useState<any>(false);

  const {
    data: responseData,
    mutate,
    isLoading: loadingData,
  } = useSWR(`${AUTH.PROFILE}`, {
    keepPreviousData: true,
  });
  const {
    data: responseDataTPS,

    isLoading: loadingDataTPS,
  } = useSWR(`${GET_MYTPS}`, {
    keepPreviousData: true,
  });

  const { result: resultTPS } = responseDataTPS || {};
  const { result } = responseData || {};

  const {
    trigger,
    getValues,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),

    shouldUnregister: false,
  });

  useEffect(() => {
    console.log(result);
    if (result?.id) {
      setValue("email_saksi", result.email_saksi);
      setValue("nama_saksi", result.nama_saksi);
      setValue("telp_saksi", result.telp_saksi);
      setRowSelected(result);
    }
  }, [result]);

  const FormRender = () => (
    <div className="grid grid-cols-1 gap-3">
      <div>
        <Input
          defaultValue={getValues("nama_saksi") || rowSelected?.nama_saksi}
          {...register("nama_saksi")}
          isInvalid={!!errors?.nama_saksi}
          errorMessage={errors?.nama_saksi?.message}
          label="Nama Lengkap"
          placeholder="Masukan Data "
        />
      </div>
      <div>
        <Input
          type="number"
          defaultValue={getValues("telp_saksi") || rowSelected?.telp_saksi}
          {...register("telp_saksi")}
          isInvalid={!!errors?.telp_saksi}
          errorMessage={errors?.telp_saksi?.message}
          label="Nomor Telepon"
          placeholder="Masukan Data "
        />
      </div>
      <div>
        <Input
          type="email"
          defaultValue={getValues("email_saksi") || rowSelected?.email_saksi}
          {...register("email_saksi")}
          isInvalid={!!errors?.email_saksi}
          errorMessage={errors?.email_saksi?.message}
          label="Email"
          placeholder="Masukan Data "
        />
      </div>
    </div>
  );

  const onSubmit = async (data) => {
    setProcessing(true);

    try {
      const response = await axiosInstance.post(`${AUTH.CHANGE_PROFILE}`, data);
      if (response?.data.success) {
        toast.success("Berhasil Update Profile");

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
      <Navbar title="Profile Saya" />
      <div className="mt-5 mb-2 px-3">
        <div className="font-semibold">Data TPS Saksi</div>
      </div>

      <div className="px-3 ">
        <Card>
          <CardHeader>
            <div>Data TPS Saya</div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div>
              TPS :{" "}
              <span className="font-bold">
                {" "}
                {padNumber(parseInt(resultTPS?.nama_tps))}
              </span>
            </div>
            <div>
              Desa :{" "}
              <span className="font-bold">
                {" "}
                {resultTPS?.kecamatan?.nama_kacamatan}
              </span>
            </div>
            <div>
              Kecamatan :{" "}
              <span className="font-bold">
                {" "}
                {resultTPS?.kecamatan?.nama_kacamatan}
              </span>
            </div>
            <div>
              Kabupaten:{" "}
              <span className="font-bold">
                {" "}
                {resultTPS?.kabupaten?.nama_kabupaten}
              </span>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="mt-5 mb-2 px-3">
        <div className="font-semibold">Data Saksi</div>
      </div>
      <div>
        <div className="grid grid-cols-1 mt-3 px-3 gap-3">
          <Card>
            <CardHeader>
              <div>Profile Saya</div>
            </CardHeader>
            <Divider />
            <CardBody>
              <FormRender />
            </CardBody>
          </Card>
          <Button
            color="primary"
            isLoading={processing}
            isDisabled={processing}
            onClick={async () => {
              const output = await trigger();
              if (output) {
                onSubmit(getValues());
              }
            }}
          >
            Update Profile
          </Button>
          <Button href="/mobile/profile/keamanan" as={Link} color="primary">
            Ganti Password
          </Button>
          <Button
            onClick={() => {
              signOut({ redirect: false });
             setTimeout(() => {
              window.location.href = "/auth/signin";
             }, 2000)
            }}
            variant="bordered"
            color="danger"
          >
            Keluar Akun
          </Button>
        </div>
      </div>
    </div>
  );
};
ProfilePage.getLayout = (page) => <MobileLayout>{page}</MobileLayout>;

export default ProfilePage;
