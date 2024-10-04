import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// lanjutkan kode nya
const AdminDelBtn = ({ id, name }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  const handleDelete = () => {
    // lanjutkan logic nya

    // ini contoh salah
    toast.success("User dihapus", {
      onClose: () => {
        onOpenChange(false);
        navigate("/login");
      },
    });
  };

  return (
    <>
      <Button onPress={onOpen} color="danger" variant="solid" size="sm">
        Delete
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>Delete User</ModalHeader>
                <ModalBody>
                  Are you sure you want to delete *Nama User ?{" "}
                </ModalBody>
                <ModalFooter>
                  <Button
                    onPress={onClose}
                    color="danger"
                    variant="flat"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onPress={() => handleDelete()}
                    className="bg-[#4B779E] text-white"
                    size="sm"
                  >
                    Yes
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminDelBtn;
