import { getData } from "./api/api.js";
import { createBasket, createCard } from "./helpers/functions.js";

const basketContainer=document.querySelector(".basketContainer");

getData().then((data)=>{
    let x= JSON.parse(localStorage.getItem("basket"));
    let newdata=[];
    if(x!=null){
    let basketids=[];
    for(let ids of x){
        for(let el of data){
            if(ids.id==el.id){
                el.count=ids.count;
                newdata.push(el);   
                ids.count++;
            }
        }
    }
}

    else{
        let emptyBasket= document.createElement("div");
        emptyBasket.className= ("emptyBasket");
        emptyBasket.innerText=("The basket is empty");
        basketContainer.appendChild(emptyBasket);
    }
    
    createBasket(basketContainer,newdata);

})