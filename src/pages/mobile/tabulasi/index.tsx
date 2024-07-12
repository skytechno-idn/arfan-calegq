import PartaiCard from "@/components/PartaiCard";
import {
  GET_MYTPS,
  GET_PARTAI,
  GET_SUARA,
  SEND_TO_ADMIN,
  SET_SUARA_RUSAK,
  UPLOAD_c1,
} from "@/configs/saksi-endpoints";
import MobileLayout from "@/layouts/MobileLayout";
import axiosInstance from "@/lib/axios";
import { formatRibuan, padNumber } from "@/lib/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Image,
  ModalFooter,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Input,
  Chip,
  Textarea,
  Divider,
} from "@nextui-org/react";
import {
  Dialog,
  DialogButton,
  ListInput,
  Navbar,
  NavbarBackLink,
} from "konsta/react";
import { PencilLine, RefreshCw } from "lucide-react";
import { useRouter } from "next/router";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";
import { z } from "zod";

const fileC1Schema = z.object({
  files: z
    .array(
      z.object({
        file: z
          .instanceof(File)
          .refine((file) => file.size <= 2000000, {
            message: "File must be at most 2MB",
          })
          .refine(
            (file) =>
              ["image/jpeg", "image/png", "application/pdf"].includes(
                file.type
              ),
            {
              message: "Only JPG, PNG, and PDF files are allowed",
            }
          ),
      })
    )
    .nonempty("At least one file is required"),
});

