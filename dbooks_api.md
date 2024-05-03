# External API Documentation: dBooks.org
Overview:
dBooks.org is an external API used by Book Buddy to fetch book information based on user search queries. It provides a wide range of books along with their details such as title, authors, description, and image.

Base URL:
https://www.dbooks.org/api/

## Endpoints:
### 1. Search Books

## Endpoint: /search/{query}

Method: GET

#### Description: Retrieves a list of books based on the search query provided by the user.

#### Parameters:
{query} (required): The search query entered by the user.
Response Format: JSON
Response Fields:
title: Title of the book.
authors: Authors of the book.
subtitle: Subtitle or description of the book.
image: URL of the book cover image.
#### Example Request:

#### GET /search/harry%20potter

#### Example Response:
json
{
  "books": [
    {
      "title": "Harry Potter and the Philosopher's Stone",
      "authors": "J.K. Rowling",
      "subtitle": "The magical adventure begins...",
      "image": "https://www.example.com/harry_potter.jpg"
    },
    // Additional book objects...
  ]
}
## 2. Get Book Details

## Endpoint: /book/{bookId}

Method: GET

#### Description: Retrieves detailed information about a specific book using its unique identifier.

#### Parameters:
{bookId} (required): The unique identifier of the book.

#### Response Format: JSON

#### Response Fields:
title: Title of the book.
authors: Authors of the book.
description: Detailed description of the book.
image: URL of the book cover image.
Example Request:
bash
#### example
GET /book/123456789
Example Response:
json
{
  "title": "Harry Potter and the Philosopher's Stone",
  "authors": "J.K. Rowling",
  "description": "The magical adventure begins...",
  "image": "https://www.example.com/harry_potter.jpg"
}

## Authentication:
The dBooks.org API does not require authentication for accessing public endpoints. However, rate limits may apply for unauthenticated requests.

## Rate Limits:
The API imposes rate limits to prevent abuse and ensure fair usage.
Unauthenticated requests may be subject to stricter rate limits compared to authenticated requests.

## Errors:
The API returns appropriate HTTP status codes and error messages to indicate any issues with the requests.
#### Common error codes include 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), and 429 (Too Many Requests).

## Usage Guidelines:
Users of the API are expected to adhere to the usage guidelines specified by dBooks.org.
Excessive usage or misuse of the API may result in rate limiting or account suspension.
