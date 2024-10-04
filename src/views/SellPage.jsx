import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Input,
  Textarea,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { InputIcon, CalendarIcon } from "../assets/Icons";
import { Toaster, toast } from "sonner";
import { NumericFormat } from "react-number-format";
import baseURL from "../lib-axios/baseUrl";

const SellPage = () => {
  const isLogged = localStorage.getItem("logged");
  //states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState(null);
  const [userId, setUserId] = useState("");
  const [seller, setSeller] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState("others");
  const [condition, setCondition] = useState("New");

  // fungsi untuk input harga

  const logId = localStorage.getItem("logged");

  const getUser = async () => {
    try {
      const response = await axios.get(`${baseURL}/users?email=${logId}`);
      if (response.data.length > 0) {
        setUserId(response.data[0].id);
        setSeller(response.data[0].fullname);
        console.log("response.data", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Membuat objek data lelang
    const newAuction = {
      title,
      userId,
      seller,
      description,
      startingPrice, // fungsi clean dimasukin sebagai nilai properti
      startDate,
      endDate,
      status,
      category,
      condition,
      image:
        "https://images.stockcake.com/public/0/7/1/0719c94d-4777-4030-9769-37f295ff3ff7/candlelight-serene-ambiance-stockcake.jpg",
    };

    axios
      .post(`${baseURL}/auctions`, newAuction)
      .then((response) => {
        console.log("Auction created successfully!", response.data);

        // Menampilkan toast sukses
        toast.success("Successfully Created!!");

        setTitle("");
        setDescription("");
        setStartingPrice("");
        setStartDate("");
        setEndDate("");
      })
      .catch((error) => {
        console.error("There was an error creating the auction!", error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  //debug
  console.log("userId", userId);
  console.log("seller", seller);

  return isLogged ? (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster position="top-right" richColors /> {/* Menambahkan Toaster */}
      <div className="max-w-lg w-full p-10 shadow-lg rounded-lg shadow-blue-500">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create New Auction
        </h2>

        <form onSubmit={handleSubmit}>
          {/* User ID Dropdown */}
          <div className="mb-4">
            <input readOnly className="hidden" value={userId}></input>
          </div>
          <div className="mb-4">
            <input readOnly className="hidden" value={seller}></input>
          </div>
          {/* Title */}
          <div className="mb-4">
            <Input
              isRequired
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Auction Title"
              labelPlacement="outside"
              startContent={<InputIcon className="text-2xl text-default-400" />}
              size="lg"
              radius="lg"
            />
          </div>
          {/* Description */}
          <div className="mb-4">
            <Textarea
              isRequired
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your description"
              labelPlacement="outside"
              size="lg"
              radius="lg"
            />
          </div>
          {/* Starting Price */}
          {/* <div className="mb-4">
            <Input
              isRequired
              label="Starting Price"
              value={startingPrice}
              type="number"
              //tipe data harus nummber!!!
              onChange={(e) => setStartingPrice(e.target.value)}
              labelPlacement="outside"
              startContent={<div className="text-default-400">Rp</div>}
              size="lg"
              radius="lg"
            />
          </div> */}
          <div className="mb-4">
            <NumericFormat
              value={startingPrice}
              thousandSeparator=","
              decimalSeparator="."
              onValueChange={(values) => {
                setStartingPrice(values.value); // Mengatur nilai tanpa format ke dalam state
              }}
              placeholder="Initial Price"
              allowNegative={false}
              isNumericString
              customInput={Input}
              isRequired
              label="Initial Price"
              labelPlacement="outside"
              startContent={<div className="text-default-400">Rp</div>}
              size="lg"
              radius="lg"
              inputMode="numeric"
            />
          </div>
          {/* Start Date */}
          <div className="mb-4">
            <Input
              isRequired
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              labelPlacement="outside"
              startContent={
                <CalendarIcon className="text-2xl text-default-400" />
              }
              size="lg"
              radius="lg"
            />
          </div>
          {/* End Date */}
          <div className="mb-4">
            <Input
              isRequired
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              labelPlacement="outside"
              startContent={
                <CalendarIcon className="text-2xl text-default-400" />
              }
              size="lg"
              radius="lg"
            />
          </div>
          {/* Status Dropdown */}
          <div className="mb-4 hidden">
            <label>Status</label>
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button variant="bordered" className="w-full text-left">
                  {status}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Status Options"
                onAction={(key) => setStatus(key)}
              >
                <DropdownItem key="active">Active</DropdownItem>
                <DropdownItem key="inactive">Inactive</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          {/* Category Dropdown */}
          <div className="mb-4">
            <label>Category</label>
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button variant="bordered" className="w-full text-left">
                  {category}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Category Options"
                onAction={(key) => setCategory(key)}
              >
                <DropdownItem key="Electronics">Electronics</DropdownItem>
                <DropdownItem key="Fashion & Accessories">
                  Fashion & Accessories
                </DropdownItem>
                <DropdownItem key="Automotive">Automotive</DropdownItem>
                <DropdownItem key="Jewelry & Watches">
                  Jewelry & Watches
                </DropdownItem>
                <DropdownItem key="Real Estate">Real Estate</DropdownItem>
                <DropdownItem key="Home & Furniture">
                  Home & Furniture
                </DropdownItem>
                <DropdownItem key="Others">Others</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Condition Dropdown */}
          <div className="mb-4">
            <label>Condition</label>
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button variant="bordered" className="w-full text-left">
                  {condition}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Condition Options"
                onAction={(key) => setCondition(key)}
              >
                <DropdownItem key="New">New</DropdownItem>
                <DropdownItem key="Used">Used</DropdownItem>
                <DropdownItem key="Like New">Like New</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          {/* Checkbox Tidak diperlukan*/}
          {/* <div className="flex flex-col gap-2 mb-4">
            <Checkbox
              isSelected={isSelected}
              onChange={() => {
                setIsSelected(!isSelected);
                setIsCheckboxError(false); // reset error saat checkbox diubah
              }}
              // jika error, jadi border merah
              style={{
                borderColor: isCheckboxError ? "red" : "",
                color: isCheckboxError ? "red" : "",
              }}
            >
              Syarat dan Ketentuan
            </Checkbox>
            {isCheckboxError && ( // tambah argumen lagi
              <p className="text-red-500 text-sm">Setujui S&K!!</p>
            )}
          </div> */}
          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            color="primary"
            variant="shadow"
          >
            Create Auction
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-row items-start gap-12">
        <div className="p-6 bg-white text-center shadow-lg rounded-lg self-center dark:bg-transparent dark:border-blue-900/85 dark:border-5 dark:shadow-xl">
          <h1 className="mb-4 text-3xl font-bold">
            Find someone who appreciates your{" "}
            <span className="text-blue-500">Unique Item</span>
          </h1>
          <p className="text-md">
            ABIDIN is your gateway to extraordinary items and discerning buyers.
          </p>
          <button className="mt-6 bg-blue-500 text-white px-4 py-2 text-md rounded-md">
            <Link to="/register" className="text-white">
              Start Selling
            </Link>
          </button>
        </div>

        {/* grid */}
        <div className="grid grid-cols-2 gap-6 w-[700px]">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src="https://images.stockcake.com/public/6/f/9/6f99237d-66a3-465a-b6c4-c38a2aafdbf3_large/luxurious-gold-smartphone-stockcake.jpg"
              alt="Item 1"
              className="w-full h-[250px] object-cover"
            />
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src="https://images.stockcake.com/public/3/e/d/3ed300aa-51a2-47c7-888d-e8017699d300_large/elegant-gold-necklace-stockcake.jpg"
              alt="Item 2"
              className="w-full h-[250px] object-cover"
            />
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src="https://images.stockcake.com/public/6/9/e/69e2a16e-f614-4b8a-a8b7-bd5a24add630_large/elegant-venetian-mask-stockcake.jpg"
              alt="Item 3"
              className="w-full h-[250px] object-cover"
            />
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img
              src="https://images.stockcake.com/public/0/4/c/04ca92f0-e14d-4c50-b723-8dcd59ecbfd9_large/elegant-perfume-bottle-stockcake.jpg"
              alt="Item 4"
              className="w-full h-[250px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
