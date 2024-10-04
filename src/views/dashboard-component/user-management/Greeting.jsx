import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { axiosInstance } from "../../../lib-axios/axios-dashboard";

const Greeting = ({ userData }) => {
  const [getUsername, setUsername] = useState(null);

  useEffect(() => {
    if (userData.fullname) {
      setUsername(userData.fullname);
    }
  }, [userData]);

  return (
    <div>
      <Card className="w-[550px] h-[160px]" shadow="sm" radius="sm">
        <CardHeader className=" px-6 py-3 font-semibold text-xl bg-[#5D89B0] text-white border-2 border-[#5D89B0]">
          Welcome to Abidin, {getUsername}
        </CardHeader>
        <CardBody className="px-6 py-2 bg-[#F2F2F2] text-md font-semibold border-2 items-center justify-center">
          <i>
            Auction and Bid Indonesia, also known as ABIDIN, is an auction and
            marketplace platform for collectors who have a hobby of acquiring
            special items.
          </i>
        </CardBody>
      </Card>
    </div>
  );
};

export default Greeting;
