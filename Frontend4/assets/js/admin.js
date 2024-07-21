
import { verifyToken } from './script.js';


document.addEventListener('DOMContentLoaded', async () => {

  const token = localStorage.getItem('accessToken');
  let isItAdmin= false;

  if (token) {
    try {
      const { isAdmin } = await verifyToken(token);
      isItAdmin=isAdmin;
      
      console.log(isAdmin); // Should print the validity of the token
       
    } catch (error) {
      console.error('Error verifying token:', error);
      // Handle errors if needed
    }
  }
  if(isItAdmin){
  document.getElementById('addProductForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert('Product added successfully!');
    } else {
      alert('Error adding product');
    }
  });

  // Edit Product Form
  // document.getElementById('editProductForm').addEventListener('submit', async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const data = Object.fromEntries(formData.entries());

  //   const response = await fetch('http://localhost:3000/products', {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   if (response.ok) {
  //     alert('Product updated successfully!');
  //   } else {
  //     alert('Error updating product');
  //   }
  // });

  // Add User Form
  // document.getElementById('addUserForm').addEventListener('submit', async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.target);
  //   const data = Object.fromEntries(formData.entries());

  //   const response = await fetch('yourAPIEndpoint/addUser', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   if (response.ok) {
  //     alert('User added successfully!');
  //   } else {
  //     alert('Error adding user');
  //   }
  // });

  // Edit User Form
  document.getElementById('editUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    //const {IsAdmin} = data;
    //data.IsAdmin= false;
    //console.log(data);
    if(data.isAdmin=="on"){
      data.isAdmin=true;
    }
    else{
      data.isAdmin=false;
    }
    console.log(data);

    const response = await fetch('http://localhost:3000/users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
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

    const response = await fetch(`http://localhost:3000/users/username/${username}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('User deleted successfully!');
    } else {
      console.log(response);
      alert('Error deleting user');
    }
  });
}
else{
  alert("You are not an Admin. To make changes you have to sign in as an admin, otherwise no function here will work");
}
});

