import { Avatar, Button, Divider, Image, Input } from "@nextui-org/react";
import {
  CarbonFavorite,
  CarbonFavoriteFilled,
  ClarityEditSolid,
  IcBaselineDelete,
  SolarUserLinear,
} from "../assets/Icons";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatNumberWithDots, formatRupiah } from "../lib";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import EditProduct from "../components/EditProduct";
import { encodeCategory } from "./Categories";
import { toast, ToastContainer } from "react-toastify";
import { NumericFormat } from "react-number-format";
import baseURL from "../lib-axios/baseUrl";

const AddWatchlist = ({ watch }) => {
  //states
  const [watchItem, setWatchItem] = useState([]);
  const isWatch = watchItem.length;
  const [isSelected, setIsSelected] = useState(1);
  // console.log("isSelected", isSelected);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  // alert(isWatch);

  const getWatchItem = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/watchlist?userId=${watch.userId}&id=${watch.id}`
      );
      setWatchItem(response.data);
      // console.log("response.data", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addWatch = async (data) => {
    try {
      await axios.post(`${baseURL}/watchlist`, data);
      getWatchItem();
    } catch (error) {
      console.log(error);
    }
  };

  const delWatch = async (data) => {
    try {
      const response = await axios.delete(
        `${baseURL}/watchlist/${watch.id}`,
        data
      );
      getWatchItem();
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddWatchList = () => {
    if (isSelected) {
      setIsSelected(!isSelected);
    }
    if (isWatch) {
      delWatch();
    } else {
      addWatch(watch);
    }
  };

  useEffect(() => {
    getWatchItem();
  }, []);

  console.log("isWatch", isWatch);
  console.log("isSelected", isSelected);
  console.log("watch.id", watch.id);
  console.log("watch.userId", watch.userId);

  return (
    <div
      onClick={() => handleAddWatchList()}
      className="flex flex-col gap-2 cursor-pointer"
    >
      {isWatch ? (
        <CarbonFavoriteFilled className="text-4xl text-red-600" />
      ) : (
        <CarbonFavorite className="text-4xl" />
      )}
    </div>
  );
};

function BidHistory({ bids, className }) {
  return (
    <div className={`m-2 flex flex-col gap-3 ${className}`}>
      <p className="font-semibold text-xl ">Bid History</p>
      <ul className="">
        {bids.length === 0 ? (
          <p>No bids yet</p>
        ) : (
          bids.map((item) => {
            return (
              <div
                key={item.bid}
                className="flex gap-7 my-1 max-[1193px]:gap-12"
              >
                <li key={item.bidder}> {item.bidder} </li>
                <li key={item.date}> {item.date} </li>
                <li key={item.bid}> {item.bid} </li>
              </div>
            );
          })
        )}
      </ul>
    </div>
  );
}

BidHistory.propTypes = {
  bids: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
};

AddWatchlist.propTypes = {
  watch: PropTypes.object.isRequired,
};

//perlu diperbaiki
const AuctionCountdown = ({ product }) => {
  const [countdown, setCountdown] = useState("");
  const startDate = product.startDate;
  const endDate = product.endDate;

  useEffect(() => {
    // time countdown
    const calculateTimeLeft = () => {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      const now = new Date().getTime();
      let timeLeft;

      if (now < start) {
        timeLeft = start - now;
      } else if (now < end) {
        timeLeft = end - now;
      } else {
        setCountdown("Auction is already closed.");
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown(`Closed in ${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateTimeLeft();

    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  return <p className="text-sm">{countdown}</p>;
};

AuctionCountdown.propTypes = {
  product: PropTypes.object,
};

const Product = () => {
  //states
  const [product, setProduct] = useState({});
  const [isLogged, setisLogged] = useState([]);
  const [bids, setBids] = useState([]);
  const [user, setUser] = useState([]);
  //variables
  const logged = isLogged.length;
  const thereisUser = user.length;
  const logId = localStorage.getItem("logged");
  const auctId = localStorage.getItem("auctId");
  const title = localStorage.getItem("title");
  const userId = localStorage.getItem("userId");
  const now = new Date().toISOString().slice(0, 10);
  const currentBid = product.startingPrice;
  const upBid = formatNumberWithDots(currentBid + 1000);
  const auctBid = bids.filter((bid) => bid.id === auctId);
  const navigate = useNavigate();
  const inActiveAuction =
    product.status === "Closed Auction" || product.status == "No winning bid";
  let winningBid;

  if (auctBid.length > 0) {
    const i = auctBid.length - 1;
    winningBid = auctBid[i].userId === userId && inActiveAuction;
  }

  const handleUnlogin = () => {
    toast.error("You are not logged in, please login");
    navigate("/login");
  };

  // Zod validator
  const addBidSchema = z.object({
    bidAmount: z.preprocess(
      (val) => {
        if (val === "") return undefined; // Jika input kosong, kembalikan undefined
        const numberValue = Number(val.toString().replace(/,/g, "")); // Hapus pemisah ribuan dan konversi ke number
        return isNaN(numberValue) ? undefined : numberValue; // Kembalikan undefined jika hasilnya NaN
      },
      z
        .number()
        .min(100, "Fill in at least three numbers!")
        .refine((val) => val > currentBid, {
          message: "The bid must be greater than current bid!",
        })
    ),
    // bidAmount: z.preprocess(
    //   (val) => Number(val),
    //   z
    //     .number()
    //     .min(100, "Isi minimal tiga angka!")
    //     .refine((val) => val > currentBid, {
    //       message: "Bid harus lebih besar dari penawaran saat ini!",
    //     })
    // ),
    id: z.string(),
    title: z.string(),
    userId: z.string(),
    bidDate: z.string(),
  });

  console.log(`auctId ${auctId}`);
  // console.log("isUser", isUser);
  // console.log("userId", user.id);

  const getProduct = async () => {
    try {
      const response = await axios.get(`${baseURL}/auctions/${auctId}`);
      setProduct(response.data);
      console.log("response.data.product", response);
      localStorage.setItem("category", encodeCategory(response.data.category));
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${baseURL}/users?email=${logId}`);
      if (response.data.length > 0) {
        setUser(response.data);
        // localStorage.setItem("userId", response.data[0].id);
        console.log("response.data", response.data);
      }
      // console.log("response", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLogged = async () => {
    try {
      const response = await axios.get(`${baseURL}/logged`);
      setisLogged(response.data);
      if (response.data.length > 0) {
        // localStorage.setItem("logged", response.data[0].password);
      } else {
        // localStorage.removeItem("logged");
      }
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const closeBid = async () => {
    const close = {
      id: auctId,
      title: product.title,
      description: product.description,
      startingPrice: product.startingPrice,
      startDate: "2000-09-20",
      endDate: "2000-09-23",
      condition: product.condition,
      category: product.category,
      status: `${auctBid ? "Closed Auction" : "No winning bid"}`,
      userId: product.userId,
      image: product.image,
    };
    try {
      const response = await axios.put(`${baseURL}/auctions/${auctId}`, close);
      getProduct();
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const addBid = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/bids`, data);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm({
    defaultValues: {
      id: auctId,
      title: title,
      userId: userId,
      bidAmount: "",
      bidDate: now,
    },
    resolver: zodResolver(addBidSchema),
  });

  const bidAmount = Number(form.getValues("bidAmount"));

  //glitch? dont comment this!
  console.log("form", form.watch());
  console.log(bidAmount);

  const updateBid = async () => {
    const update = {
      id: auctId,
      title: product.title,
      description: product.description,
      startingPrice: Number(
        form.getValues("bidAmount").toString().replace(/,/g, "")
      ),
      startDate: product.startDate,
      endDate: product.endDate,
      condition: product.condition,
      category: product.category,
      status: product.status,
      userId: product.userId,
      image: product.image,
    };
    try {
      const response = await axios.put(`${baseURL}/auctions/${auctId}`, update);
      getProduct();
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleaddBid = (data) => {
    updateBid();
    addBid(data);
    form.resetField("bidAmount");
    setTimeout(() => toast.success("Bid Added!"), 250);
  };

  const addBills = async () => {
    try {
      const i = auctBid.length - 1;
      const pay = {
        id: auctBid[i].userId,
        bidAmount: auctBid[i].bidAmount,
        title: title,
        auctId: auctBid[i].id,
        bidDate: auctBid[i].bidDate,
        paymentDate: undefined,
      };
      const response = await axios.post(`${baseURL}/bills`, pay);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCloseBid = () => {
    if (auctBid.length > 0) {
      const cnfrm = confirm("Are you sure?");
      if (cnfrm) {
        addBills();
        closeBid();
        setTimeout(() => toast.success("Bid closed successfully!"), 250);
      } else {
        toast.error("Bid close canceled");
      }
    } else {
      const cnfrm = confirm(
        "No bids have been placed, the auction will be deactivated"
      );
      if (cnfrm) {
        closeBid();
        setTimeout(() => toast.success("Auction closed without bids"), 250);
      } else {
        toast.error("Auction deactivation canceled");
      }
    }
  };

  console.log("logged", logged);
  const userWatch =
    logged && thereisUser
      ? {
          id: auctId,
          title: product.title,
          description: product.description,
          startingPrice: product.startingPrice,
          startDate: product.startDate,
          endDate: product.endDate,
          condition: product.condition,
          category: product.category,
          status: product.status,
          userId: user[0].id,
          image: product.image,
        }
      : undefined;

  const getBids = async () => {
    try {
      const response = await axios.get(`${baseURL}/bids/`);
      setBids(response.data);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProduct();
    getUser();
    getLogged();
    getBids();
    if (winningBid) {
      setTimeout(
        () =>
          toast.success(
            `You've won the auction! Please check the dashboard for further information.`
          ),
        500
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winningBid]);

  //debug
  console.log("bids", bids);
  console.log("auctBid", auctBid);
  console.log("winningBid", winningBid);
  console.log("userId", userId);
  // console.log("inActiveAuction", inActiveAuction);
  // console.log("thereisUser", thereisUser);

  //sementara
  const handleDeleteAuction = async () => {
    const cnfrm = confirm("Are you sure you want to delete this auction?");
    if (cnfrm) {
      try {
        await axios.delete(`${baseURL}/auctions/${auctId}`);
        alert("Auction deleted successfully");
        navigate("/list");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete auction");
      }
    }
  };

  return (
    <div className="flex flex-col">
      <ToastContainer />
      {/* product section */}
      <section className="flex mb-1 max-[1192px]:flex-col lg:flex-wrap gap-3 justify-center min-[1193px]:justify-between ">
        {/* image */}
        <div className="h-[28rem] w-[28rem] overflow-hidden flex items-center justify-center border-medium max-[1192px]:w-full mr-1 max-2xl:grow">
          {/* <img className="overflow-hidden" src={product.image} alt="gambar" /> */}
          <Image
            // className="overflow-hidden"
            // height="70vh"
            // classNames={{ base: "overflow-hidden" }}
            src={product.image}
            alt={product.title}
          />
        </div>

        {/*sub section: bid */}
        <div className="flex  max-[729px]:flex-wrap gap-2 max-[774px]:flex-col max-[774px]:items-center grow">
          {/* Bid details */}
          {/* conditional component: isLogged? */}
          {logged && thereisUser ? (
            //logged component
            <div className="p-2 flex flex-col justify-between w-full mb-3 bg-gradient-to-r from-transparent  rounded">
              <title className="prose dark:prose-invert max-w-full max-[774px]:mb-3 flex justify-between ">
                <h2 id="productTitle">{product.title}</h2>
                {/* conditional component: seller or bidder? */}
                {user[0].id === product.userId ? (
                  <div className="mb-5 flex gap-5 items-center">
                    <IcBaselineDelete
                      className="text-4xl cursor-pointer"
                      onClick={() => handleDeleteAuction()}
                    />
                    <ClarityEditSolid
                      onClick={() => {
                        const modal = document.getElementById("editmodal");
                        modal.click();
                      }}
                      className="text-3xl cursor-pointer"
                    />
                  </div>
                ) : (
                  <AddWatchlist watch={userWatch} />
                )}
              </title>
              {/* bid box */}
              <div className="mb-3 bg-gradient-to-r from-transparent  rounded">
                <div className="min-[1193px]:mt-[-4rem] flex justify-between">
                  <div>
                    <p className="text-xs font-mono text-slate-500">
                      {`${inActiveAuction ? "FINAL BID" : "CURRENT BID"}`}
                    </p>
                    <br />
                    <p className="text-2xl font-semibold mb-1 ">
                      {formatRupiah(product.startingPrice)}
                    </p>
                    <AuctionCountdown product={product} />
                  </div>
                  <div className="flex flex-col gap-6 items-end">
                    <Link
                      to={`/categories/list`}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-1 rounded text-xs transition duration-200"
                    >
                      {product.category}
                    </Link>
                    <p>{product.condition}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3 mt-8 ">
                  <Avatar
                    onClick={() => navigate("/dashboard")}
                    showFallback
                    fallback={
                      <SolarUserLinear className="text-2xl cursor-pointer " />
                    }
                  />
                  <p>{product.seller}</p>
                </div>
                <Divider />
              </div>
              {/* conditional component: seller or bidder? */}
              {user[0].id === product.userId ? (
                <Button
                  isDisabled={`${inActiveAuction ? "true" : ""}`}
                  onClick={() => handleCloseBid()}
                  color="primary"
                >
                  Close bid
                </Button>
              ) : //conditional component: Closed Auction?
              inActiveAuction ? (
                <div>
                  {/* <div>{product.status}</div>

                  {winningBid
                    ? "Congratulation! You're bid winner, please check the dashboard for further information"
                    : ""} */}
                </div>
              ) : (
                <form
                  onSubmit={form.handleSubmit(handleaddBid)}
                  className="flex flex-col gap-3 w-full"
                >
                  {/* willbeedit */}
                  <Controller
                    name="bidAmount"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <NumericFormat
                        {...field}
                        inputMode="numeric"
                        thousandSeparator=","
                        decimalSeparator="."
                        placeholder={`${upBid} or more`}
                        allowNegative={false}
                        isNumericString
                        customInput={Input}
                        onValueChange={(values) => {
                          // Mengatur nilai tanpa format ke dalam state sebagai number
                          const numericValue = values.value
                            ? Number(values.value)
                            : undefined;
                          field.onChange(numericValue);
                        }}
                        startContent={
                          <div className="text-sm text-gray-500">Rp</div>
                        }
                        size="lg"
                        radius="lg"
                        isInvalid={Boolean(fieldState.error)}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />

                  <Button color="primary" type="submit">
                    Place Bid
                  </Button>
                </form>
              )}
              <EditProduct />
            </div>
          ) : (
            //unlogged component
            <div className="p-2 flex flex-col justify-between w-full bg-gradient-to-r from-transparent rounded ">
              <title className="prose dark:prose-invert max-w-full max-[774px]:mb-3 flex justify-between ">
                <h2>{product.title}</h2>
                <div
                  onClick={() => handleUnlogin()}
                  className="flex flex-col gap-2 cursor-pointer"
                >
                  <CarbonFavorite className="text-4xl" />
                </div>
              </title>

              {/* bid box */}
              <div className="mb-3">
                <div className="min-[1193px]:mt-[-4rem] flex justify-between">
                  <div>
                    <p className="text-xs font-mono text-slate-500">
                      {`${inActiveAuction ? "FINAL BID" : "CURRENT BID"}`}
                    </p>
                    <p className="text-2xl font-semibold mb-1 ">
                      {formatRupiah(product.startingPrice)}
                    </p>
                    <AuctionCountdown product={product} />
                  </div>
                  <div className="flex flex-col gap-4 items-end">
                    <Link
                      to={`/categories/list`}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-1 rounded text-xs transition duration-200"
                    >
                      {product.category}
                    </Link>
                    <p>{product.condition}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3 mt-8">
                  <Avatar
                    showFallback
                    fallback={<SolarUserLinear className="text-2xl" />}
                  />
                  <p>{product.seller}</p>
                </div>
                <Divider />
              </div>
              {/* willbeedit */}
              {inActiveAuction ? (
                <div></div>
              ) : (
                <div className="flex flex-col gap-3 w-full">
                  <NumericFormat
                    inputMode="numeric"
                    thousandSeparator=","
                    decimalSeparator="."
                    placeholder={`${upBid} or more`}
                    allowNegative={false}
                    isNumericString
                    customInput={Input}
                    startContent={
                      <div className="text-sm text-gray-500">Rp</div>
                    }
                  />
                  <Button onClick={() => handleUnlogin()} color="primary">
                    Place Bid
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Bid history */}
        </div>
      </section>
      {/* description */}
      <section className=" mt-14 prose dark:prose-invert min-w-full p-2 bg-gradient-to-r from-transparent rounded">
        <h2>About this item</h2>
        <p id="productDescription">{product.description}</p>
      </section>{" "}
    </div>
  );
};

export default Product;
