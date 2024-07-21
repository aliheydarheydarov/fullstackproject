

import {verifyToken} from "./script.js"

import { getData } from "./api/api.js";
import { createBasket, updateTotalPrice } from "./helpers/functions.js";

const basketContainer = document.querySelector(".basketItems");


getData().then(async (data) => {
    let basketData = [];
    try {
      const { userId } = await verifyToken(localStorage.getItem('accessToken'));
  
      const response = await fetch(`http://localhost:3000/baskets/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch basket');
      }
  
      basketData = await response.json();
  
    } catch (error) {
      console.error('Error fetching basket:', error);
    }
  
    const transformedArray = basketData.map(item => ({
      id: item.product_id,
      count: item.quantity
    }));
  
    console.log(transformedArray);
  
    let basketItems = transformedArray || [];
    let newData = [];
  
    if (basketItems.length > 0) {
      basketItems.forEach(basketItem => {
        let item = data.find(el => el.id === basketItem.id);
        if (item) {
          item.count = basketItem.count;
          newData.push(item);
        }
      });
      createBasket(basketContainer, newData);
      updateTotalPrice();
    } else {
      let emptyBasket = document.createElement("div");
      emptyBasket.className = "emptyBasket";
      emptyBasket.innerText = "The basket is empty";
      basketContainer.appendChild(emptyBasket);
    }
  }).catch(error => {
    console.error('Error fetching data:', error);
  });
  