// let data = {};
// const products = async () => {
//     const response = await fetch('https://dummyjson.com/products');
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     // console.log(data);
//     return data = console.log(await response.json());

// }
// products()
const producturl = 'https://dummyjson.com/products';
async function fetchProducts() {
    const response = await fetch(producturl);
    let data = await response.json();
    console.log(data);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

}