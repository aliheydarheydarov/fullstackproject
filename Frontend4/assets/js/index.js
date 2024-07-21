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

        })
    }    
});

