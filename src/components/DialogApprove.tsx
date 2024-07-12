import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import React from "react";

const DialogApprove = ({ isOpen, onTrigger, onClose, title = "" }: any) => {
  return (
    <Modal backdrop="blur" isDismissable isOpen={isOpen}>
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <div className="mt-4">
                <div className="text-lg tracking-tighter font-semibold"></div>
                <p className=" font-semibold">
                  Apakah anda menyetujui suara ini ?
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" onClick={() => onClose()}>
                Tidak
              </Button>
              <Button
                className="text-white"
                color="success"
                onClick={() => onTrigger()}
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

export default DialogApprove;
