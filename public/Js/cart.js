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
            listItem.style.listStyleType = "none";
            listItem.style.display ="flex";
            listItem.style.marginBottom = "20px";
            
            

            // Create an image element
            const image = document.createElement('img');
            image.src = item.image; // Set the image source
            image.alt = item.title; // Set the alt text
            image.style.height = 'auto';
            image.style.width = '100px';
            image.style.marginRight = "30px";
            
            
            const title = document.createElement('h3');
            title.textContent = item.title;
            title.style.marginRight = "30px";
            

            const cost = document.createElement('p');
            cost.textContent = '$' + item.cost;
            cost.marginRight = "30px";     
            
            
            // Create a container div
const ordersDiv = document.createElement("div");
ordersDiv.classList.add("orders");

// Create a minus button
const minusButton = document.createElement("button");
minusButton.classList.add("minus");
minusButton.textContent = "-";

// Create a span element for "q"
const quantitySpan = document.createElement("span");
quantitySpan.classList.add("quant");
quantitySpan.textContent = "q";

// Create a plus button
const plusButton = document.createElement("button");
plusButton.classList.add("plus");
plusButton.textContent = "+";

// Append the elements to the ordersDiv
ordersDiv.appendChild(minusButton);
ordersDiv.appendChild(quantitySpan);
ordersDiv.appendChild(plusButton);

  
            // Append image and title to the list item
            listItem.appendChild(image);
            listItem.appendChild(title);
            listItem.appendChild(cost);
            listItem.appendChild(ordersDiv);


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
