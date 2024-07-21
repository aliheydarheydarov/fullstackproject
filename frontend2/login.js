const loginForm = document.querySelector(".login");
const nameInp = document.querySelector(".nameInp");
const passInp = document.querySelector(".passInp");
const btn = document.querySelector(".btn");


loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(nameInp.value);
    console.log(passInp.value);
    let obj = {
        name: nameInp.value,
        password: passInp.value,
      };
      console.log(obj);
      fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json(); // Parse JSON from the response
        })
        .then(data => {
          console.log(data); // Handle the data
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
        
})