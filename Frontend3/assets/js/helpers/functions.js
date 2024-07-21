// export const createCard = (parentElement, array) => {
//   array.forEach((element) => {
//     const card = document.createElement("div");
//     card.classList.add("card");

//     const cardImg = document.createElement("div");
//     cardImg.classList.add("cardImg");

//     const img = document.createElement("img");
//     img.classList.add("prodImg");
//     img.src = element.image;
//     img.alt = "";

//     cardImg.appendChild(img);

//     const cardName = document.createElement("h4");
//     cardName.classList.add("cardName");
//     cardName.textContent = `${element.title.substring(0, 10)}...`;

//     const cardDesc = document.createElement("p");
//     cardDesc.classList.add("cardDesc");
//     cardDesc.textContent = `${element.description.substring(0, 15)}...`;

//     const cardPrice = document.createElement("p");
//     cardPrice.classList.add("cardPrice");
//     cardPrice.textContent = element.price;

//     const addBasketBtn = document.createElement("button");
//     addBasketBtn.classList.add("addBasket");
//     addBasketBtn.textContent = "Add basket";
//     addBasketBtn.setAttribute("customId", element.id);

//     const addFavBtn = document.createElement("button");
//     addFavBtn.classList.add("addFav");
//     addFavBtn.textContent = "Add Fav";

//     const logo = document.createElement("h3");
//     logo.classList.add("logo");
//     logo.textContent = "Tap.az";

//     card.appendChild(cardImg);
//     card.appendChild(cardName);
//     card.appendChild(cardDesc);
//     card.appendChild(cardPrice);
//     card.appendChild(addBasketBtn);
//     card.appendChild(addFavBtn);
//     card.appendChild(logo);

//     parentElement.appendChild(card);
//   });
// };



// export const createCard = (parentElement, array) => {
    
//   array.forEach(element => {

//       let card=document.createElement("div");
//       card.className="card";


//       let cardImg=document.createElement("div");
//       cardImg.className="cardImg";
//           let prodImg=document.createElement("img");
//           prodImg.className="prodImg";
//       let cardName=document.createElement("h4");
//       cardName.className="cardName";
//       let CardDesc=document.createElement("p");
//       CardDesc.className="CardDesc";
//       let cardPrice=document.createElement("p");
//       cardPrice.className="cardPrice";
//       let addBasket=document.createElement("button");
//       addBasket.className="addBasket";
//       let addFav=document.createElement("button");
//       addFav.className="addFav";

//       card.appendChild(cardImg);
//       card.appendChild(cardName);
//       card.appendChild(CardDesc);
//       card.appendChild(cardPrice);
//       card.appendChild(addBasket);
//       card.appendChild(addFav);
//       cardImg.appendChild(prodImg);

//       prodImg.src=element.image;
//       cardName.innerText=`${element.title}`;
//       cardPrice.innerText=`${element.price}$`;
//       CardDesc.innerText=`${element.description.substring(0,30)}`
//       addBasket.innerText="Add Basket";
//       addBasket.setAttribute("customId", element.id);

//       addFav.innerText="Add Fav";

//       parentElement.appendChild(card);
      
//   });
// }

export const createCard = (parentElement, array) => {
  array.forEach(element => {
      let card = document.createElement("div");
      card.className = "card";

      let cardImg = document.createElement("div");
      cardImg.className = "cardImg";
      let prodImg = document.createElement("img");
      prodImg.className = "prodImg";
      let cardName = document.createElement("h4");
      cardName.className = "cardName";
      let CardDesc = document.createElement("p");
      CardDesc.className = "CardDesc";
      let cardPrice = document.createElement("p");
      cardPrice.className = "cardPrice";
      let addBasket = document.createElement("button");
      addBasket.className = "addBasket";
      let addFav = document.createElement("button");
      addFav.className = "addFav";

      card.appendChild(cardImg);
      card.appendChild(cardName);
      card.appendChild(CardDesc);
      card.appendChild(cardPrice);
      card.appendChild(addBasket);
      card.appendChild(addFav);
      cardImg.appendChild(prodImg);

      prodImg.src = element.image;
      cardName.innerText = `${element.title}`;
      cardPrice.innerText = `${element.price}$`;
      CardDesc.innerText = `${element.description.substring(0, 30)}`;
      addBasket.innerText = "Add Basket";
      addBasket.setAttribute("customId", element.id);

      addFav.innerText = "Add Fav";
      addFav.setAttribute("customId", element.id);

      addFav.addEventListener('click', () => {
          addToFavorites(element);
      });

      parentElement.appendChild(card);
  });
};

