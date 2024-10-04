/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // swiper
import baseURL from "../lib-axios/baseUrl";
import { formatNumberWithDots } from "../lib";

// For Image Carousel
function CarouselImage({ src, to }) {
  return (
    <Link
      to={to}
      className="relative h-full w-full flex justify-center items-center overflow-hidden"
    >
      {/* Background blurred image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 blur-xl scale-110"
        style={{
          backgroundImage: `url(${src})`,
        }}
      ></div>

      {/* Foreground image */}
      <img className="object-contain h-full w-full relative z-10" src={src} />
    </Link>
  );
}
CarouselImage.propTypes = {
  src: PropTypes.string.isRequired,
  to: PropTypes.string,
};

// For card for showcasing items added
export function ItemCard({ to, name, src, price }) {
  return (
    <Link to={to}>
      <Card className="py-4 shadow-lg hover:bg-gray-300 dark:hover:bg-slate-800">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-black text-xl truncate ... gap-2">{name}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <img
            alt={name}
            className="object-cover rounded-xl w-auto h-[300px]"
            src={src}
          />
        </CardBody>
        <CardFooter className="flex flex-col items-start px-4">
          <p className="text-tiny uppercase">Initial Bid</p>
          <div className="flex items-center justify-between w-full">
            <span className="text-xl font-bold">Rp {price}</span>
            <Button
              className="text-tiny"
              color="primary"
              radius="full"
              size="sm"
            >
              Bid Now!
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
ItemCard.propTypes = {
  to: PropTypes.string,
  src: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

// Search feature form
export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // if use keyboard
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/categories/${inputValue}`);
    }
  };
  // if manually search button
  const handleButtonClick = () => {
    navigate(`/categories/${inputValue}`);
  };

  return (
    <div className="m-4 flex items-center justify-center align-middle">
      <Input
        className="w-max lg:w-96 mx-2"
        type="text"
        placeholder="Instruments"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <Button onClick={handleButtonClick} color="primary" className="">
        Search
      </Button>
    </div>
  );
};

function H1({ text }) {
  return <h1 className="my-4 text-4xl font-black">{text}</h1>;
}
H1.propTypes = {
  text: PropTypes.string.isRequired,
};

function homepage() {
  // To fetch data to item cards section of 'recent open listing'
  const [auctions, setAuctions] = useState([]);
  useEffect(() => {
    fetch(`${baseURL}/auctions`)
      .then((response) => response.json())
      .then((data) => {
        // Limit to 6 items
        const limitedItems = data
          .filter((auction) => auction.status === "active")
          .slice(0, 8);

        setAuctions(limitedItems);
      })
      .catch((error) => console.error("Error fetching auctions:", error));
  }, []);

  return (
    <div>
      {/* Carousel for featured items (AKA Priority) */}
      <div className="h-[515px] xl:h-[600px]">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 5000 }}
          modules={[Pagination, Navigation, Autoplay]}
          className="h-[515px]"
        >
          {/* TODO Optimally looped for each item for n number*/}
          <SwiperSlide>
            <CarouselImage
              to=""
              src="https://bg3.wiki/w/images/b/bc/GEM_Black_Diamond_Faded.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CarouselImage
              to=""
              src="https://bg3.wiki/w/images/a/a1/GEM_Topaz_Faded.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CarouselImage
              to=""
              src="https://bg3.wiki/w/images/d/db/Painting_Valley_with_Brook_Faded.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CarouselImage
              to=""
              src="https://bg3.wiki/w/images/f/fd/Speedy_Reply_Scimitar_Icon.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <CarouselImage
              to=""
              src="https://bg3.wiki/w/images/c/c1/Amulet_Necklace_B_Gold_A_1_Faded.png"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* Welcome banner */}
      <div className="flex flex-col align-center items-center justify-center">
        <p className="text-4xl font-black">WELCOME TO ABIDIN!</p>
        <p className="text-lg font-medium text-center mx-60 mt-8 opacity-90">
          Explore a world of exciting auctions, where you can find amazing deals
          on various items and objects. Join us and start bidding on your
          favorite items today!
        </p>
      </div>
      {/* Open listing */}
      <div className="m-4 my-24 flex flex-col items-center lg:px-8">
        <H1 text="Recent Open Listing" />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* TODO Optimally looped for each item */}
          {auctions.length > 0 ? (
            auctions.map((auction) => (
              <div
                className=""
                onClick={() => {
                  localStorage.setItem("auctId", auction.id);
                  localStorage.setItem("title", auction.title);
                }}
                key={auction.id}
              >
                <ItemCard
                  to={`/product`}
                  name={auction.title}
                  price={formatNumberWithDots(auction.startingPrice)}
                  src={auction.image}
                  status={auction.status}
                />
              </div>
            ))
          ) : (
            <p className="flex align-center items-center justify-center">
              No auctions available at the moment.
            </p>
          )}
        </div>
      </div>
      .{/* Search By Category */}
      <div className="m-4 my-4 flex flex-col items-center lg:mx-96">
        <H1 text="Search by Categories" />
        <Search />
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default homepage;
