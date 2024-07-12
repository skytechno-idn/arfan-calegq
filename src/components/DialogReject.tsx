import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";

const DialogReject = ({ isOpen, onTrigger, onClose }: any) => {
  const [note, setNote] = useState("");
  return (
    <Modal backdrop="blur" isDismissable isOpen={isOpen}>
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <div className="mt-4">
                <div className="text-lg tracking-tighter font-semibold"></div>
                <p className=" font-semibold">
                  Apakah anda Menolak suara ini ?
                </p>
                <div className="mt-5">
                  <Textarea labelPlacement="outside"
                    label="Catatan Penolakan" placeholder="Masukan disini"
                    onChange={(e) => setNote(e?.target?.value)}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" onClick={() => onClose()}>
                Tidak
              </Button>
              <Button
                className="text-white"
                color="danger"
                onClick={() => onTrigger(note)}
              >
                Ya
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DialogReject;
