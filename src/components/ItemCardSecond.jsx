import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  // CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

const ItemCardSecond = ({ to, name, src, price, status }) => {
  const navigate = useNavigate();
  return (
    <Link to={to}>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <h4
            style={{ textShadow: "2px 2px 4px #232946" }}
            className="font-black text-xl text-default-200 dark:text-primary-800"
          >
            {name}
          </h4>
        </CardHeader>
        <Image
          removeWrapper
          alt={name}
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={src}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-tiny uppercase">
              {status === "active" ? "Current Bid" : "Final bid"}
            </p>
            <span className="text-xl font-bold text-gray-900">Rp {price}</span>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/product");
            }}
            className="text-tiny"
            color="primary"
            radius="full"
            size="sm"
          >
            Bid Now!
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

ItemCardSecond.propTypes = {
  to: PropTypes.string,
  src: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  status: PropTypes.string,
};

export default ItemCardSecond;
