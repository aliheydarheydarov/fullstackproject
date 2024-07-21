// import { getData } from "./api/api.js";
// import { createCard } from "./helpers/functions.js";
// const products = document.querySelector(".products");
// let basket = JSON.parse(localStorage.getItem("basket")) || [];

// getData().then((data) => {
//   createCard(products, data);

//   products.addEventListener("click", (e) => {
//     if (e.target.classList.contains("addBasket")) {
    
//       if (!localStorage.getItem("accessToken")) {
//         window.location.href = `login.html`;
//         sessionStorage.setItem("prev-page", window.location.href)

//       } else {
//         if (
//           basket.find((elem) => elem.id == e.target.getAttribute("customId"))
//         ) {
//           let findElem = JSON.parse(localStorage.getItem("basket")).find(
//             (elem) => elem.id == e.target.getAttribute("customId")
//           );

//           findElem.count++;

//           let newArr = basket.filter((elem) => elem.id !== findElem.id);

//           newArr.push(findElem);

//           localStorage.setItem("basket", JSON.stringify(newArr));
//         } else {
//           let obj = {
//             id: +e.target.getAttribute("customId"),
//             count: 1,
//           };

//           basket.push(obj);
//           localStorage.setItem("basket", JSON.stringify(basket));
//         }
//       }
//     }
//   });
// });


import {getData} from "./api/api.js";
import { createCard } from "./helpers/functions.js";

const products=document.querySelector(".products")
let basket=JSON.parse(localStorage.getItem("basket"));
getData().then((data) => {
    createCard(products, data);
    

    const allAddBasketBtns = document.querySelectorAll(".addBasket");

    for(let btn of allAddBasketBtns){
        btn.addEventListener("click", (e)=>{
            if (!localStorage.getItem("accessToken")) {
                window.location.href = `login.html`;
                return;
   }
            if(basket==null){
                basket=[];
            }
            let obj={
                id: e.target.getAttribute("customId"), count:1
            }
            let sum=0;
            for(let el of basket){
                if(el.id==obj.id){
                    el.count+=1;
                    sum+=1;
                }
            }
            if(sum==0){
                basket.push(obj);
            }
            localStorage.setItem("basket", JSON.stringify(basket));
            // fetch(`http://localhost:3000/baskets/:id`, {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(obj)
            //   })
            //     .then(response => {
            //       if (!response.ok) {
            //         throw new Error('Network response was not ok ' + response.statusText);
            //       }
            //       return response.json(); // Parse JSON from the response
            //     })
            //     .then(data => {
            //       console.log(data, "the data"); // Handle the data
            //     })
            //     .catch(error => {
            //       console.error('There has been a problem with your fetch operation:', error);
            //     });

        })
    }    
});


//------------
