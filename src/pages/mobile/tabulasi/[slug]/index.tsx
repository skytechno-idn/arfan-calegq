import MobileLayout from "@/layouts/MobileLayout";
import { Button, Image } from "@nextui-org/react";
import {
  App,
  BlockTitle,
  Dialog,
  DialogButton,
  List,
  ListInput,
  ListItem,
  Navbar,
  NavbarBackLink,
  Page,
  Stepper,
} from "konsta/react";
import React, { useState } from "react";

const TabulasiFormPage = () => {
  const [basicOpened, setBasicOpened] = useState(false);
  const [value, setValue] = useState(1);
  const increase = () => {
    setValue(value + 1);
  };
  const decrease = () => {
    setValue(value - 1 < 0 ? 0 : value - 1);
  };

  const [inputValue, setInputValue] = useState<any>(1);
  const increaseInput = () => {
    const v = parseInt(inputValue, 10);
    if (isNaN(v)) setInputValue(0);
    else setInputValue(v + 1);
  };
  const decreaseInput = () => {
    const v = parseInt(inputValue, 10);
    if (isNaN(v)) setInputValue(0);
    setInputValue(v - 1 < 0 ? 0 : v - 1);
  };
  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const onInputBlur = () => {
    if (isNaN(parseInt(inputValue, 10))) setInputValue(0);
  };
  return (
    <>
      <Navbar
        left={
          <NavbarBackLink showText={false} onClick={() => history.back()} />
        }
        subtitle="Silahkan masukan Suara Caleg"
        title="PKB"
      />
      <div>
        <BlockTitle>Suara Partai PKB</BlockTitle>
        <List strongIos outlineIos>
          <ListItem
            title={
              <div>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="font-semibold tracking-tighter">
                      Jumlah Suara Partai
                    </div>
                    <div className="-mt-1 font-bold text-primary text-sm">
                      3000 Suara
                    </div>
                  </div>
                </div>
              </div>
            }
            after={
              <Stepper
                value={inputValue}
                input
                onChange={onInputChange}
                onBlur={onInputBlur}
                onPlus={increaseInput}
                onMinus={decreaseInput}
              />
            }
          />
        </List>
      </div>
      <div>
        <BlockTitle>Suara Calon Legislatif</BlockTitle>
        <List strongIos outlineIos>
          <ListItem
            title={
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-xl bg-primary px-3 py-1 rounded-lg text-white">
                    1
                  </div>

                  <div className="font-semibold tracking-tighter">
                    Amran Abrraham Lincoln
                  </div>
                </div>
              </div>
            }
            after={
              <Stepper
                value={inputValue}
                input
                onChange={onInputChange}
                onBlur={onInputBlur}
                onPlus={increaseInput}
                onMinus={decreaseInput}
              />
            }
          />
          <ListItem
            title={
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-xl bg-primary px-3 py-1 rounded-lg text-white">
                    2
                  </div>
                  <div className="font-semibold tracking-tighter">
                    Amran Abrraham Lincoln
                  </div>
                </div>
              </div>
            }
            after={
              <Stepper
                value={inputValue}
                input
                onChange={onInputChange}
                onBlur={onInputBlur}
                onPlus={increaseInput}
                onMinus={decreaseInput}
              />
            }
          />
          <ListItem
            title={
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-xl bg-primary px-3 py-2 rounded-lg text-white font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-semibold tracking-tighter">
                      Amran Abrraham Lincoln
                    </div>
                    <div className="-mt-1 font-bold text-primary text-sm">
                      3000 Suara
                    </div>
                  </div>
                </div>
              </div>
            }
            after={
              <Stepper
                value={inputValue}
                input
                onChange={onInputChange}
                onBlur={onInputBlur}
                onPlus={increaseInput}
                onMinus={decreaseInput}
              />
            }
          />
          <ListItem
            title={
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-xl bg-primary px-3 py-1 rounded-lg text-white">
                    4
                  </div>
                  <div className="font-semibold tracking-tighter">
                    Amran Abrraham Lincoln
                  </div>
                </div>
              </div>
            }
            after={
              <Stepper
                value={inputValue}
                input
                onChange={onInputChange}
                onBlur={onInputBlur}
                onPlus={increaseInput}
                onMinus={decreaseInput}
              />
            }
          />
        </List>
      </div>
      <div className="flex gap-2 px-3">
        <Button>Reset Ulang Suara</Button>
        <div className="flex-1">
          <Button
            color="primary"
            onClick={() => setBasicOpened(true)}
            className="w-full"
          >
            Simpan Suara (Draft){" "}
          </Button>
        </div>
      </div>
      <Dialog
        onBackdropClick={() => {}}
        opened={basicOpened}
        title="Pesan Konfirmasi"
        content={<>Apakah Anda yakin untuk mengonfirmasi suara ini ?</>}
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
    </>
  );
};
TabulasiFormPage.getLayout = (page) => (
  <MobileLayout tabbar={false}>{page}</MobileLayout>
);
export default TabulasiFormPage;
