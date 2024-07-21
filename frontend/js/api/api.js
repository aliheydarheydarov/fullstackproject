// export const getData = async () => {
//     const res = await axios("https://fakestoreapi.com/products");
//     const data = await res.data;
//     return data;

// }

export const getData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
}