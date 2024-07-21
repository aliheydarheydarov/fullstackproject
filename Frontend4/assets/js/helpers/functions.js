import { verifyToken } from './../script.js';


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
    addBasket.innerText = "Add to Basket";
    addBasket.setAttribute("customId", element.id);

    addFav.innerText = "Add to Favorites";
    addFav.setAttribute("customId", element.id);

    addFav.addEventListener('click', () => {
        addToFavorites(element);
    });

    addBasket.addEventListener('click', () => {
        addToBasket(element.id);
    });

    parentElement.appendChild(card);
  });
};

const addToBasket = async (productId) => {
  
  try {
    const { userId } = await verifyToken(localStorage.getItem('accessToken'));

    
    const response = await fetch('http://localhost:3000/baskets/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId, 
        product_id: productId,
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add to basket');
    }

    alert('Product added to basket successfully');

  } catch (error) {
    console.error('Error adding to basket:', error);
  }
};


const addToFavorites = (item) => {
  if (!localStorage.getItem("accessToken")) {
    window.location.href = `login.html`;
    return;}
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

    increase.addEventListener('click', async () => {
      countOf.value = parseInt(countOf.value) + 1;
      element.count = countOf.value;
      await updateBasket(element.id, element.count);
      updateTotalPrice();
    });

    decrease.addEventListener('click', async () => {
      if (countOf.value > 1) {
        countOf.value = parseInt(countOf.value) - 1;
        element.count = countOf.value;
        await updateBasket(element.id, element.count);
        updateTotalPrice();
      }
    });

    countOf.addEventListener('input', async () => {
      const newCount = parseInt(countOf.value);
      if (newCount >= 1) {
        element.count = newCount;
        await updateBasket(element.id, newCount);
        updateTotalPrice();
      } else {
        countOf.value = element.count; // Revert to previous valid count
      }

    });

    removeItem.addEventListener('click', async () => {
      parentElement.removeChild(basketItem);
      array.splice(array.indexOf(element), 1);
      await removeFromBasket(element.id);
      updateTotalPrice();
    });
  });
};





// const updateLocalStorage = (id, count) => {
//   let basketItems = JSON.parse(localStorage.getItem('basket')) || [];
//   console.log(JSON.parse(localStorage.getItem('basket')) );
//   let item = basketItems.find(item => item.id === id);
//   if (item) {
//       item.count = count;
//   }
//   localStorage.setItem('basket', JSON.stringify(basketItems));
// };


const updateBasket = async (productId, count) => {
  try {
    const { userId } = await verifyToken(localStorage.getItem('accessToken'));

    const response = await fetch('http://localhost:3000/baskets/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        product_id: productId,
        quantity: count
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update basket');
    }

    console.log('Basket updated successfully');

  } catch (error) {
    console.error('Error updating basket:', error);
  }
};



const removeFromBasket = async (productId) => {
  try {
    const { userId } = await verifyToken(localStorage.getItem('accessToken'));

    const response = await fetch(`http://localhost:3000/baskets/${userId}/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to remove item from basket');
    }

    console.log('Item removed from basket successfully');

  } catch (error) {
    console.error('Error removing item from basket:', error);
  }
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
