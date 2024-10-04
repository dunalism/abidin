import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import iconTotalBid from "../../../assets/dashboard-assets/iconTotalBid.svg";
import { axiosInstance } from "../../../lib-axios/axios-dashboard";

const CardTotalBid = () => {
  const [totalBid, setTotalBid] = useState(0);

  useEffect(() => {
    const fetchTotalBid = async () => {
      try {
        const response = await axiosInstance.get("/bill-history");
        const billHistory = response.data;

        let totalBidCount = 0;
        for (let i = 0; i < billHistory.length; i++) {
          if (
            billHistory[i]?.description === "Failed Bid" ||
            billHistory[i]?.description === "Successful Bid"
          ) {
            totalBidCount++;
          }
        }
        setTotalBid(totalBidCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTotalBid();
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
            startContent={<img src={iconTotalBid} className="pl-1" />}
          >
            Total Bid
          </Chip>
        </CardHeader>
        <CardBody className="items-center justify-center font-bold text-xl mb-4">
          {totalBid}
        </CardBody>
      </Card>
    </>
  );
};

export default CardTotalBid;
