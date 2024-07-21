document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.querySelector('.favoritesItems');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    function renderFavorites() {
      favoritesContainer.innerHTML = '';
      if (favorites.length === 0) {
        favoritesContainer.innerHTML = '<p>No favorite items yet.</p>';
      } else {
        favorites.forEach((item, index) => {
          const itemElement = document.createElement('div');
          itemElement.classList.add('item');
          itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" />
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <button class="addBasket" customId="${item.id}">Add to Basket</button>
            <button class="delete-btn" data-index="${index}">&times;</button>
          `;
          favoritesContainer.appendChild(itemElement);
        });
      }
    }

    function deleteFavorite(index) {
      favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      renderFavorites();
    }

    function addToBasket(id) {
      if (!localStorage.getItem("accessToken")) {
        window.location.href = `login.html`;
        return;
      }

      let basket = JSON.parse(localStorage.getItem("basket")) || [];
      let obj = {
        id: id, 
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
    }

    favoritesContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        deleteFavorite(index);
      } else if (e.target.classList.contains('addBasket')) {
        const id = e.target.getAttribute('customId');
        addToBasket(id);
      }
    });

    renderFavorites();
  });