import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemCard } from "./homepage";
import baseURL from "../lib-axios/baseUrl";

export default function SearchCategory() {
  const { keyword } = useParams();
  const [filteredItems, setFilteredItems] = useState([]);

  // Filter auctions based on the URL params (item category only)
  useEffect(() => {
    fetch(`${baseURL}/auctions`) // TODO CHANGE LATER
      .then((response) => response.json())
      .then((data) => {
        const filtered = data.filter(
          (auction) => auction.category.toLowerCase() === keyword.toLowerCase()
        );
        setFilteredItems(filtered);
        console.log(filtered);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }, [keyword]);

  return (
    <div>
      <div className="">
        <p className="mt-8 font-bold text-xl">Category result for: {keyword}</p>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {console.log(filteredItems)}
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              to={`/product`}
              src={item.image}
              name={item.title}
              price={item.startingPrice}
            />
          ))
        ) : (
          <p>No items found in this category.</p>
        )}
      </div>
    </div>
  );
}
