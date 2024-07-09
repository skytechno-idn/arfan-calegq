import { BASE_API_URL } from "@/configs/admin-endpoints";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import React from "react";
import useSWR from "swr";

const SecurityPage = () => {
  const {
    data: responseData,
    mutate: mutate,
    isLoading: loadingData,
  } = useSWR(`${BASE_API_URL}/users/admin/my-profile`, {
    keepPreviousData: true,
  });
  const { result } = responseData || {};
  return (
    <div className=" w-full mx-auto">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <Card>
            <CardHeader>Data Profile</CardHeader>
            <Divider />
            <CardBody>
              <div className="grid grid-cols-1 gap-3">
                <Input
                  type="text"
                  label="Nama"
                  placeholder="Masukan Data"
                  defaultValue={result?.nama_admin}
                  //   defaultValue={getValues("color") || rowSelected?.color}
                  //   {...register("color")}
                  //   isInvalid={!!errors?.color}
                  //   errorMessage={errors?.color?.message}
                />
                <Input
                  type="text"
                  label="Email"
                  placeholder="Masukan Data"
                  defaultValue={result?.email_admin}
                  //   defaultValue={getValues("color") || rowSelected?.color}
                  //   {...register("color")}
                  //   isInvalid={!!errors?.color}
                  //   errorMessage={errors?.color?.message}
                />
                <Input
                  type="text"
                  label="Telepon"
                  placeholder="Masukan Data"
                  defaultValue={result?.telp_admin}
                  //   {...register("color")}
                  //   isInvalid={!!errors?.color}
                  //   errorMessage={errors?.color?.message}
                />
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
                <div className="flex justify-end">
                <Button>Simpan Perubahan</Button>
                </div>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>Data Keamanan</CardHeader>
            <Divider />
            <CardBody>
            <div className="grid grid-cols-1 gap-3">
                <Input
                  type="password"
                  label="Password Lama"
                  placeholder="Masukan Data"
                  defaultValue={result?.nama_admin}
                  //   defaultValue={getValues("color") || rowSelected?.color}
                  //   {...register("color")}
                  //   isInvalid={!!errors?.color}
                  //   errorMessage={errors?.color?.message}
                />
                <Input
                  type="password"
                  label="Email"
                  placeholder="Password Baru"
                  defaultValue={result?.email_admin}
                  //   defaultValue={getValues("color") || rowSelected?.color}
                  //   {...register("color")}
                  //   isInvalid={!!errors?.color}
                  //   errorMessage={errors?.color?.message}
                />
                <Input
                  type="password"
                  label="Telepon"
                  placeholder="Konfirmasi Password"
                  defaultValue={result?.telp_admin}
                  //   {...register("color")}
                  //   isInvalid={!!errors?.color}
                  //   errorMessage={errors?.color?.message}
                />
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
                <div className="flex justify-end">
                <Button>Simpan Perubahan</Button>
                </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
