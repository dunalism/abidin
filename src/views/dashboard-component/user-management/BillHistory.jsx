import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../lib-axios/axios-dashboard";

const BillHistory = () => {
  const [billHistory, setBillHistory] = useState([]);
  //Get data bills sesuai id user yang login
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBillHistory = async () => {
      try {
        const response = await axiosInstance.get(`/bills?id=${id}`);
        setBillHistory(response.data);
        console.log("response.data", response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBillHistory();
  }, []);

  return (
    <>
      <Card
        className="w-[550px] h-[200px] bg-[#F2F2F2] border-2"
        shadow="sm"
        radius="sm"
      >
        <Table
          className="overflow-auto"
          radius="none"
          aria-label="History"
          isHeaderSticky
        >
          <TableHeader>
            <TableColumn className="bg-[#5D89B0] text-white">
              AUCTION ID
            </TableColumn>
            <TableColumn className="bg-[#5D89B0] text-white">
              BID DATE
            </TableColumn>
            <TableColumn className="bg-[#5D89B0] text-white">TITLE</TableColumn>
            <TableColumn className="bg-[#5D89B0] text-white">
              BID AMOUNT
            </TableColumn>
          </TableHeader>

          <TableBody>
            {billHistory.map((i, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{i.auctId}</TableCell>
                  <TableCell>
                    {new Date(i.bidDate).toLocaleString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{i.title}</TableCell>
                  <TableCell>
                    {i.bidAmount.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default BillHistory;
