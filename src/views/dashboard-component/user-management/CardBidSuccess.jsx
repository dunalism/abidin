import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import iconBidSuccess from "../../../assets/dashboard-assets/iconBidSuccess.svg";
import { axiosInstance } from "../../../lib-axios/axios-dashboard";

const CardBidSuccess = () => {
  const [bidSuccess, setBidSuccess] = useState(0);

  useEffect(() => {
    const fetchBidSuccess = async () => {
      try {
        const response = await axiosInstance.get("/bill-history");
        const billHistory = response.data;

        let successfulBids = 0;
        for (let i = 0; i < billHistory.length; i++) {
          if (billHistory[i]?.description === "Successful Bid") {
            successfulBids++;
          }
        }

        setBidSuccess(successfulBids);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBidSuccess();
  }, []);

  return (
    <>
      <Card
        className="w-[165px] h-[129px] border-2 bg-[#F2F2F2]"
        shadow="sm"
        radius="sm"
      >
        <CardHeader className="justify-center">
          <Chip
            className="bg-[#5D89B0] text-white"
            radius="md"
            size="lg"
            startContent={<img src={iconBidSuccess} />}
          >
            Bid Success
          </Chip>
        </CardHeader>
        <CardBody className="items-center justify-center font-bold text-xl mb-4">
          {bidSuccess}
        </CardBody>
      </Card>
    </>
  );
};

export default CardBidSuccess;
