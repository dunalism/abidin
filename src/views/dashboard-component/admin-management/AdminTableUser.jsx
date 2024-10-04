import {
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import AdminEditBtn from "./admin-button/AdminEditBtn";
import { axiosInstance } from "../../../lib-axios/axios-dashboard";

const AdminTableUser = () => {
  const [getDataUser, setDataUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/users");

      setDataUser(response.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Card
        className="w-[900px] h-auto bg-white border-2 border-[#F2F2F2]"
        shadow="sm"
        radius="sm"
      >
        <div className="justify-center flex mt-3">
          <Chip size="lg" className="bg-[#5D89B0] text-white ">
            <p className="font-semibold text-lg">Data Users</p>
          </Chip>
        </div>

        <Table
          className="overflow-auto"
          radius="none"
          aria-label="Admin Table"
          isHeaderSticky
        >
          <TableHeader>
            <TableColumn className="bg-[#5D89B0] text-white">ID</TableColumn>
            <TableColumn className="bg-[#5D89B0] text-white">
              Full Name
            </TableColumn>
            <TableColumn className="bg-[#5D89B0] text-white">Email</TableColumn>
            <TableColumn className="bg-[#5D89B0] text-white">
              Phone Number
            </TableColumn>
            <TableColumn className="bg-[#5D89B0] text-white">Role</TableColumn>
            <TableColumn className="bg-[#5D89B0] text-white" align="end">
              Action
            </TableColumn>
          </TableHeader>

          <TableBody>
            {getDataUser.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>{data.fullname}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.phoneNumber}</TableCell>
                  <TableCell>{data.role}</TableCell>
                  <TableCell align="center">
                    <AdminEditBtn />
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

export default AdminTableUser;
