import { AUTH } from "@/configs/saksi-endpoints";
import MobileLayout from "@/layouts/MobileLayout";
import axiosInstance from "@/lib/axios";
import { FormSchema } from "@/schema/Mobile/KeamananSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { Navbar, NavbarBackLink } from "konsta/react";
import { Eye, EyeOff } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
type FormSchemaType = z.infer<typeof FormSchema>;
const KeamananPage = () => {
  const router = useRouter();

  const [processing, setProcessing] = useState<any>(false);
  const [isShow, setShow] = useState<any>(false);

  const {
    trigger,
    getValues,
    formState: { errors },
    register,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),

    shouldUnregister: false,
  });

  const FormRender = () => (
    <div className="grid grid-cols-1 gap-3">
      <div>
        <Input
          endContent={
            <div className="flex  items-center">
              {!isShow ? (
                <Eye
                  className="cursor-pointer"
                  onClick={() => setShow(!isShow)}
                />
              ) : (
                <EyeOff
                  className="cursor-pointer"
                  onClick={() => setShow(!isShow)}
                />
              )}
            </div>
          }
          type={isShow ? "text" : "password"}
          {...register("password")}
          isInvalid={!!errors?.password}
          errorMessage={errors?.password?.message}
          label="Password Baru"
          placeholder="Masukan Password "
        />
      </div>
    </div>
  );

  const onSubmit = async (data) => {
    setProcessing(true);

    try {
      const response = await axiosInstance.post(
        `${AUTH.UPDATE_PASSWORD}`,
        data
      );
      if (response?.data.success) {
        toast.success("Berhasil Update Keamanan");
        signOut({ redirect: false });
        window.location.href = "/auth/signin";
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
      <Navbar
        title="Keamanan"
        left={
          <NavbarBackLink
            showText={false}
            onClick={() => router.push("/mobile/profile")}
          />
        }
      />

      <div>
        <div className="grid grid-cols-1 mt-3 px-3 gap-3">
          <Card>
            <CardHeader>
              <div>Password Saya</div>
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
            Ganti Password
          </Button>
        </div>
      </div>
    </div>
  );
};
KeamananPage.getLayout = (page) => <MobileLayout>{page}</MobileLayout>;

export default KeamananPage;
