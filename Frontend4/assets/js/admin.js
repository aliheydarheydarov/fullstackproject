import { verifyToken } from './script.js';

document.addEventListener('DOMContentLoaded', async () => {

  // Prevent rendering the page until admin check is done
  document.body.style.display = 'none'; // Hide the page content initially

  const token = localStorage.getItem('accessToken');
  let isItAdmin = false;

  if (token) {
    try {
      const { isAdmin } = await verifyToken(token);
      isItAdmin = isAdmin;
      console.log(isAdmin); // Should print the validity of the token
    } catch (error) {
      console.error('Error verifying token:', error);
      // Handle errors if needed
    }
  }

  // If the user is not an admin, block access and redirect
  if (!isItAdmin) {
    window.location.href = '/403.html'; // Redirect to 403 error page
    return;
  }

  // If the user is an admin, show the page content
  document.body.style.display = 'block';

  // If the user is an admin, the rest of the code will execute
  document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const response = await fetch('http://104.248.136.206:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Product added successfully!');
    } else {
      alert('Error adding product');
    }
  });

  // Edit User Form
  document.getElementById('editUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.isAdmin == "on") {
      data.isAdmin = true;
    } else {
      data.isAdmin = false;
    }
    console.log(data);

    const response = await fetch('http://104.248.136.206:3000/users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,

      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('User updated successfully!');
    } else {
      alert('Error updating user');
    }
  });

  // Delete User Form
  document.getElementById('deleteUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('deleteUserId').value;

    const response = await fetch(`http://104.248.136.206:3000/users/username/${username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,

      },
    });

    if (response.ok) {
      alert('User deleted successfully!');
    } else {
      console.log(response);
      alert('Error deleting user');
    }
  });
});
