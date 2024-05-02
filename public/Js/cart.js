document.addEventListener("DOMContentLoaded", function() {
    // Retrieve data from local storage
    const cartItems = JSON.parse(localStorage.getItem('cart'));

    // Get the ul element to populate cart items
    const cartItemsList = document.getElementById('cart-items');

    // Check if cartItems exist and it's an array
    if (Array.isArray(cartItems) && cartItems.length > 0) {
        // Iterate over each item in the cart and create list items
        cartItems.forEach(item => {
            // Create a list item for each cart item
            const listItem = document.createElement('li');

            const title = document.createElement('h3');
            title.textContent = item.title;

            // Create an image element
            const image = document.createElement('img');
            image.src = item.image; // Set the image source
            image.alt = item.title; // Set the alt text


            const cost = document.createElement('p');
            cost.textContent = item.cost;

            // Append image and title to the list item
            listItem.appendChild(title);
            listItem.appendChild(image);
            listItem.appendChild(cost);


            // Append the list item to the cart items list
            cartItemsList.appendChild(listItem);
        });
    } else {
        // If cart is empty or doesn't exist, display a message
        const emptyItem = document.createElement('li');
        emptyItem.textContent = 'Your cart is empty.';
        cartItemsList.appendChild(emptyItem);
    }
});
