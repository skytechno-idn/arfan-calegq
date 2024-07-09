import PartaiCard from "@/components/PartaiCard";
import { GET_MYTPS, GET_SUARA } from "@/configs/saksi-endpoints";
import MobileLayout from "@/layouts/MobileLayout";
import { formatRibuan } from "@/lib/helper";
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
} from "@nextui-org/react";
import {
  Dialog,
  DialogButton,
  ListInput,
  Navbar,
  NavbarBackLink,
} from "konsta/react";
import { useRouter } from "next/router";

import React, { useState } from "react";
import useSWR from "swr";

const TabulasiPage = () => {
  const [basicOpened, setBasicOpened] = useState(false);
  const {
    isOpen: isOpenKonfirmasi,
    onOpen: onOpenKonfirmasi,
    onOpenChange: onOpenChangeKonfirmasi,
  } = useDisclosure();
  const router = useRouter();
  const {
    data: responseDataTPS,
    mutate: mutate,
    isLoading: loadingData,
  } = useSWR(`${GET_MYTPS}`, {
    keepPreviousData: true,
  });
  const {
    data: responseDataSUARA,
    mutate: mutateSUARA,
    isLoading: loadingDataSUARA,
  } = useSWR(`${GET_SUARA}`, {
    keepPreviousData: true,
  });
  const { result: resultTPS } = responseDataTPS || {};
  const { result: resultSUARA } = responseDataSUARA || {};
  return (
    <div>
      <Navbar
        left={
          <NavbarBackLink showText={false} onClick={() => history.back()} />
        }
        subtitle="Silahkan masukan data dengan teliti"
        title="Form Tabulasi"
      />
      <div className="mt-5 px-3">
        <div className="bg-white shadow-lg flex items-start gap-3 py-2 px-3 rounded-lg relative">
          <div className="absolute -right-1 -top-2">
            <Chip color="success" className="text-white ">
              <span className="font-semibold tracking-tighter">Terkirim</span>
            </Chip>
          </div>
          <div>
            <div className="font-semibold">TPS {resultTPS?.nama_tps}</div>
            <div className="text-gray-400 text-sm">
              Ds.{resultTPS?.desa?.nama_desa},
              {resultTPS?.kecamatan?.nama_kacamatan}
            </div>
            <div className="font-bold">
              Total DPT : {formatRibuan(resultTPS?.jml_dpt ?? 0)}
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
               
               {!loadingDataSUARA && formatRibuan(parseInt((resultSUARA?.jml_suara_sah)) ?? 0)}
              </div>
            </div>
            <div className="bg-danger/70 text-white p-3 rounded-lg">
              <span className="tracking-tighter text-sm font-semibold">
                Suara Rusak
              </span>
              <div className="font-bold">
               {!loadingDataSUARA && formatRibuan(parseInt((resultSUARA?.jml_suara_rusak)) ?? 0)}
              </div>
            </div>
            <div className="bg-primary/70 text-white p-3 rounded-lg">
              <span className="tracking-tighter text-sm font-semibold">
                Suara Masuk
              </span>
              <div className="font-bold">12.000</div>
            </div>
          </div>
        </div>
        <div className="mt-5 ">
          <div className="grid grid-cols-3  gap-2">
            <PartaiCard
              status={false}
              onClick={(e: any) => router.push("/mobile/tabulasi/" + e)}
              src={"/images/partai/pkb.png"}
              number="1"
              name="PKB"
              color="#02754C"
            />
            <PartaiCard
              onClick={(e: any) => router.push("/mobile/tabulasi/" + e)}
              src={"/images/partai/gerindra.png"}
              number="2"
              name="GERINDRA"
              color="#990000"
            />
            <PartaiCard
              onClick={(e: any) => router.push("/mobile/tabulasi/" + e)}
              src={"/images/partai/pdip.png"}
              number="3"
              name="PDIP"
              color="#D51F27"
            />
            <PartaiCard
              onClick={(e: any) => router.push("/mobile/tabulasi/" + e)}
              src={"/images/partai/golkar.png"}
              number="4"
              name="GOLKAR"
              color="#F2C111"
            />
            <PartaiCard
              onClick={(e: any) => router.push("/mobile/tabulasi/" + e)}
              src={"/images/partai/nasdem.png"}
              number="5"
              name="NASDEM"
              color="#002F79"
            />
            <PartaiCard
              onClick={(e: any) => router.push("/mobile/tabulasi/" + e)}
              src={"/images/partai/buruh.png"}
              number="6"
              name="PARTAI BURUH"
              color="#FF6600"
            />
            <PartaiCard
              onClick={(e: any) => router.push("/mobile/tabulasi/" + e)}
              src={"/images/partai/perindo.png"}
              number="7"
              name="PERINDO"
              color="#025599"
            />
            <PartaiCard
              onClick={(e: any) => router.push("/mobile/tabulasi/" + e)}
              src={"/images/partai/pks.png"}
              number="8"
              name="PKS"
              color="#FF5001"
            />
            <PartaiCard
              onClick={(e: any) => router.push("/mobile/tabulasi/" + e)}
              src={"/images/partai/pkn.png"}
              number="6"
              name="PKN"
              color="#FF2121"
            />
            <PartaiCard
              onClick={(e: any) => router.push("/mobile/tabulasi/" + e)}
              src={"/images/partai/hanura.png"}
              number="7"
              name="HANURA"
              color="#E62129"
            />
            <PartaiCard
              onClick={(e: any) => router.push("/mobile/tabulasi/" + e)}
              src={"/images/partai/garuda.png"}
              number="8"
              name="GARUDA"
              color="#C6922C"
            />
            <PartaiCard
              onClick={(e: any) => router.push("/mobile/tabulasi/" + e)}
              src={"/images/partai/pan.jpg"}
              number="8"
              name="PAN"
              color="#2D2F93"
            />
          </div>
          <div className="mt-5">
            <Button
              onClick={onOpenChangeKonfirmasi}
              color="primary"
              className="w-full"
            >
              Konfirmasi
            </Button>
          </div>
        </div>
      </div>
      <Modal
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
              <ModalBody>
                <div>
                  <div>
                    <label htmlFor="c1">
                      File C1 <span className="text-danger">*</span>
                    </label>
                    <input
                      id="c1"
                      type="file"
                      className="bg-gray-100 rounded-lg p-2 w-full"
                    />
                    <div className="italic text-xs">
                      Minimal ukuran file adalah 2MB
                    </div>
                  </div>
                </div>

                {/* <p>
                    Magna exercitation reprehenderit magna aute tempor cupidatat
                    consequat elit dolor adipisicing. Mollit dolor eiusmod sunt
                    ex incididunt cillum quis. Velit duis sit officia eiusmod
                    Lorem aliqua enim laboris do dolor eiusmod. Et mollit
                    incididunt nisi consectetur esse laborum eiusmod pariatur
                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                  </p> */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Keluar
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    setBasicOpened(true);
                  }}
                >
                  Lanjutkan
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
