let page = 1;
let limit = 10; 

const producturl = 'https://dummyjson.com/products?page=' + page + '&limit=' + limit;

async function fetchProducts() {
    const response = await fetch(producturl);
    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);

    showproducts(data.products); 
}
function loadMoreProducts() {
    page++;
    fetchProducts();
    
}
function showproducts(products) {
    const productCards = document.getElementById('product-cards'); 
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
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.images[0],
                category: product.category,
                quantity: 1 // Assuming quantity is 1 for simplicity
            };
            addToCart(productData);
        });
    });
}

fetchProducts();

const cart =[];
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1; 
    }else{
        cart.push(product);
    }
    console.log('Cart:', cart);
    const totalprice = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity; // ✅ Fix here
    });
    totalprice.textContent = `Total: $${total.toFixed(2)}`;
}

function showCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // Clear existing items first

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item card m-2 p-2';
        cartItem.style.width = '150px'; // Fixed width for layout
        cartItem.innerHTML = `
            <div class="card-img-top text-center">
                <img src="${item.image}" alt="${item.title}" class="img-fluid" style="max-height: 100px;">
            </div>
            <div class="card-body p-1 text-center">
                <h6 class="card-title mb-1">${item.title}</h6>
                <p class="card-text mb-1">$${item.price}</p>
                <small>Qty: ${item.quantity}</small>
            </div>
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