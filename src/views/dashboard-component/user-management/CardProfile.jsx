import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import BtnEditProfile from "./button/BtnEditProfile";
import { axiosInstance } from "../../../lib-axios/axios-dashboard";

const CardProfile = ({ setUserData }) => {
  const [userDataLocal, setUserDataLocal] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const getLogged = localStorage.getItem("logged");
        const getId = localStorage.getItem("userId");
        const getUser = await axiosInstance.get(`/users/${getId}`);

        if (getUser.data.email === getLogged) {
          setUserDataLocal(getUser.data);
          setUserData(getUser.data);
        } else {
          setUserDataLocal("Guest");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [setUserData]);

  const handleProfileUpdate = (updatedUser) => {
    setUserData(updatedUser);
  };

  return (
    <>
      <Card
        className="w-[250px] h-[376px] p-2 border-2 bg-[#F2F2F2]"
        shadow="sm"
        radius="sm"
      >
        <CardHeader className="justify-center">
          <Avatar
            radius="full"
            className="w-28 h-28 border-2 text-large mt-2 border-[#CCCCCC]"
          />
        </CardHeader>
        <CardBody>
          <div className="text-center mt-4">
            <p className="font-semibold text-md text-gray-600">
              {userDataLocal.fullname}
            </p>
            <p className="font-semibold text-md text-gray-600">
              {userDataLocal.email}
            </p>
            <p className="font-semibold text-md text-gray-600">
              {userDataLocal.phoneNumber}
            </p>
            <p className="font-semibold text-md text-gray-600">
              {userDataLocal.role}
            </p>
          </div>
        </CardBody>
        <CardFooter>
          <BtnEditProfile
            id={userDataLocal.id}
            onProfileUpdate={(updatedUser) => {
              setUserDataLocal(updatedUser);
              setUserData(updatedUser); // Update data di Dashboard
            }}
          />
        </CardFooter>
      </Card>
    </>
  );
};

export default CardProfile;
