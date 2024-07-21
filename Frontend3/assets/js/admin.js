document.addEventListener('DOMContentLoaded', () => {
    // Add Product Form
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
    document.getElementById('editProductForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
  
      const response = await fetch('yourAPIEndpoint/editProduct', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert('Product updated successfully!');
      } else {
        alert('Error updating product');
      }
    });
  
    // Add User Form
    document.getElementById('addUserForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
  
      const response = await fetch('yourAPIEndpoint/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert('User added successfully!');
      } else {
        alert('Error adding user');
      }
    });
  
    // Edit User Form
    document.getElementById('editUserForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
  
      const response = await fetch('yourAPIEndpoint/editUser', {
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
      const userId = document.getElementById('deleteUserId').value;
  
      const response = await fetch(`yourAPIEndpoint/deleteUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        alert('User deleted successfully!');
      } else {
        alert('Error deleting user');
      }
    });
  });
  