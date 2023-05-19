import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BASE_URL = "https://joyous-pink-catfish.cyclic.app/";

let TOKEN = "";
if (typeof window !== "undefined") {
  if (JSON.parse(localStorage.getItem("persist:root"))) {
    if (
      JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user != null)
    ) {
      if (
        JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
          .currentUser
      ) {
        TOKEN = JSON.parse(
          JSON.parse(localStorage.getItem("persist:root")).user
        ).currentUser.accessToken;
      }
    }
  } else {
    TOKEN = "";
  }
}

// console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
