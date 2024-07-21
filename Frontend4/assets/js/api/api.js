// export const getData = async () => {
//   const res = await axios("https://fakestoreapi.com/products");
//   const data = await res.data;

//   return data;
// };

export const getData = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};