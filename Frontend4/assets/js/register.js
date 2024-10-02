const registerForm = document.querySelector("#registerForm");
const emailInp = document.querySelector(".emailInp");
const nameInp = document.querySelector(".nameInp");
const surnameInp = document.querySelector(".surnameInp");
const usernameInp = document.querySelector(".usernameInp");
const passwordInp = document.querySelector(".passwordInp");
const repeatPasswordInp = document.querySelector(".repeatPasswordInp");
const errorElement = document.createElement("p");
errorElement.className = "errorElement";
registerForm.appendChild(errorElement);

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();


  const email = emailInp.value;
  const name = nameInp.value;
  const surname = surnameInp.value;
  const username = usernameInp.value;
  const password = passwordInp.value;
  const repeatPassword = repeatPasswordInp.value;

  let valid = true;

  // Reset background color for all inputs
  [emailInp, nameInp, surnameInp, usernameInp, passwordInp, repeatPasswordInp].forEach(input => {
    input.style.backgroundColor = "";
  });

  if (!email || !name || !surname || !username || !password || !repeatPassword) {
    errorElement.innerText = "All fields are required.";
    valid = false;
  }

  if (password !== repeatPassword) {
    errorElement.innerText = "Passwords do not match!";
    valid = false;
  }
  if (password.length < 8) {
    errorElement.innerText = "Password must be at least 8 characters long.";
    passInp.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
    valid=false;
  }

  if (!valid) {
    return;
  }

  let obj = {
    email,
    name,
    surname,
    username,
    password,
  };

  fetch('http://localhost:3000/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj)
  })
    .then(response => {
      if (response.status === 400) {
        errorElement.innerText = "User with this username already exists.";
        return;
      }
      if (response.status === 401) {
        errorElement.innerText = "This email has already registered.";
        return;
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        window.location.href = "./login.html";
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
});

