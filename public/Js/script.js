const cart = [];
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-button");
    const searchResults = document.querySelector(".search-results");

    // Add event listener for search button click
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

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }

            // Parse the JSON response
            const responseData = await response.json();

            console.log("API Response Data:", responseData); // Log the data to inspect its structure

            // Extract the array of books from the response data
            const books = responseData.books;

            // Clear previous search results
            searchResults.innerHTML = "";

            // Loop through the array of books and create HTML elements to display each book
            books.forEach(book => {
                // Create book item HTML elements
                const bookItem = document.createElement("div");
                bookItem.classList.add("book-item");

                const title = document.createElement("h3");
                title.textContent = book.title;

                const author = document.createElement("p");
                author.textContent = `Author: ${book.authors}`;

                const description = document.createElement("p"); // Create a paragraph for description
                description.textContent = book.subtitle; // Assuming subtitle is the description field

                const image = document.createElement("img");
                image.src = book.image;
                image.alt = book.title;

                const price = document.createElement("p");
                const cost = generateRandomPrice(80, 250);
                price.textContent = `Price: $${cost}`;
                book.cost = cost;


               // Define an empty array to store the cart items

// Function to add a book to the cart
function addToCart(book) {
    // Generate a random price between 80 and 250
    //const price = Math.floor(Math.random() * (250 - 80 + 1)) + 80;
    
    // Include the generated price in the book obj

    // Add the book to the cart
    cart.push(book);

    console.log("Book added to cart:", book);
    console.log(cart);
    localStorage.setItem('cart', JSON.stringify(cart));// You can do more here, like updating the UI to reflect the change in the cart
    // You can do more here, like updating the UI to reflect the change in the cart
}

// Create a button element
const addToCartButton = document.createElement("button");

// Set the button text
addToCartButton.textContent = "Add to Cart";

// Add an event listener to the button
addToCartButton.addEventListener("click", function() {
    // Inside the event listener, call the addToCart function
    addToCart(book); // Assuming 'book' is defined somewhere in your code
});




                // Append elements to book item
                bookItem.appendChild(title);
                bookItem.appendChild(author);
                bookItem.appendChild(description); // Append description
                bookItem.appendChild(image);
                bookItem.appendChild(price);
                bookItem.appendChild(addToCartButton);

                // Append book item to search results container
                searchResults.appendChild(bookItem);
            });
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }
});
