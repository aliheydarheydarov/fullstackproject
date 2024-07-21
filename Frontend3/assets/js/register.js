const registerForm = document.querySelector("#register");
const nameInp = document.querySelector(".nameInp");
const passInp = document.querySelector(".passInp");
const errorElement= document.createElement("p");
errorElement.className="errorElement";
registerForm.appendChild(errorElement);

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(nameInp.value);
  console.log(passInp.value);
  let obj = {
    username: nameInp.value,
    password: passInp.value,
  };
  let count=0;
  if (!obj.username){
    nameInp.style="background-color:rgba(255, 0, 0, 0.3); ";
    count++;
    
  }
  if (!obj.password){
    passInp.style="background-color:rgba(255, 0, 0, 0.3);";
    count++;
  }
  if(count){
    return 0;
  }

fetch('http://localhost:3000/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(obj)
})
  .then(response => {
    if (response.status==400) {
      errorElement.innerText="Bu adlı istifadəçi artıq mövcuddur";
      return;
    }
    return response.json(); 
  })
  .then(data => {
    if (data){
    window.location.href = "./login.html"
    }
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
})