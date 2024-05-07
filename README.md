![BookBuddy](public/image/newlogo.PNG)
# Book Buddy - Your Online Bookstore

Embarking on a Journey of Knowledge and Discovery

Book Buddy is an online platform that provides a wide range of educational resources to enthusiasts and learners. Whether you're interested in history, computer science, science & mathematics, economics & finance, philosophy, business & management, or politics & government, Book Buddy has something for everyone. With our vast collection of books spanning various genres and disciplines, you can embark on a journey of knowledge and discovery from the comfort of your home.

## Features

- **User Authentication**: Users can sign up for an account, log in, and log out securely.
- **Category-based Navigation**: Browse books conveniently categorized into various subjects.
- **Search Functionality**: Easily search for specific books by title or author.
- **Shopping Cart**: Add books to your cart for easy checkout.
- **Checkout Process**: Seamless checkout process for purchasing books.
- **External API Integration**: Fetch book data from external APIs to expand our collection.



## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js(framework)
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **API Integration**: Fetch book data from external APIs

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <https://github.com/Dedeyd70/BookBuddy>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   PORT=3000
   MONGODB_URI=<your-mongodb-uri>
   SECRET_KEY=<your-secret-key>
   ```

   Replace `<your-mongodb-uri>` with your MongoDB connection URI and `<your-secret-key>` with a secret key for JWT.

4. Start the server:

   ```bash
   npm start
   ```

5. Access the application in your browser at `http://localhost:3000`.

## External API Integration

We use external APIs to fetch book data for different categories. The following functions interact with the external API:

- **Fetch Books by Category**: Fetch books based on the selected category from the external API.
- **Search Books**: Search for books by title or author using the search functionality, which queries the external API for relevant results.
- **API Documentation**: [Dbooks](dbooks_api.md)

## Contributing

We welcome contributions from the community! If you'd like to contribute to Book Buddy, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, please contact us at [trugrady@gmail.com](mailto:contact@bookbuddy.com)
