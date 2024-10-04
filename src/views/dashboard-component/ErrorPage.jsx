import { Button } from "@nextui-org/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center m-32">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="Red"
        width={"60px"}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>

      <p className="text-2xl font-sans font-semibold text-center">
        You must log in to access your Dashboard
      </p>

      <Button
        className="font-semibold mt-4 bg-[#5D89B0] text-white"
        variant="shadow"
        onPress={() => navigate("/")}
      >
        Back to Homepage
      </Button>
    </div>
  );
};

export default ErrorPage;
