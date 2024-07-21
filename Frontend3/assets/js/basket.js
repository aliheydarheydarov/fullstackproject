// import { getData } from "./api/api.js";
// import { createCard } from "./helpers/functions.js";

// const basketContainer = document.querySelector(".basketContainer");
// let basketArr = JSON.parse(localStorage.getItem("basket")) || [];
// let resultBasketArr = [];

// getData().then((data) => {
//   JSON.parse(localStorage.getItem("basket")).forEach((item) => {
//     resultBasketArr.push({
//       ...data.find((elem) => elem.id === item.id),
//       count: item.count,
//     });
//   });

//   resultBasketArr.forEach((elem) => {
//     basketContainer.innerHTML += `
//     <div class="basketItem">
// <h3>${elem.title.substring(0, 10)} - ${elem.price}</h3>
// <button>+</button>
// <span>${elem.count}</span>
// <button>-</button>
// </div>`;
//   });
// });


// import { getData } from "./api/api.js";
// import { createBasket, createCard } from "./helpers/functions.js";

// const basketContainer=document.querySelector(".basketContainer");

// getData().then((data)=>{
//     let x= JSON.parse(localStorage.getItem("basket"));
//     let newdata=[];
//     if(x!=null){
//     let basketids=[];
//     for(let ids of x){
//         for(let el of data){
//             if(ids.id==el.id){
//                 el.count=ids.count;
//                 newdata.push(el);   
//                 ids.count++;
//             }
//         }
//     }
// }

//     else{
//         let emptyBasket= document.createElement("div");
//         emptyBasket.className= ("emptyBasket");
//         emptyBasket.innerText=("The basket is empty");
//         basketContainer.appendChild(emptyBasket);
//     }
    
//     createBasket(basketContainer,newdata);

// })


import { getData } from "./api/api.js";
import { createBasket, updateTotalPrice } from "./helpers/functions.js";

const basketContainer = document.querySelector(".basketItems");

getData().then((data) => {
    let basketItems = JSON.parse(localStorage.getItem("basket")) || [];
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
});
