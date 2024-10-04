import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import iconEdit from "../../../../assets/dashboard-assets/iconEdit.svg";
import BtnDelAccount from "./BtnDelAccount";
import { axiosInstance } from "../../../../lib-axios/axios-dashboard";

const profileSchema = z.object({
  fullname: z.string().min(2, "Nama harus minimal 2 karakter"),
  email: z.string().email("Email salah"),
  phoneNumber: z.string().min(10, "Nomor Telpon Minimal 10 digit").optional(),
});

const BtnEditProfile = ({ id, onProfileUpdate }) => {
  const [userData, setUserData] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${id}`);
        setUserData(response.data);
        reset(response.data);
      } catch (error) {
        toast.error("Gagal mengambil data pengguna");
      }
    };
    if (id) {
      fetchUserData();
    }
  }, [id, reset]);

  const handleEdit = async (data) => {
    const updatedUser = { ...userData, ...data };
    try {
      const response = await axiosInstance.put(`/users/${id}`, updatedUser);
      toast.success("Profil berhasil diperbarui!");
      onOpenChange(false);

      if (onProfileUpdate) {
        onProfileUpdate(updatedUser);
      }
    } catch (error) {
      toast.error(`Gagal memperbarui profil: ${error.message}`);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        size="sm"
        fullWidth
        className="bg-[#4B779E] text-white font-semibold text-md"
      >
        Edit
        <img src={iconEdit} alt="" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => {
            return (
              <>
                <form onSubmit={handleSubmit(handleEdit)} className="space-y-2">
                  <ModalHeader>Edit Profile</ModalHeader>
                  <ModalBody>
                    <div className="space-y-3 mb-6">
                      <Controller
                        name={"fullname"}
                        control={control}
                        render={({ field, fieldState }) => {
                          return (
                            <Input
                              {...field}
                              label="Full Name"
                              type="text"
                              size="sm"
                              aria-label="name"
                              isInvalid={Boolean(fieldState.error)}
                              errorMessage={fieldState.error?.message}
                            />
                          );
                        }}
                      />

                      <Controller
                        name={"email"}
                        control={control}
                        render={({ field, fieldState }) => {
                          return (
                            <Input
                              {...field}
                              label={"Email"}
                              type={"email"}
                              size="sm"
                              aria-label="email"
                              isInvalid={Boolean(fieldState.error)}
                              errorMessage={fieldState.error?.message}
                            />
                          );
                        }}
                      />
                      <Controller
                        name={"phoneNumber"}
                        control={control}
                        render={({ field, fieldState }) => {
                          return (
                            <Input
                              {...field}
                              label={"Phone Number"}
                              type={"text"}
                              size="sm"
                              aria-label="phone"
                              isInvalid={Boolean(fieldState.error)}
                              errorMessage={fieldState.error?.message}
                            />
                          );
                        }}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter className="flex justify-between">
                    <div>
                      <BtnDelAccount id={userData.id} />
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
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BtnEditProfile;
