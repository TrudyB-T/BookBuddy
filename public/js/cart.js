// Array to store items in the cart
let cart = [];

// Function to display items in the cart
function displayCart() {
    const cartItemsElement = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");
    if (cartItemsElement) {
        cartItemsElement.innerHTML = "";
        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.title} - $${item.price}`;
            cartItemsElement.appendChild(li); // Use renamed variable
        });
        calculateTotal();
    } else {
        console.error('Cart items element not found');
    }
}

// Function to calculate total price of items in the cart
function calculateTotal() {
    const cartTotal = document.querySelector(".cart-total");
    const total = cart.reduce((acc, item) => acc + parseFloat(item.price), 0);
    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
    } else {
        console.error('Cart total element not found');
    }
}

// Function to handle adding a book to the cart
function addToCart(book) {
    cart.push(book);
    displayCart();
}

// Function to handle checkout
function checkout() {
    // Clear the cart
    cart = [];
    displayCart();
    // Redirect user to index page
    window.location.href = "index.html";
}
