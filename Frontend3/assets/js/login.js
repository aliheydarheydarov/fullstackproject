const loginForm = document.querySelector(".login-form");
const nameInp = document.querySelector(".nameInp");
const passInp = document.querySelector(".passInp");
const registerbtn = document.querySelector("#registerButton");
const loginBtn = document.querySelector("#login-submit")


loginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let obj = {
      username: nameInp.value,
      password: passInp.value,
    };

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
        console.log(data, "the data"); // Handle the data
        localStorage.setItem("accessToken", data.accessToken);
        window.location.href = "./index.html"
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
      
})


registerbtn.addEventListener("click", function () {
  window.location.href = "register.html";
});


