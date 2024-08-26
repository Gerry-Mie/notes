# Welcome to Notes API 🎉


### Notes API Documentation



#### Authentication

The API uses Firebase Authentication to secure access to the endpoints. you must authenticate using Google
account via the Firebase client to interact with the API.

#### Pagination

To handle large sets of notes, the API supports pagination.

- **Query Parameters**:
    - `page`: The page number (default: `1`).
    - `limit`: Number of items per page (default: `10`).

- **Example**:
    - **URL**: `/notes?page=2&limit=5`
    - **Description**: Retrieves the second page of notes with 5 notes per page.

#### Sorting

The API can be sorted based on different fields.

- **Query Parameters**:
    - `sort`: The field to sort by (default: `createdAt`).

- **Examples**:
    - **URL**: `/notes?sort=-title`
    - **Description**: Retrieves notes sorted by name in descending order using the shorthand `-title`. 
    - **URL**: `/notes?sort=title`
    - **Description**: Retrieves notes sorted by name in ascending order using the shorthand `title`.