type FileSchema = z.infer<typeof fileC1Schema>;
const TabulasiPage = () => {
  const {
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm();

  const [basicOpened, setBasicOpened] = useState(false);
  const [note, setNote] = useState("");
  const [processingC1, setProcessingC1] = useState(false);
  const [processingUpdateSuaraRusak, setProcessingUpdateSuaraRusak] =
    useState(false);
  const [suaraRusak, setSuaraRusak] = useState<any>(0);
  const {
    isOpen: isOpenSuaraTsah,
    onOpen: onOpenSuaraTsah,
    onOpenChange: onOpenChangeSuaraTsah,
  } = useDisclosure();
  const {
    isOpen: isOpenKonfirmasi,
    onOpen: onOpenKonfirmasi,
    onOpenChange: onOpenChangeKonfirmasi,
  } = useDisclosure();
  const router = useRouter();
  const {
    data: responseDataTPS,

    isLoading: loadingData,
  } = useSWR(`${GET_MYTPS}`, {
    keepPreviousData: true,
  });
  const {
    data: responseDataSUARA,
    mutate: mutateSUARA,
    isLoading: loadingDataSUARA,
  } = useSWR(`${GET_SUARA}`);
  const {
    data: responseDataPARTAI,
    mutate: mutatePARTAI,
    isLoading: loadingDataPARTAI,
  } = useSWR(`${GET_PARTAI}`, {
    keepPreviousData: true,
  });
  const { result: resultTPS } = responseDataTPS || {};
  const { result: resultSUARA } = responseDataSUARA || {};

  const { result: dataPARTAI } = responseDataPARTAI || [];
  const resultPARTAI = dataPARTAI?.sort((a, b) => a.nomor_urut - b.nomor_urut);

  const updateSuaraRusak = async () => {
    setProcessingUpdateSuaraRusak(true);
    try {
      const response: any = await axiosInstance.patch(SET_SUARA_RUSAK, {
        jml_suara_rusak: suaraRusak,
      });

      if (response?.data.success) {
        toast.success("Berhasil melakukan update Suara Rusak");
        mutateSUARA(false);
      } else {
        toast.error(response.data.message ?? "ERROR");
      }
    } catch (e) {
      toast.error("error");
    } finally {
      setProcessingUpdateSuaraRusak(false);
      onOpenChangeSuaraTsah();
    }
  };

  const onSubmitFileC1 = async (data: any) => {
    setProcessingC1(true);

    const formData = new FormData();
    Array.from(multipleFiles).forEach((file, index) => {
      formData.append(`files`, file);
    });

    try {
      const response = await axiosInstance.post(`${UPLOAD_c1}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.data.success) {
        const responseSendToAdmin = await axiosInstance.patch(
          `${SEND_TO_ADMIN}`,
          {
            note_saksi: note,
          }
        );
        if (responseSendToAdmin?.data.success) {
          toast.success("Data Suara dan C1 Berhasil dikirim");
          mutateSUARA(false);
        } else {
          toast.error(
            responseSendToAdmin.data.message ??
              "Gagal melakukan pengiriman data"
          );
        }
      } else {
        toast.error(response.data.message ?? "fail");
      }
    } catch (e) {
      toast.error("Gagal Melakukan Konfirmasi");
    } finally {
      setProcessingC1(false);
      onOpenChangeKonfirmasi();
    }
  };

  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  const changeMultipleFiles = (e) => {
    const fileList: FileList | null = e.target.files;
    if (fileList) {
      const filesArray: File[] = Array.from(fileList);
      setMultipleFiles(filesArray);
    }
  };

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

  const ChipStatusRender = ({ status }) => {
    if (status === "WAITING_APPROVAL") {
      return (
        <Chip color="warning" className="text-white ">
          <span className="font-semibold tracking-tighter">
            {getStatusText(status)}
          </span>
        </Chip>
      );
    } else if (status === "REPAIR") {
      return (
        <Chip color="warning" className="text-white ">
          <span className="font-semibold tracking-tighter">
            {getStatusText(status)}
          </span>
        </Chip>
      );
    } else if (status === "REJECTED") {
      return (
        <Chip color="danger" className="text-white ">
          <span className="font-semibold tracking-tighter">
            {getStatusText(status)}
          </span>
        </Chip>
      );
    } else if (status === "APPROVED") {
      return (
        <Chip color="success" className="text-white ">
          <span className="font-semibold tracking-tighter">
            {getStatusText(status)}
          </span>
        </Chip>
      );
    }
  };

  return (
    <div>
      <Navbar
        right={
          <>
            <Button
              onClick={() => router.reload()}
              color="primary"
              size="sm"
              isIconOnly
            >
              <RefreshCw className="w-5 h-5" />
            </Button>
          </>
        }
        subtitle="Silahkan masukan data dengan teliti"
        title="Form Tabulasi"
      />
      <div className="mt-5 px-3">
        {resultSUARA?.status === "REJECT" ||
          (resultSUARA?.status === "REPAIR" && resultSUARA?.note && (
            <div className="bg-danger/70 rounded-lg p-2 text-white mb-5">
              <div className="font-semibold tracking-tighter">
                Pesan Dari Admin
              </div>
              <hr className="my-1" />
              <p className="text-sm">{resultSUARA?.note}</p>
            </div>
          ))}

        <div className="bg-white  shadow-lg flex items-start gap-3 py-2 px-3 rounded-lg relative">
          <div className="absolute -right-1 -top-2">
            <ChipStatusRender status={resultSUARA?.status} />
          </div>
          <div>
            <div className="font-bold text-lg">
              TPS {padNumber(parseInt(resultTPS?.nama_tps))}
            </div>
            <div className="text-gray-400 font-semibold text-sm">
              Ds.{resultTPS?.desa?.nama_desa},
              {resultTPS?.kecamatan?.nama_kacamatan}
            </div>
            <div className=" text-sm">
              Total DPT :{" "}
              <span className="font-semibold">
                {formatRibuan(resultTPS?.jml_dpt ?? 0)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="grid grid-cols-3  gap-2">
            <div className="bg-success/70 text-white p-3 rounded-lg">
              <span className="tracking-tighter text-sm font-semibold">
                Suara Sah
              </span>
              <div className="font-bold">
                {!loadingDataSUARA &&
                  formatRibuan(parseInt(resultSUARA?.jml_suara_sah) ?? 0)}
              </div>
            </div>
            <div className="bg-danger/70 text-white p-3 rounded-lg relative">
              <span className="tracking-tighter text-sm font-semibold">
                Suara Rusak
              </span>
              <div className="font-bold">
                {!loadingDataSUARA &&
                  formatRibuan(parseInt(resultSUARA?.jml_suara_rusak) ?? 0)}
              </div>
              <div className="absolute bottom-0 right-0">
                <Button
                  onClick={onOpenChangeSuaraTsah}
                  className="rounded-tr-none rounded-bl-none"
                  isIconOnly
                  size="sm"
                >
                  <PencilLine className="w-5 h-5 text-danger" />
                </Button>
              </div>
            </div>
            <div className="bg-primary/70 text-white p-3 rounded-lg">
              <span className="tracking-tighter text-sm font-semibold">
                Suara Masuk
              </span>
              <div className="font-bold">
                {!loadingDataSUARA &&
                  !loadingDataSUARA &&
                  formatRibuan(
                    parseInt(resultSUARA?.jml_suara_sah) +
                      parseInt(resultSUARA?.jml_suara_rusak)
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 ">
          <div className="grid grid-cols-2  gap-2">
            {resultPARTAI?.map((item: any) => (
              <PartaiCard
                key={item?.id}
                status={item?.already}
                onClick={() => router.push("/mobile/tabulasi/" + item?.id)}
                src={`/images/partai/${item?.logo_partai}`}
                number={item?.nomor_urut ?? item?.id}
                name={item?.label_partai}
                color={item?.color}
              />
            ))}
          </div>
          {resultSUARA?.status !== "APPROVED" && (
            <div className="mt-5">
              <Button
                isDisabled={
                  ["NEW", "REPAIR", "REJECTED"].includes(resultSUARA?.status) ? false : true
                }
                onClick={onOpenChangeKonfirmasi}
                color="primary"
                className="w-full"
              >
                KONFIRMASI
              </Button>
            </div>
          )}
        </div>
      </div>
      <form>
        <Modal
          placement="top-center"
          isDismissable={false}
          hideCloseButton
          isOpen={isOpenKonfirmasi}
          onOpenChange={onOpenChangeKonfirmasi}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Upload Dokumen / File C1
                </ModalHeader>
                <Divider/>
                <ModalBody>
                  <div>
                    <div>
                      <label htmlFor="c1">
                        File C1 <span className="text-danger">*</span>
                      </label>

                      <input
                        accept="image/*"
                        multiple
                        onChange={changeMultipleFiles}
                        id="c1"
                        type="file"
                        className="bg-gray-100 rounded-lg p-2 w-full"
                      />
                      <div className="italic text-xs mt-1">
                       <span className="text-danger">*</span> Minimal ukuran file adalah 2MB
                      </div>
                      <div className="italic text-xs mt-1">
                       <span className="text-danger">*</span> File C1 harus upload gambar tidak bisa menggunakan kamera langsung
                      </div>
                    </div>
                    <div className="mt-3">
                      <Textarea
                        onChange={(e) => setNote(e?.target?.value)}
                        labelPlacement="outside"
                        label="Catatan / Notice"
                        description="Jika ada suara tambahan atau ada masalah terkait suara tuliskan disini"
                      />
                    </div>
                  </div>
                </ModalBody>
                <Divider/>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Keluar
                  </Button>
                  <Button
                    type="button"
                    isLoading={processingC1}
                    isDisabled={processingC1 || !multipleFiles?.length}
                    color="primary"
                    onClick={async () => {
                      const output = await trigger();
                      if (output) {
                        onSubmitFileC1(getValues());
                      }
                    }}
                  >
                    Lanjutkan Dan Kirim
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </form>
      <Modal
        placement="top-center"
        isDismissable={false}
        hideCloseButton
        isOpen={isOpenSuaraTsah}
        onOpenChange={onOpenChangeSuaraTsah}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Suara Rusak
              </ModalHeader>
              <Divider/>
              <ModalBody>
                <div>
                  <div>
                    <Input
                      value={suaraRusak}
                      onValueChange={setSuaraRusak}
                      label="Jumlah Suara Rusak"
                      placeholder="Masukan Jumlah Suara rusak"
                      type="number"
                    />
                  </div>
                </div>
              </ModalBody>
              <Divider/>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Keluar
                </Button>
                <Button
                  isDisabled={isNaN(suaraRusak) || processingUpdateSuaraRusak}
                  color="primary"
                  onPress={updateSuaraRusak}
                >
                  Simpan Perubahan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Dialog
        opened={basicOpened}
        onBackdropClick={() => setBasicOpened(false)}
        title="Pesan Konfirmasi"
        content={
          <>
            Apakah Anda yakin untuk mengonfirmasi suara di TPS ini? Selanjutnya,
            hasil suara akan dikirimkan ke admin untuk divalidasi ulang.
          </>
        }
        buttons={
          <>
            <DialogButton onClick={() => setBasicOpened(false)}>
              Batal
            </DialogButton>
            <DialogButton onClick={() => setBasicOpened(false)}>
              Ya, Submit
            </DialogButton>
          </>
        }
      />
    </div>
  );
};
TabulasiPage.getLayout = (page) => <MobileLayout>{page}</MobileLayout>;

export default TabulasiPage;
