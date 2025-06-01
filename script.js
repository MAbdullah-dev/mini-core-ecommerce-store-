const producturl = 'https://dummyjson.com/products';

async function fetchProducts() {
    const response = await fetch(producturl);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);

    showproducts(data.products); // data.products is the array
}

function showproducts(products) {
    const productCards = document.getElementById('product-cards'); // Make sure this element exists in your HTML
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="card-img position-relative">
                <img src="${product.images[0]}" alt="${product.title}">
                <i class="fa-solid fa-bag-shopping position-absolute add-to-cart-btn"></i>
            </div>
            <h3>${product.title}</h3>
            <span>${product.category}</span>
            <p>$${product.price}</p>
            <div class="star-rating">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </div>
        `;
        productCards.appendChild(productCard);
        const cartButton = productCard.querySelector('.add-to-cart-btn');
        cartButton.addEventListener('click', () => {
            const productData = {
                title: product.title,
                price: product.price,
                image: product.images[0],
            };
            addToCart(productData);
        });
    });
}

fetchProducts();

const cart =[];
function addToCart(product) {
    cart.push(product);
    // console.log('Product added to cart:', product);
    console.log('Cart:', cart);
    // You can also update the UI to show the cart count or items
}
// show cart items in modal
function showCartItems() {
    const cartItems = document.getElementById('cart-items');
    cart.map(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class =card-img >
                <img src="${item.image}" alt="${item.title}">
            </div>
            <h3>${item.title}</h3>
            <p>$${item.price}</p>
        `;
        cartItems.appendChild(cartItem);
    });

}

// const addToCartButtons = document.querySelectorAll('#AddtoCart');
// addToCartButtons.forEach(button => {
//     button.addEventListener('click', (event) => {
//         console.log('Add to cart button clicked');
        
//         const productCard = event.target.closest('.product-card');
//         const productTitle = productCard.querySelector('h3').textContent;
//         const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
        
//         const product = {
//             title: productTitle,
//             price: productPrice
//         };
        
//         addToCart(product);
//     });
// });