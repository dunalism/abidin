import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AdminDelBtn from "./AdminDelBtn";
import iconSetting from "../../../../assets/dashboard-assets/iconSetting.svg";

// lanjutin kode nya
const AdminEditBtn = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const handleEdit = () => {
    // logic nya
    onOpenChange(false);
    toast.success("Update Success");
  };

  // useEffect kalo perlu

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        size="sm"
        radius="full"
        variant="light"
      >
        <Tooltip
          content="Setting"
          placement="top-end"
          size="sm"
          color="foreground"
        >
          <img src={iconSetting} alt="setting" />
        </Tooltip>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => {
            return (
              <form onSubmit={handleSubmit(handleEdit)}>
                <ModalHeader>Edit User ?</ModalHeader>
                <ModalBody>
                  <Controller
                    name=""
                    control={control}
                    render={({}) => {
                      return <Input size="sm" label={"Name"} />;
                    }}
                  />
                  <Controller
                    name=""
                    control={control}
                    render={({}) => {
                      return <Input size="sm" label={"Email"} />;
                    }}
                  />
                  <Controller
                    name=""
                    control={control}
                    render={({}) => {
                      return <Input size="sm" label={"Phone"} />;
                    }}
                  />
                  <Controller
                    name=""
                    control={control}
                    render={({}) => {
                      return <Input size="sm" label={"Address"} />;
                    }}
                  />
                </ModalBody>
                <ModalFooter className="flex justify-between">
                  <div>
                    <AdminDelBtn />
                  </div>

                  <div className="space-x-2">
                    <Button
                      onPress={onClose}
                      color="danger"
                      variant="flat"
                      size="sm"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#4B779E] text-white"
                      size="sm"
                    >
                      Save
                    </Button>
                  </div>
                </ModalFooter>
              </form>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminEditBtn;
