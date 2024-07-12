import DialogApprove from "@/components/DialogApprove";
import DialogReject from "@/components/DialogReject";
import { SUARA } from "@/configs/admin-endpoints";
import axiosInstance from "@/lib/axios";
import dayjs from "@/lib/dayjs";
import { cutText, formatRibuan, padNumber } from "@/lib/helper";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
} from "@nextui-org/react";
import { Check, Download, Eye, X, XCircle } from "lucide-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const DetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [popAproved, setPopAproved] = useState(false);
  const [popRejected, setPopRejected] = useState(false);
  const [popPreview, setPopPreview] = useState(false);
  const [previewc1, setPreviewc1] = useState("");
  const [previewProgres, setPreviewProgres] = useState(false);
  const {
    data: responseData,
    mutate,
    isLoading: loadingData,
  } = useSWR(slug && `${SUARA.DETAIL}/${slug}`, {
    keepPreviousData: true,
  });

  const { result } = responseData || {};

  const triggerApproved = async () => {
    try {
      const response = await axiosInstance.put(`${SUARA.CONFIRM}/${slug}`, {
        status: "APPROVED",
      });
      if (response?.data.success) {
        toast.success("Berhasil Melakukan Approved Suara");

        mutate(false);
      } else {
        toast.error(response.data.message ?? "fail");
      }
    } catch (e) {
      toast.error("Gagal Melakukan Approved");
    } finally {
      setPopAproved(false);
    }
  };
  const triggerRejected = async (note) => {
    try {
      const response = await axiosInstance.put(`${SUARA.CONFIRM}/${slug}`, {
        status: "REJECTED",
        note: note,
      });
      if (response?.data.success) {
        toast.success("Berhasil Melakukan Teject Suara");

        mutate(false);
      } else {
        toast.error(response.data.message ?? "fail");
      }
    } catch (e) {
      toast.error("Gagal Melakukan Reject");
    } finally {
      setPopRejected(false);
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
        <Chip size="sm" color="warning" className="text-white ">
          <span className="font-semibold tracking-tighter">
            {getStatusText(status)}
          </span>
        </Chip>
      );
    } else if (status === "REPAIR") {
      return (
        <Chip size="sm" color="warning" className="text-white ">
          <span className="font-semibold tracking-tighter">
            {getStatusText(status)}
          </span>
        </Chip>
      );
    } else if (status === "REJECTED") {
      return (
        <Chip size="sm" color="danger" className="text-white ">
          <span className="font-semibold tracking-tighter">
            {getStatusText(status)}
          </span>
        </Chip>
      );
    } else {
      if (status !== "NEW") {
        return (
          <Chip size="sm" color="success" className="text-white ">
            <span className="font-semibold tracking-tighter">
              {getStatusText(status)}
            </span>
          </Chip>
        );
      }
    }
  };

  const previewC1 = async (id) => {
    setPreviewProgres(true);
    try {
      const response = await axiosInstance.get(`${SUARA.C1_PEVIEW}/${id}`, {
        responseType: "arraybuffer",
      });
      const blob = new Blob([response.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      setPreviewc1(imageUrl);
      setPopPreview(true);
    } catch (error) {
      toast.error("Gagal Melakukan Preview");
    } finally {
      setPreviewProgres(false);
    }
  };

  return (
    <div>
      <DialogApprove
        onClose={() => setPopAproved(false)}
        isOpen={popAproved}
        onTrigger={() => triggerApproved()}
      />
      <DialogReject
        onClose={() => setPopRejected(false)}
        isOpen={popRejected}
        onTrigger={(note) => triggerRejected(note)}
      />
      <Modal size="2xl" backdrop="blur" hideCloseButton isOpen={popPreview}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex w-full justify-between items-center">
                  <div className="w-full">Preview C1</div>
                  <div className="flex gap-3">
                    {/* <button href={previewc1} target="_blank">
                      <Download className="text-success" />
                    </button> */}
                    <button onClick={() => setPopPreview(false)}>
                      <XCircle className="text-danger" />
                    </button>
                  </div>
                </div>
              </ModalHeader>
              <Divider />
              <ModalBody>
                <div className="p-2 flex justify-center">
                  <Image
                    isZoomed
                    src={previewc1}
                    width={250}
                    height={170}
                    className="object-scale-down"
                    alt="pre-c1"
                  />
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="mb-5 flex justify-between items-center">
        <div>
          <div className="lg:text-2xl font-bold">
            Detail Suara TPS {padNumber(result?.tps?.nama_tps)}{" "}
          </div>
          <div className="tracking-tighter">Ds.{result?.desa?.nama_desa}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setPopRejected(true)}
            isDisabled={result?.status === "WAITING_APPROVAL" ? false : true}
            size="sm"
            isIconOnly
            color="danger"
            startContent={<X size={15} />}
          />
          <Button
            onClick={() => setPopAproved(true)}
            isDisabled={result?.status === "WAITING_APPROVAL" ? false : true}
            className="text-white"
            size="sm"
            isIconOnly
            color="success"
            startContent={<Check size={15} />}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div>
            <Card>
              <CardHeader>
                <div className="flex w-full justify-between items-center">
                  <div className="w-full">Data Info</div>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="grid lg:grid-cols-2 gap-2">
                  <div>
                    <ul>
                      <li>
                        TPS :{" "}
                        <strong>{padNumber(result?.tps?.nama_tps)}</strong>
                      </li>
                      <li>
                        Desa : <strong>{result?.desa?.nama_desa}</strong>
                      </li>
                      <li>
                        Kecamatan :{" "}
                        <strong>{result?.kecamatan?.nama_kacamatan}</strong>
                      </li>
                      <li>
                        Kabupaten :{" "}
                        <strong>{result?.kabupaten?.nama_kabupaten}</strong>
                      </li>
                      <li>
                        Status : <ChipStatusRender status={result?.status} />
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul>
                      <li>Nama Saksi</li>
                      <li>Nomor Telepon</li>
                      <li>
                        Suara Sah :{" "}
                        <strong>
                          {formatRibuan(result?.jml_suara_sah ?? 0)}
                        </strong>
                      </li>
                      <li>
                        Suara Rusak :{" "}
                        <strong>
                          {" "}
                          {formatRibuan(result?.jml_suara_rusak ?? 0)}
                        </strong>
                      </li>
                      <li>
                        Suara Masuk :{" "}
                        <strong>
                          {" "}
                          {formatRibuan(
                            parseInt(result?.jml_suara_sah ?? 0) +
                              parseInt(result?.jml_suara_rusak ?? 0)
                          )}
                        </strong>
                      </li>
                      <li>
                        Tanggal Suara Masuk{" "}
                        <strong>
                          {result?.createdAt &&
                            dayjs(result?.createdAt).format(
                              "DD/MM/YY HH:mm:ss"
                            )}{" "}
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="grid lg:grid-cols-2 gap-4 mt-4">
            <div>
              <Card>
                <CardHeader>
                  <div className="flex w-full justify-between items-center">
                    <div className="w-full">Data Suara Partai</div>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="grid grid-cols-1 gap-2">
                    {" "}
                    <ScrollShadow className={`h-[400px] pr-2`}>
                      {result?.datasuarapartai?.map?.((item) => (
                        <div
                          key={item?.id}
                          className="border rounded-lg bg-gray-50 px-3 py-2 mb-2"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              {item?.partai?.label_partai}{" "}
                            </div>
                            <div>
                              <Chip color="primary">
                                {formatRibuan(item?.jml_suara)}
                              </Chip>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollShadow>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <div className="flex w-full justify-between items-center">
                    <div className="w-full">Data C1</div>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="grid grid-cols-1 gap-2">
                    {" "}
                    <ScrollShadow className={`h-[400px] pr-2`}>
                      {result?.datasuarac1?.map?.((item) => (
                        <div
                          key={item?.id}
                          className="border rounded-lg bg-gray-50 px-3 py-2 mb-2"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              {cutText(item?.originalname, 30)}
                            </div>
                            <div>
                              <Button
                                isLoading={previewProgres}
                                isDisabled={previewProgres}
                                onClick={() => previewC1(item?.id)}
                                isIconOnly
                                color="primary"
                                size="sm"
                              >
                                <Eye className="w-5 h-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollShadow>
                  </div>
                </CardBody>
              </Card>
            </div>
            {(result?.note_saksi || result?.note) && (
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex w-full justify-between items-center">
                      <div className="w-full">Note</div>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <div>
                      {!!result?.note_saksi && (
                        <div>
                          <div className="mb-2">Catatan Saksi</div>
                          <div className="border p-2 bg-warning-50 mb-4">
                            <p>{result?.note_saksi}</p>
                          </div>
                        </div>
                      )}

                      {!!result?.note && (
                        <div>
                          <div className="mb-2">Catatan Reject</div>
                          <div className="border p-2 bg-warning-50">
                            <p>{result?.note}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </div>
        </div>
        <div>
          <Card>
            <CardHeader>
              <div className="flex w-full justify-between items-center">
                <div className="w-full">Data Suara Caleg</div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="grid grid-cols-1 gap-2">
                <ScrollShadow className={`h-[400px] pr-2`}>
                  {result?.datasuaracaleg?.map?.((item) => (
                    <div
                      key={item?.id}
                      className="border rounded-lg bg-gray-50 px-3 py-2 mb-2"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          {" "}
                          #{item?.caleg?.nomor_urut} {item?.caleg?.nama_caleg}
                        </div>
                        <div>
                          <Chip color="primary">
                            {formatRibuan(item?.jml_suara)}
                          </Chip>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollShadow>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
