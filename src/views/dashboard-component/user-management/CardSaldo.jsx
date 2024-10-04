import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Chip, Tooltip } from "@nextui-org/react";
import iconSaldo from "../../../assets/dashboard-assets/iconSaldo.svg";
import { axiosInstance } from "../../../lib-axios/axios-dashboard";

const CardSaldo = () => {
  const [saldo, setSaldo] = useState(null);

  const formatSaldo = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(0)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`;
    }
    return amount;
  };

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await axiosInstance.get("/bill-history");
        const billHistory = response.data;
        const saldo = billHistory[0]?.finalBalance;

        setSaldo(saldo);
      } catch (error) {
        setError(error.response?.data || "ada yang error!");
      }
    };

    fetchBill();
  }, []);

  return (
    <>
      <Card
        className="w-[165px] h-[129px] border-2 bg-[#F2F2F2]"
        shadow="sm"
        radius="sm"
      >
        <CardHeader className="justify-center">
          <Tooltip
            color="foreground"
            placement="top-start"
            content={`Rp ${saldo?.toLocaleString("id-ID")}`}
          >
            <Chip
              className="bg-[#5D89B0] text-white"
              radius="md"
              size="lg"
              startContent={<img src={iconSaldo} className="pl-2" />}
            >
              Saldo
            </Chip>
          </Tooltip>
        </CardHeader>
        <CardBody className="items-center justify-center font-bold text-xl mb-4">
          Rp {formatSaldo(saldo)}
        </CardBody>
      </Card>
    </>
  );
};

export default CardSaldo;
