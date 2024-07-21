document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    try {
      const { valid, isAdmin } = await verifyToken(token);
      
      console.log(isAdmin); // Should print the validity of the token

      if (valid) {
        displayAccountIcon();
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

export async function verifyToken(token) {
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
        //console.log(data);
        // Ensure data contains 'valid' and 'isAdmin' fields
        const valid = data.valid ?? false; // Default to false if not provided
        const isAdmin = data.isAdmin ?? false; // Default to false if not provided
        const userId = data.userId;
        return { valid, isAdmin, userId };
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
function displayAccountIcon() {
  const listElement = document.querySelector("ul");
  //const li1 = document.createElement("li");
  const li2 = document.createElement("li");

  // const accountLink = document.createElement('a');
  // accountLink.id = "nav-account";
  // accountLink.href = "./account.html";
  // accountLink.innerHTML = '<i class="fas fa-user"></i> Account';

  const logoutLink = document.createElement('a');
  logoutLink.href = "#";
  logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
  logoutLink.addEventListener('click', () => {
    localStorage.removeItem('accessToken');
    alert('Logged out successfully');
    location.reload();

  });

  //li1.appendChild(accountLink);
  li2.appendChild(logoutLink);
  //listElement.appendChild(li1);
  listElement.appendChild(li2);
}

function displayLogin() {
  const listElement = document.querySelector("ul");
  const li = document.createElement("li");

  const loginIcon = document.createElement('a');
  loginIcon.id = "nav-login";
  loginIcon.href = "./login.html";
  loginIcon.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
  listElement.appendChild(li);
  li.appendChild(loginIcon);
}

function displayRegister() {
  const listElement = document.querySelector("ul");
  const li = document.createElement("li");

  const registerIcon = document.createElement('a');
  registerIcon.id = "nav-register";
  registerIcon.href = "./register.html";
  registerIcon.innerHTML = '<i class="fas fa-user-plus"></i> Register';
  listElement.appendChild(li);
  li.appendChild(registerIcon);
}

function displayAdmin() {
  const listElement = document.querySelector("ul");
  const li = document.createElement("li");

  const adminIcon = document.createElement('a');
  adminIcon.id = "nav-admin";
  adminIcon.href = "./admin.html";
  adminIcon.innerHTML = '<i class="fas fa-user-shield"></i> Admin';
  listElement.appendChild(li);
  li.appendChild(adminIcon);
}