const addToFavorites = (item) => {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.some(favItem => favItem.id === item.id)) {
      favorites.push(item);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Item added to favorites!');
  } else {
      alert('Item is already in favorites.');
  }
};


export const createBasket = (parentElement, array) => {
  array.forEach(element => {
      let basketItem = document.createElement("div");
      basketItem.className = "basketItem";
      
      let basketImg = document.createElement("img");
      basketImg.className = "basketImg";
      basketImg.src = element.image;

      let itemDetails = document.createElement("div");
      itemDetails.className = "itemDetails";

      let namePrice = document.createElement("h3");
      namePrice.className = "namePrice";
      namePrice.innerText = `${element.title} - $${element.price}`;

      let quantity = document.createElement("div");
      quantity.className = "quantity";

      let increase = document.createElement("button");
      increase.className = "increase";
      increase.innerText = "+";

      let countOf = document.createElement("input");
      countOf.className = "countOf";
      countOf.type = "number";
      countOf.value = element.count;
      countOf.min = 1;

      let decrease = document.createElement("button");
      decrease.className = "decrease";
      decrease.innerText = "-";

      let removeItem = document.createElement("button");
      removeItem.className = "removeItem";
      removeItem.innerText = "Remove";

      quantity.appendChild(decrease);
      quantity.appendChild(countOf);
      quantity.appendChild(increase);

      itemDetails.appendChild(namePrice);
      itemDetails.appendChild(quantity);

      basketItem.appendChild(basketImg);
      basketItem.appendChild(itemDetails);
      basketItem.appendChild(removeItem);

      parentElement.appendChild(basketItem);

      increase.addEventListener('click', () => {
          countOf.value = parseInt(countOf.value) + 1;
          element.count = countOf.value;
          updateLocalStorage(element.id, element.count);
          updateTotalPrice();
      });

      decrease.addEventListener('click', () => {
          if (countOf.value > 1) {
              countOf.value = parseInt(countOf.value) - 1;
              element.count = countOf.value;
              updateLocalStorage(element.id, element.count);
              updateTotalPrice();
          }
      });

      removeItem.addEventListener('click', () => {
          parentElement.removeChild(basketItem);
          array.splice(array.indexOf(element), 1);
          removeFromLocalStorage(element.id);
          updateTotalPrice();
      });
  });
};

const updateLocalStorage = (id, count) => {
  let basketItems = JSON.parse(localStorage.getItem('basket')) || [];
  let item = basketItems.find(item => item.id === id);
  if (item) {
      item.count = count;
  }
  localStorage.setItem('basket', JSON.stringify(basketItems));
};

const removeFromLocalStorage = (id) => {
  let basketItems = JSON.parse(localStorage.getItem('basket')) || [];
  basketItems = basketItems.filter(item => item.id !== id);
  localStorage.setItem('basket', JSON.stringify(basketItems));
};

export const updateTotalPrice = () => {
  let totalPrice = 0;
  document.querySelectorAll('.basketItem').forEach(item => {
      const price = parseFloat(item.querySelector('.namePrice').innerText.split(' - $')[1]);
      const qty = parseInt(item.querySelector('.countOf').value);
      totalPrice += price * qty;
  });
  document.getElementById('totalPrice').innerText = `$${totalPrice.toFixed(2)}`;
};
