import axios from "axios";
import { useEffect, useState } from "react";
import { formatNumberWithDots } from "../lib";
import ItemCardSecond from "../components/ItemCardSecond";
import baseURL from "../lib-axios/baseUrl";
// import { ItemCard } from "./homepage";
export const responsiveItem =
  "gap-4 grid grid-cols-4 max-[1227px]:grid-cols-3 max-[1087px]:grid-cols-2 max-[867px]:grid-cols-1";

const ListPage = () => {
  const [auctions, setAuctions] = useState([]);

  const getAuctions = async () => {
    try {
      const response = await axios.get(`${baseURL}/auctions`);
      setAuctions(response.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  // const navigate = useNavigate();

  useEffect(() => {
    getAuctions();
  }, []);

  // const handleCardClick = (auctionId) => {
  //   console.log("Card clicked with auctionId:", auctionId);
  //   // Anda bisa melakukan hal lain dengan auctionId di sini
  // };

  console.log("auctions", auctions);

  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-2xl font-bold text-center mb-6">Product List</h2>
      {/* <div className="grid grid-cols-3 gap-20"> */}
      <div className={responsiveItem}>
        {auctions.map((auction) => (
          <div
            className=""
            onClick={() => {
              localStorage.setItem("auctId", auction.id);
              localStorage.setItem("title", auction.title);
            }}
            key={auction.id}
          >
            <ItemCardSecond
              to={`/product`}
              name={auction.title}
              price={formatNumberWithDots(auction.startingPrice)}
              src={auction.image}
              status={auction.status}
            />
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

ListPage.propTypes = {};

export default ListPage;
