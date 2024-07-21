    export const createCard = (parentElement, array) => {
    
    array.forEach(element => {

        let card=document.createElement("div");
        card.className="card";


        let cardImg=document.createElement("div");
        cardImg.className="cardImg";
            let prodImg=document.createElement("img");
            prodImg.className="prodImg";
        let cardName=document.createElement("h4");
        cardName.className="cardName";
        let CardDesc=document.createElement("p");
        CardDesc.className="CardDesc";
        let cardPrice=document.createElement("p");
        cardPrice.className="cardPrice";
        let addBasket=document.createElement("button");
        addBasket.className="addBasket";
        let addFav=document.createElement("button");
        addFav.classname="addFav";

        card.appendChild(cardImg);
        card.appendChild(cardName);
        card.appendChild(CardDesc);
        card.appendChild(cardPrice);
        card.appendChild(addBasket);
        card.appendChild(addFav);
        cardImg.appendChild(prodImg);

        prodImg.src=element.image;
        cardName.innerText=`${element.title.substring(0,10)}...`;
        cardPrice.innerText=`${element.price}$`;
        CardDesc.innerText=`${element.description.substring(0,15)}...`
        addBasket.innerText="Add Basket";
        addBasket.setAttribute("customId", element.id);

        addFav.innerText="Add Fav";

        parentElement.appendChild(card);
        
    });
}

export const createBasket = (parentElement, array) => {
    
    array.forEach(element => {

        let basketItem=document.createElement("div");
        basketItem.className="basketItem";

        let basketImg=document.createElement("div");
        basketImg.className="basketImg";
            let basketsImg=document.createElement("img");
            basketsImg.className="basketsImg";
        basketImg.appendChild(basketsImg);
        
        let name_price=document.createElement("h3");
        name_price.className="name_price";
        let increase=document.createElement("button");
        increase.className="increase";
        let count_of=document.createElement("span");
        count_of.className="count_of";
        let decrease=document.createElement("button");
        decrease.className="decrease";


        basketsImg.src=element.image;

        name_price.innerText=`${element.title} - ${element.price}`;
        increase.innerText=`+`;
        decrease.innerText=`-`;
        count_of.innerText=`${element.count}`;

        basketItem.appendChild(basketImg);
        basketItem.appendChild(name_price);
        basketItem.appendChild(increase);
        basketItem.appendChild(count_of);
        basketItem.appendChild(decrease);

        parentElement.appendChild(basketItem);
        
    });
}