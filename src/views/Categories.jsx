// Categories.jsx
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

import { Search } from "./homepage";

// eslint-disable-next-line react-refresh/only-export-components
export function encodeCategory(category) {
  return category.replace(/ /g, "%20").replace(/&/g, "%26");
}

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      img: "https://images.stockcake.com/public/a/9/d/a9dd0298-c389-4c57-8b46-bbd86a9e9930/smart-home-devices-stockcake.jpg",
    },
    {
      id: 2,
      name: "Fashion & Accessories",
      img: "https://images.stockcake.com/public/d/2/b/d2ba489a-405e-4b1a-8c15-7f2faa4ed143_large/fashion-runway-models-stockcake.jpg",
    },
    {
      id: 3,
      name: "Automotive",
      img: "https://images.stockcake.com/public/9/e/5/9e5c3d02-a6a3-461c-8362-66ca3f4851b4_large/automotive-production-line-stockcake.jpg",
    },
    {
      id: 4,
      name: "Jewelry & Watches",
      img: "https://images.stockcake.com/public/0/c/f/0cf94cf7-d326-4acd-9117-df66ebb5dc4d_large/elegant-emerald-jewelry-stockcake.jpg",
    },
    {
      id: 5,
      name: "Art & Antiques",
      img: "https://images.stockcake.com/public/4/2/f/42f01c38-f980-4c94-a97f-668cf0f37627_large/mosaic-peacock-table-stockcake.jpg",
    },
    {
      id: 6,
      name: "Real Estate",
      img: "https://images.stockcake.com/public/7/2/8/72849d05-c7e1-46d4-96ca-202e962baad2_large/urban-real-estate-stockcake.jpg",
    },
    {
      id: 7,
      name: "Collectibles",
      img: "https://images.stockcake.com/public/d/3/f/d3f7c2d7-478e-4900-901b-6444ccf7f096_large/collector-s-toy-display-stockcake.jpg",
    },
    {
      id: 8,
      name: "Sports & Hobbies",
      img: "https://images.stockcake.com/public/1/8/3/1830f5a0-f9a7-46f6-9983-fc8119358205_large/arcade-night-life-stockcake.jpg",
    },
    {
      id: 9,
      name: "Others",
      img: "https://images.stockcake.com/public/0/8/3/08383e99-b0f2-491f-9fc6-6473fe3b3e05_large/illuminated-light-bulb-stockcake.jpg",
    },
  ];

  // Contoh penggunaan:
  // const string = "Real Estate";
  // const string2 = "Sports & Hobbies";
  // const string3 = "Electronics";

  // console.log(encodeCategory(string)); // Output: "Real%20Estate"
  // console.log(encodeCategory(string2)); // Output: "Sports%20%26%20Hobbies"
  // console.log(encodeCategory(string3)); // Output: "Electronics"
  // const navigate = useNavigate();

  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-12 mt-4">
        <h2 className="text-2xl font-black text-center mb-6">Categories</h2>
        <Search />
      </div>
      <div className="flex flex-col gap-3 items-center">
        <div className="grid grid-cols-3 gap-20 max-md:grid-cols-1">
          {categories.map((category) => (
            <Card
              key={category.id}
              isFooterBlurred
              className="w-full h-[300px] bg-[#F8F8F0] shadow-lg"
            >
              <CardBody>
                <Image
                  width={300}
                  height={275}
                  src={category.img}
                  fallbackSrc="https://via.placeholder.com/300x200"
                  alt={category.name}
                  className="object-cover"
                />
              </CardBody>
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100 flex justify-between items-center p-2">
                <div>
                  <p className="text-tiny font-bold text-white/60">
                    {category.name}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    localStorage.setItem(
                      "category",
                      encodeCategory(category.name)
                    );
                    navigate("/categories/list");
                  }}
                  size="sm"
                  radius="full"
                >
                  View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
