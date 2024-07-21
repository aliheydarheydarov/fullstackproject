document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    try {
      const { valid, isAdmin } = await verifyToken(token);
      
      console.log(isAdmin); // Should print the validity of the token

      if (valid) {
        displayAccountIcon();
3
        if (isAdmin) {
          displayAdmin();
        }

      }
    } catch (error) {
      console.error('Error verifying token:', error);
      // Handle errors if needed
    }
  } else {
    displayRegister();
    displayLogin();
  }
});

  
  async function verifyToken(token) {
    try {
      const response = await fetch('http://localhost:3000/users/verifyToken', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        try {
          const data = await response.json();
          // Ensure data contains 'valid' and 'isAdmin' fields
          const valid = data.valid ?? false; // Default to false if not provided
          const isAdmin = data.isAdmin ?? false; // Default to false if not provided
          return { valid, isAdmin };
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          return { valid: false, isAdmin: false };
        }
      } else {
        return { valid: false, isAdmin: false };
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return { valid: false, isAdmin: false };
    }
  }
  
  
  // Function to display the account icon
//   function displayAccountIcon() {
//     const listElement = document.querySelector("ul");
//     const li= document.createElement("li");

//     const accountIcon = document.createElement('a');

//     accountIcon.id="account-nav-item";
//     accountIcon.href="./account.html"
//     accountIcon.innerText = 'Account';
//     listElement.appendChild(li);
//     li.appendChild(accountIcon);
//   }

function displayAccountIcon() {
    const listElement = document.querySelector("ul");
    const li1= document.createElement("li");
    const li2= document.createElement("li");
  
    const accountLink = document.createElement('a');
    accountLink.id = "nav-account";
    accountLink.href = "#";
    accountLink.innerText = 'Account';
  
    const logoutLink = document.createElement('a');
    logoutLink.href = "#";
    logoutLink.innerText = 'Logout';
    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('accessToken');
      alert('Logged out successfully');
      location.reload();
      // Redirect to login page or any other page if needed
      // window.location.href = './login.html';
    });
  
    li1.appendChild(accountLink);
    li2.appendChild(logoutLink);
    listElement.appendChild(li1);
    listElement.appendChild(li2);

  }

  
  


  function displayLogin() {
    const listElement = document.querySelector("ul");
    const li= document.createElement("li");

    const loginIcon = document.createElement('a');

    loginIcon.id="nav-login";
    loginIcon.href="./login.html"
    loginIcon.innerText = 'Login';
    listElement.appendChild(li);
    li.appendChild(loginIcon);
  }

  function displayRegister() {
    const listElement = document.querySelector("ul");
    const li= document.createElement("li");

    const registerIcon = document.createElement('a');

    registerIcon.id="nav-register";
    registerIcon.href="./register.html"
    registerIcon.innerText = 'Register';
    listElement.appendChild(li);
    li.appendChild(registerIcon);
  }
  

  function displayAdmin() {
    const listElement = document.querySelector("ul");
    const li= document.createElement("li");

    const registerIcon = document.createElement('a');

    registerIcon.id="nav-admin";
    registerIcon.href="./admin.html"
    registerIcon.innerText = 'Admin';
    listElement.appendChild(li);
    li.appendChild(registerIcon);
  }
