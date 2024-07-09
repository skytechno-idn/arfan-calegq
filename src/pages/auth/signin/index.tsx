import {
  Button,
  Input,
  Link,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Divider,
  SelectItem,
  Select,
} from "@nextui-org/react";
import { EyeOff, Eye } from "lucide-react";
import { signIn } from "next-auth/react";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import GuestLayout from "@/layouts/GuestLayout";
import { AUTH as AUTHSAKSI } from "@/configs/saksi-endpoints";
import { AUTH as AUTHADMIN } from "@/configs/admin-endpoints";
const SignUpSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
  type: z.enum(["saksi", "admin", "relawan"]),
});

const ForgetSchema = z.object({
  email: z.string().trim().email(),
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;
type ForgetSchemaType = z.infer<typeof ForgetSchema>;
const SignInPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [processing, setProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [force, setForce] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "TEST@demo.com",
      password: "password",
      type: "saksi",
    },
  });

  const {
    register: registerForget,
    handleSubmit: handleSubmitForget,
    formState: { errors: errorsForget },
  } = useForm<ForgetSchemaType>({ resolver: zodResolver(ForgetSchema) });

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    setProcessing(true);
    setForce(true);

    try {
      const res: any = await signIn("credentials", {
        redirect: false,
        url: data?.type === "admin" ? AUTHADMIN.LOGIN : AUTHSAKSI.LOGIN,
        ...data,
      });

      if (res.error) {
        if (res.error.trim() !== "") {
          const resError = JSON.parse(res.error);
          toast.error(resError?.message);
        } else {
          toast.error("error");
        }

        return;
      }

      window.location.href = data?.type === "admin" ? "/admin" : "/mobile";
    } catch (e) {
      toast.error("Gagal melakukan login, harap periksa data login anda");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="relative  mt-20">
      <div className=" pt-5 md:pt-16">
        <Card isBlurred>
          <CardBody>
            <div>
              <h1 className="text-xl font-bold"> Halaman Login</h1>
              <div className="text-gray-400 mb-4 md:text-base text-sm">
                CalegQ
                <Link
                  className="font-semibold md:text-base text-sm ml-1"
                  href="/auth/signup"
                >
                  Admin Panel
                </Link>
              </div>
              <Divider />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-3 pt-5">
                  <div>
                    <Input
                      autoComplete="email"
                      labelPlacement={"outside"}
                      type="email"
                      label="Email"
                      {...register("email")}
                      isInvalid={errors?.email ? true : false}
                      errorMessage={errors?.email?.message}
                    />
                  </div>

                  <div>
                    <Input
                      labelPlacement={"outside"}
                      type={isVisible ? "text" : "password"}
                      label="Password"
                      {...register("password")}
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <EyeOff className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Eye className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      }
                      autoComplete="current-password"
                      isInvalid={errors?.password ? true : false}
                      errorMessage={errors?.password?.message}
                    />
                  </div>
                  <div>
                    <Select
                      labelPlacement={"outside"}
                      label="Tipe Akun Login"
                      placeholder="Pilih tipe akun"
                      {...register("type")}
                      isInvalid={errors?.type ? true : false}
                      errorMessage={errors?.type?.message}
                    >
                      {[
                        {
                          label: "Admin",
                          key: "admin",
                        },
                        {
                          label: "Relawan",
                          key: "relawan",
                        },
                        {
                          label: "Saksi",
                          key: "saksi",
                        },
                      ].map((animal) => (
                        <SelectItem key={animal.key}>{animal.label}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  {/* <div className="flex justify-end">
                      <Button
                        color="primary"
                        size="sm"
                        variant="flat"
                        onClick={onOpen}
                        className=" text-sm "
                      >
                        Forget Password
                      </Button>
                    </div> */}
                </div>
                <div className="flex  justify-between items-center mt-5">
                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={processing}
                    isDisabled={processing}
                    color="primary"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

SignInPage.getLayout = (page) => <GuestLayout>{page}</GuestLayout>;
export default SignInPage;
