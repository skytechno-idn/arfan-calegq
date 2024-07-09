import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import React from "react";

const DialogDelete = ({
  isOpen,
  onTrigger,
  onClose,
  title = "",
  rowSelected,
  processing,
}: any) => {
  return (
    <Modal backdrop="blur" isDismissable isOpen={isOpen}>
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <div className="mt-4">
                <div className="text-lg tracking-tighter font-semibold"></div>
                <p className="text-rose-400 font-semibold">
                  Are you sure Delete this {title} ?
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={processing}
                isDisabled={processing}
                color="default"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button
                isLoading={processing}
                isDisabled={processing}
                color="danger"
                onClick={() => onTrigger()}
              >
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DialogDelete;
