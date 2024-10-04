/* eslint-disable react/prop-types */
import { Input } from "@nextui-org/react";
import {
  EntypoEmail,
  EyeFilledIcon,
  EyeSlashFilledIcon,
  PwIcon,
  UsernameIcon,
} from "./Icons";
import { useState } from "react";

export const InputEmailStyled = ({ field, isInvalid, errorMessage }) => {
  return (
    <Input
      type="email"
      {...field}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      variant="bordered"
      startContent={<EntypoEmail className="ml-[-6px] h-4 w-4" />}
      size="lg"
      placeholder="Email"
      color="primary"
    />
  );
};

export const InputPWStyled = ({ field, isInvalid, errorMessage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
      {...field}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      variant="bordered"
      startContent={<PwIcon className="ml-[-7px] h-[1.1rem] w-[1.1rem]" />}
      size="lg"
      placeholder="Password"
      color="primary"
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
          aria-label="toggle password visibility"
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
};

export const InputUsrStyled = ({ field, isInvalid, errorMessage }) => {
  return (
    <Input
      {...field}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      variant="bordered"
      startContent={<UsernameIcon className="ml-[-6px] h-4 w-4" />}
      size="lg"
      placeholder="Username"
      color="primary"
    />
  );
};

export const InputNameStyled = ({ field, isInvalid, errorMessage }) => {
  return (
    <Input
      {...field}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      variant="bordered"
      startContent={<UsernameIcon className="ml-[-6px] h-4 w-4" />}
      size="lg"
      placeholder="Nama Lengkap"
      color="primary"
    />
  );
};

export const PlaceBidInput = ({ field, fieldState, upBid }) => {
  return (
    <Input
      {...field}
      isInvalid={Boolean(fieldState.error)}
      errorMessage={fieldState.error?.message}
      type="number"
      startContent={<p className="text-sm text-gray-500">Rp</p>}
      placeholder={`${upBid} or more`}
    />
  );
};
