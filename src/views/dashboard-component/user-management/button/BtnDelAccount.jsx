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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../lib-axios/axios-dashboard";

const BtnDelAccount = ({ id }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDeleteAccount = async () => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      toast.success("Berhasil Hapus Akun", {
        onClose: () => {
          onOpenChange(false);
          navigate("/login");
        },
      });
    } catch (error) {
      toast.error("Gagal Hapus Akun, coba lagi!");
    }
  };

  return (
    <>
      <Button onPress={onOpen} size="sm" color="danger" variant="solid">
        Delete
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <ModalHeader>Delete Account</ModalHeader>
                <ModalBody>
                  Are you sure you want to Delete your Account ?
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
                    onPress={() => handleDeleteAccount(id)}
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

export default BtnDelAccount;
