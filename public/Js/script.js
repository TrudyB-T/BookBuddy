const cart = [];
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-button");
    const searchResults = document.querySelector(".search-results");

    // Added event listener for search button click
    searchButton.addEventListener("click", function() {
        const searchQuery = searchInput.value.trim();
        if (searchQuery !== "") {
            fetchBooks(searchQuery);
        } else {
            alert("Please enter a search query.");
        }
    });

    // Function to generate a random price between min and max
    function generateRandomPrice(min, max) {
        return (Math.random() * (max - min) + min).toFixed(2);
    }

    // Function to fetch books from the API based on search query
    async function fetchBooks(searchQuery) {
        try {
            const apiUrl = `https://www.dbooks.org/api/search/${searchQuery}`;
            const response = await fetch(apiUrl);

            // Checking if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }

            // Parsing the JSON response
            const responseData = await response.json();

            console.log("API Response Data:", responseData);

            // Extracts the array of books from the response data
            const books = responseData.books;

            // Clearing previous search results
            searchResults.innerHTML = "";

            // Loop through the array of books and create an HTML elements to display each book
            books.forEach(book => {
                // Creates book item HTML elements
                const bookItem = document.createElement("div");
                bookItem.classList.add("book-item");

                const title = document.createElement("h3");
                title.textContent = book.title;

                const author = document.createElement("p");
                author.textContent = `Author: ${book.authors}`;

                const description = document.createElement("p");
                description.textContent = book.subtitle;

                const image = document.createElement("img");
                image.src = book.image;
                image.alt = book.title;

                const price = document.createElement("p");
                const cost = generateRandomPrice(80, 250);
                price.textContent = `Price: $${cost}`;
                book.cost = cost;


               // Defines an empty array to store the cart items

// Function to add an item to the cart
function addToCart(item) {
    // Retrieves cart items from local storage or initialize an empty array if it doesn't exist
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];


    // Checks if the item already exists in the cart
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
        // If the item already exists, increment its quantity
        cartItems[existingItemIndex].quantity++;
    } else {
        // If the item doesn't exist, add it to the cart with a quantity of 1
        item.quantity = 1;
        cartItems.push(item);
    }

    // Updating local storage with the updated cart items
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Updating the cart icon to reflect the new number of items in the cart
    updateCartIcon(cartItems.length);
}


// Creates a button element
const addToCartButton = document.createElement("button");

// Sets the button text
addToCartButton.textContent = "Add to Cart";

// Added an event listener to the button
addToCartButton.addEventListener("click", function() {
    // calling the addToCart function
    addToCart(book);
});


                // Appends elements to book item
                bookItem.appendChild(title);
                bookItem.appendChild(author);
                bookItem.appendChild(description);
                bookItem.appendChild(image);
                bookItem.appendChild(price);
                bookItem.appendChild(addToCartButton);

                // Appends book item to search results container
                searchResults.appendChild(bookItem);
            });
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }
});
