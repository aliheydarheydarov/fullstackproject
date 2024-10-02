import { getData } from "./api/api.js";
import { createCard } from "./helpers/functions.js";
const users = document.querySelector(".users");
// let basket = JSON.parse(localStorage.getItem("basket")) || [];

// console.log(user, "user");

axios
  .get("http://localhost:3000/users/", {
    headers: {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("accessToken")
      )} ${JSON.parse(localStorage.getItem("refreshToken"))}`,
    },
  })
  .then((res) => {
    console.log(res.data, "res");

    res.data.forEach((user) => {
      const li = document.createElement("li");

      li.innerText = user.name;

      users.appendChild(li);
    });
  });
