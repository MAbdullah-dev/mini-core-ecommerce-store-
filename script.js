let page = 1;
let limit = 10;
let totalProducts = 0;

async function fetchProducts() {
    const producturl = `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`;
    const response = await fetch(producturl);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    totalProducts = data.total;

    // Clear existing cards before showing new ones
    document.getElementById('product-cards').innerHTML = '';
    showproducts(data.products);
    renderPagination();
}
function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalProducts / limit);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary mx-1';
        btn.textContent = i;

        if (i === page) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            page = i;
            fetchProducts();
        });

        paginationContainer.appendChild(btn);
    }
}

function showproducts(products) {
    const productCards = document.getElementById('product-cards');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="card-img position-relative card-icon">
                <img src="${product.images[0]}" alt="${product.title}" id="">
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
        // code for add active class to icon which is add in the cart
        const cardIcon = productCard.querySelector('.card-icon');
        cardIcon.addEventListener('click', () => {
            cardIcon.classList.toggle('added');
        });
        const cartButton = productCard.querySelector('.add-to-cart-btn');
        cartButton.addEventListener('click', () => {

            const productData = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.images[0],
                category: product.category,
                quantity: 1
            };
            addToCart(productData);
        });
    });
}

fetchProducts();

const cart = [];
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    const addquantity = document.getElementById('add-quantity');
    // const cardIcon = document.querySelectorAll('.card-icon');
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
        // cardIcon.add('added');

    }

    console.log('Cart:', cart);
    const totalprice = document.querySelectorAll('.total-price');
    const gstAmount = document.getElementById('gst-amount');
    const gstValue = 0.18; // 18% GST
    const cartCount = document.getElementById('cart-count');
    const finaltotal = document.getElementById('final-total');
    cartCount.textContent = cart.length;
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;

    });
    // gstAmount = total * gstValue;
    // totalprice.textContent = `Total: $${total.toFixed(2)}`;
    for (let i = 0; i < totalprice.length; i++) {
        totalprice[i].textContent = `Total: $${total.toFixed(2)}`;
        gstAmount.textContent = `GST (18%): $${(total * gstValue).toFixed(2)}`;
        finaltotal.textContent = `Final Total: $${(total * (1 + gstValue)).toFixed(2)}`;
    }
}

function showCartItems() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

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
                <i class="fa-solid fa-plus" id="add-quantity" data-id="${item.id}"></i><small>Qty: ${item.quantity}</small> <i class="fa-solid fa-minus subtract-quantity" data-id="${item.id}"></i>

            </div>
        `;
        cartItems.appendChild(cartItem);
        const subtractquantity = document.querySelectorAll('.subtract-quantity');

        for (let i = 0; i < subtractquantity.length; i++) {
            subtractquantity[i].addEventListener('click', () => {
                const productId = parseInt(subtractquantity[i].getAttribute('data-id'));
                const existingProduct = cart.find(item => item.id === productId);
                // console.log(existingProduct.quantity);

                if (existingProduct) {
                    if (existingProduct.quantity > 1) {
                        existingProduct.quantity -= 1;
                        console.log(`Quantity of ${existingProduct.title} decreased to ${existingProduct.quantity}`);

                    } else {
                        const index = cart.indexOf(existingProduct);
                        cart.splice(index, 1);
                    }
                    addToCart(existingProduct);
                    showCartItems();
                }
            });
        }
    });
}


// for (i = 1; i <= 5; i++) {
//     let result = '';
//     for (j = 5; j > i; j++) {
//         result = ' ' + result;
//     }
//     for (j = 1; j <= i; j++) {
//         result = result + '*';
//     }
//     console.log(result);

// }
// console.log(result);

