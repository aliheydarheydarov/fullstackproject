import { createCard } from "./helpers/functions.js";

const favoritesContainer = document.querySelector(".favoritesItems");

const loadFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.length > 0) {
        createCard(favoritesContainer, favorites);
        addBasketEventListeners(); // Add event listeners after creating cards
    } else {
        let emptyMessage = document.createElement("div");
        emptyMessage.className = "emptyMessage";
        emptyMessage.innerText = "No favorite items yet.";
        favoritesContainer.appendChild(emptyMessage);
    }
};

const addBasketEventListeners = () => {
    const allAddBasketBtns = document.querySelectorAll(".addBasket");

    for (let btn of allAddBasketBtns) {
        btn.addEventListener("click", (e) => {
            if (!localStorage.getItem("accessToken")) {
                window.location.href = `login.html`;
                return;
            }
            let basket = JSON.parse(localStorage.getItem("basket")) || [];
            let obj = {
                id: e.target.getAttribute("customId"), 
                count: 1
            };
            let sum = 0;
            for (let el of basket) {
                if (el.id === obj.id) {
                    el.count += 1;
                    sum += 1;
                }
            }
            if (sum === 0) {
                basket.push(obj);
            }
            localStorage.setItem("basket", JSON.stringify(basket));
        });
    }
};

loadFavorites();
