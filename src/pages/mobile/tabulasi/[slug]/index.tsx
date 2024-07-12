import {
  GET_PARTAI,
  GET_SUARA,
  SET_DRAFT_SUARA,
} from "@/configs/saksi-endpoints";
import MobileLayout from "@/layouts/MobileLayout";
import axiosInstance from "@/lib/axios";
import { formatRibuan, isObjectEmpty } from "@/lib/helper";
import { Button, Input, Spinner } from "@nextui-org/react";
import {
  BlockTitle,
  Dialog,
  DialogButton,
  List,
  ListItem,
  Navbar,
  NavbarBackLink,
  Stepper,
} from "konsta/react";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

const TabulasiFormPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const {
    data: responseDataSUARA,
    mutate: mutateSUARA,
    isLoading: loadingDataSUARA,
  } = useSWR(`${GET_SUARA}`, {
    keepPreviousData: true,
    refreshInterval: 5000,
  });
  const {
    data: responseData,
    mutate: mutate,
    isLoading: loadingData,
  } = useSWR(`${GET_PARTAI}/${slug}`, {
    keepPreviousData: true,
  });
  const { result: resultSUARA } = responseDataSUARA || {};
  const { result } = responseData || {};

  const [popUpConfirm, setPopUpConfirm] = useState(false);
  const [processingDraft, setProcessingDraft] = useState(false);
  const [calegSuara, setCalegSuara] = useState([]);
  const [partaiSuara, setPartaiSuara] = useState<any>(0);
  const [tCalegS, setTCalegS] = useState<any>(0);
  useEffect(() => {
    resetSuara();
  }, [result]);

  useEffect(() => {
    let totalVotes = 0;
    calegSuara.forEach((candidate: any) => {
      totalVotes += candidate.jml_suara_caleg;
    });
    setTCalegS(totalVotes);
  }, [calegSuara]);

  const resetSuara = () => {
    if (!isObjectEmpty(result?.list_caleg)) {
      const res =
        result?.list_caleg?.map((item) => ({
          id_caleg: item?.id_caleg,
          nama_caleg: item?.nama_caleg,
          jml_suara_caleg: item?.jml_suara_caleg,
        })) || [];

      setCalegSuara(res);
      setPartaiSuara(result?.jml_suara_partai);
    }
  };

  const findCalegSuara = (id) => {
    const f: any = calegSuara?.find((e: any) => e?.id_caleg === id);
    return f?.jml_suara_caleg;
  };

  const updateSuaraCaleg = (id, newJmlSuaraCaleg) => {
    setCalegSuara((prevCalegSuara: any) =>
      prevCalegSuara.map((item) =>
        item.id_caleg === id
          ? { ...item, jml_suara_caleg: newJmlSuaraCaleg }
          : item
      )
    );
  };

  const onInputChange = (e, item) => {
    if (!isNaN(e)) {
      updateSuaraCaleg(item?.id_caleg, parseInt(e));
    }
  };

  const handleSaveDraft = async () => {
    setProcessingDraft(true);
    try {
      const payload = {
        id_partai: result?.id,
        jml_suara_partai: partaiSuara,
        list_suara_caleg: calegSuara,
      };

      const response: any = await axiosInstance.post(SET_DRAFT_SUARA, payload);

      if (response?.data.success) {
        toast.success("Berhasil Menyimpan Suara");
        router.push("/mobile/tabulasi");
      } else {
        toast.error(response.data.message ?? "fail");
      }
    } catch (e) {
      toast.error("Gagal Menyimpan Suara");
    } finally {
      setPopUpConfirm(false);
      setProcessingDraft(false);
    }
  };

  return (
    <>
      <Navbar
        left={
          <NavbarBackLink
            showText={false}
            onClick={() => router.push("/mobile/tabulasi")}
          />
        }
        subtitle="Silahkan masukan Suara Caleg"
        title="PKB"
      />
      <div>
        {["NEW", "REPAIR", "REJECTED"].includes(resultSUARA?.status) && (
          <div className="flex gap-2 px-3 pt-3 ">
            <Button
              onClick={() => {
                resetSuara();
                toast.success("Reset Suara Berhasil");
              }}
            >
              Reset Ulang Suara
            </Button>
            <div className="flex-1">
              <Button
                color="primary"
                onClick={() => setPopUpConfirm(true)}
                className="w-full"
              >
                Simpan Suara (Draft){" "}
              </Button>
            </div>
          </div>
        )}

        <BlockTitle>Suara Partai {result?.label_partai}</BlockTitle>
        <List strongIos outlineIos>
          <ListItem
            title={
              <div>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-semibold tracking-tighter text-sm">
                      Jumlah Suara Partai
                    </div>
                    {/* <div className="-mt-1 font-semibold text-primary text-xs">
                      Total Suara{" "}
                      {isNaN(findCalegSuara(partaiSuara))
                        ? 0
                        : formatRibuan(findCalegSuara(partaiSuara))}
                    </div> */}
                  </div>
                </div>
              </div>
            }
            after={
              <div className="border-l pl-2">
                <Input
                  isReadOnly={
                    !["NEW", "REPAIR", "REJECTED"].includes(resultSUARA?.status)
                  }
                  size="sm"
                  className="w-24"
                  type="number"
                  value={isNaN(partaiSuara) ? 0 : partaiSuara}
                  onValueChange={(e): any => {
                    setPartaiSuara(e);
                  }}
                />
              </div>
            }
          />
        </List>
      </div>
      {!!result?.list_caleg?.length && (
        <div>
          <BlockTitle>Suara Calon Legislatif</BlockTitle>
          <List strongIos outlineIos>
            {result?.list_caleg?.map((item, index) => (
              <ListItem
                key={item?.id}
                title={
                  <div>
                    <div className="flex items-center gap-2">
                      <div className=" bg-primary px-1.5 py-1 rounded text-xs text-white">
                        {item?.nomor_urut}
                      </div>

                      <div className="font-semibold tracking-tighter">
                        <div className="text-sm leading-4 tracking-tighter">
                          {item?.nama_caleg}
                        </div>
                        {/* <div className=" font-semibold text-primary text-xs">
                          Total Suara{" "}
                          {isNaN(findCalegSuara(item?.id_caleg))
                            ? 0
                            : formatRibuan(findCalegSuara(item?.id_caleg))}
                        </div> */}
                      </div>
                    </div>
                  </div>
                }
                after={
                  <div className="border-l pl-2">
                    <Input
                      isReadOnly={
                        !["NEW", "REPAIR", "REJECTED"].includes(
                          resultSUARA?.status
                        )
                      }
                      size="sm"
                      className="w-24"
                      type="number"
                      value={findCalegSuara(item?.id_caleg)}
                      onValueChange={(e) => onInputChange(e, item)}
                    />
                  </div>
                }
              />
            ))}
            <ListItem
              title={<div className="font-bold">TOTAL SUARA CALEG</div>}
              after={
                <div className="border-l pl-2 font-bold">
                  {!isNaN(tCalegS) ? formatRibuan(tCalegS) : 0}
                </div>
              }
            />
          </List>
        </div>
      )}

      <Dialog
        onBackdropClick={() => {}}
        opened={popUpConfirm}
        title="Harap baca"
        content={
          <>
            Apakah Anda yakin untuk mengonfirmasi suara ini ?
            <div>
              NB:ketika anda menekan <strong>Ya, Submit </strong>Proses akan
              memakan <br /> waktu 1 - 3 Menit , Harap Menunggu
            </div>
          </>
        }
        buttons={
          <>
            <DialogButton onClick={() => setPopUpConfirm(false)}>
              Batal
            </DialogButton>
            <DialogButton
              disabled={processingDraft}
              onClick={() => handleSaveDraft()}
            >
              {processingDraft ? <Spinner size="sm" /> : "  Ya, Submit "}
            </DialogButton>
          </>
        }
      />
    </>
  );
};
TabulasiFormPage.getLayout = (page) => (
  <MobileLayout tabbar={false}>{page}</MobileLayout>
);
export default TabulasiFormPage;
