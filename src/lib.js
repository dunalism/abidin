/* eslint-disable no-unused-vars */
import axios from "axios";

export const API_URL = "https://json-server-flax-six.vercel.app";
// export const API_URL = "http://localhost:5000";

const getUsers = () => {
  return axios.get(`${API_URL}/users`);
};

const getAuctions = () => {
  return axios.get(`${API_URL}/auctions`);
};

const placeBid = (auctionId, userId, bidAmount) => {
  return axios.post(`${API_URL}/bids`, {
    auction_id: auctionId,
    user_id: userId,
    bid_amount: bidAmount,
    bid_date: new Date().toISOString(),
  });
};

export const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
};

export function formatNumberWithDots(number) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function countdown(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  let result = "";
  const interval = setInterval(() => {
    const now = new Date().getTime();
    let timeLeft;

    // Tentukan waktu berdasarkan status
    if (now < start) {
      timeLeft = start - now;
    } else if (now < end) {
      timeLeft = end - now;
    } else {
      console.log("Auction is already closed.");
      clearInterval(interval);
      result += "Auction is already closed";
      return;
    }

    // Kalkulasi hari, jam, menit, dan detik yang tersisa
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    console.log`Closed in ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
  console.log(result);
}

const auction = {
  id: "0578",
  title: "kalag",
  description: "koaoakdk",
  startingPrice: "849847",
  startDate: "2024-09-05",
  endDate: "2024-09-19",
  status: "active",
  category: "Jewelry & Watches",
  condition: "New",
};
