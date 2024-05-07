document.addEventListener("DOMContentLoaded", function() {
    // Retrieving  data from local storage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Getting the ul element to populate cart items
    const cartItemsList = document.getElementById('cart-items');
    const cartIcon = document.querySelector('.fa-cart-shopping');

    // Checking if cartItems exist and it's an array
    if (Array.isArray(cartItems) && cartItems.length > 0) {
        // Displaying the number of items in the cart icon
        updateCartIcon(cartItems.length);

        // Iterating over each item in the cart and creating list items
        cartItems.forEach(item => {
            // Creating a list item for each cart item
            const listItem = createCartItemElement(item);

            // Appending the list item to the cart items list
            cartItemsList.appendChild(listItem);
        });
    } else {
        // If cart is empty or doesn't exist, display a message
        const emptyItem = document.createElement('p');
        emptyItem.textContent = 'Your cart is empty.';
        cartItemsList.appendChild(emptyItem);
    }

    // Function to create a list item for each cart item
    function createCartItemElement(item) {
        // Creating a list item for each cart item
        const listItem = document.createElement('li');
        listItem.style.listStyleType = "none";
        listItem.style.display ="flex";
        listItem.style.marginBottom = "20px";
        
        // Creating an image element
        const image = document.createElement('img');
        image.src = item.image; 
        image.alt = item.title; 
        image.style.height = 'auto';
        image.style.width = '100px';
        image.style.marginRight = "30px";
        
        // Creating a title element
        const title = document.createElement('h3');
        title.textContent = item.title;
        title.style.marginRight = "30px";

        // Creating a cost element
        const cost = document.createElement('p');
        cost.textContent = '$' + (item.cost * item.quantity).toFixed(2);
        cost.marginRight = "30px";     

        // Creating a container div for quantity controls
        const ordersDiv = createQuantityControls(item.id, item.quantity);

        // Appending elements to the list item
        listItem.appendChild(image);
        listItem.appendChild(title);
        listItem.appendChild(cost);
        listItem.appendChild(ordersDiv);

        return listItem;
    }

    // Function to create quantity controls for each cart item
    function createQuantityControls(itemId, quantity) {
        // Creates a container div
        const ordersDiv = document.createElement("div");
        ordersDiv.classList.add("orders");

        // Creates a minus button
        const minusButton = document.createElement("button");
        minusButton.classList.add("minus");
        minusButton.textContent = "-";
        minusButton.addEventListener('click', function() {
            updateQuantity(itemId, -1);
        });

        // Creates a span element for quantity
        const quantitySpan = document.createElement("span");
        quantitySpan.classList.add("quant");
        quantitySpan.textContent = quantity;

        // Creates a plus button
        const plusButton = document.createElement("button");
        plusButton.classList.add("plus");
        plusButton.textContent = "+";
        plusButton.addEventListener('click', function() {
            updateQuantity(itemId, 1);
        });

        // Appends the elements to the container div
        ordersDiv.appendChild(minusButton);
        ordersDiv.appendChild(quantitySpan);
        ordersDiv.appendChild(plusButton);

        return ordersDiv;
    }

   // Function to update the quantity of a cart item
function updateQuantity(itemId, quantityChange) {
    // Finding the cart item by its ID
    const index = cartItems.findIndex(item => item.id === itemId);

    // Updating the quantity if the item is found
    if (index !== -1) {
        cartItems[index].quantity += quantityChange;
        // Ensure quantity doesn't go below 0
        if (cartItems[index].quantity < 0) {
            cartItems.splice(index, 1); // Removes item if quantity is 0
        }
        // Updating local storage and UI
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartIcon(calculateTotalQuantity(cartItems)); // Update the cart icon count
        updateCartDisplay();
    }
}

// Function to calculate the total quantity of items in the cart
function calculateTotalQuantity(cartItems) {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
}

    // Function to update the cart icon to display the number of items
    function updateCartIcon(itemCount) {
        cartIcon.setAttribute('data-count', itemCount);

    }
   
    // Function to update the cart icon with the new cart amount
function updateCartIcon(amount) {
    let cartAmountElement = document.getElementById("cart-amount");
    cartAmountElement.textContent = amount;
}

    // Function to update the cart display
    function updateCartDisplay() {
        // Clears the current cart display
        cartItemsList.innerHTML = '';

        // Calculates total cost
        let totalCost = 0;

        // Iterates over each item in the cart and creates list items
        cartItems.forEach(item => {
            totalCost += item.cost * item.quantity;
            // Creating a list item for each cart item
            const listItem = createCartItemElement(item);

            // Appending the list item to the cart items list
            cartItemsList.appendChild(listItem);
        });

        // Displaying the total cost
        const totalCostElement = document.createElement('p');
        totalCostElement.textContent = 'Total: $' + totalCost.toFixed(2);
        totalCostElement.style.color = 'purple';
        totalCostElement.style.marginLeft = "77%";
        totalCostElement.style.fontWeight = "bold";
        totalCostElement.style.display ="inline-block";
        cartItemsList.appendChild(totalCostElement);
    }
});
