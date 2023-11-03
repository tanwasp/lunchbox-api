# LunchBox WebApp

This is a backend of a restaurant search and review web app. This repository contains four folders:
* __backend_mongoDB__: the backend linked to a mongoDB database. Fully functional for this iteration.
* **backend_postgreSQL**: the backend linked to a postgreSQL database. Currently non functional
* **backend-firestore**: the backend linked to firestore
* **frontend**: the frontend of the web app developed using react.js

## Technologies
* __Languages__: JavaScript with Node and Express
* __Database__: Changing from MongoDB to Firestore

## How to use
Currently, only the mongoDB version of the backend server is working completely. 
1. Clone the repository
2. Set up a mongoDB restaurant dataset with the following format/ fields
3. Run "npm install"
4. Run "npm start"
5. Navigate to frontend/
6. Run "npm install"
7. Run "npm start"!

### HTTP requests and URLs
default - /api/v1/restaurants
example urls are assuming a port of 5000
#### Searching/ Checking out Restaurants
- **/** 
    - type: GET
    - this searches for restaurants based on filters: 
        - name: returns restaurants that contain name in the restaurant name
            - example http://localhost:5000/api/v1/restaurants?name=cafe
        - zipcode
            - example http://localhost:5000/api/v1/restaurants?zipcode=10101
        - cuisine
            - example http://localhost:5000/api/v1/restaurants?cuisine=India
        - page
            - http://localhost:5000/api/v1/restaurants?page=2
    - with no parameters, it returns a homepage of the first 20 restaurants in the mongoDB database
        - example http://localhost:5000/api/v1/restaurants
    - with full parameters
        - http://localhost:5000/api/v1/restaurants?name=cafe&zipcode=10012&cuisine=India&page=3
    - calls RestaurantCtrl.apiGetRestaurants


- **/id/:id**
    - type: GET
    - gets the reviews of a restaurant
    - calls RestaurantCtrl.apiGetRestaurantById
    - example http://localhost:5000/api/v1/restaurants/id/5eb3d668b31de5d588f42a35


- **/cuisines**
    - type: GET
    - this gets a list of the distinct cuisines available 
    - calls RestaurantCtrl.apiGetRestaurantCuisines
    - example http://localhost:5000/api/v1/restaurants/cuisines


- **/review**
    - type: POST
        - posts a review for a restaurant
        - body takes an object with the fields as shown in the example below
        - ```
            {
             "restaurant_id": "5eb3d668b31de5d588f4292a",
            "text": "Always love the food here",
            "user_id": "6969",
            "name": "Messi"
            }
            ```
        - adds a document to the reviews collection (which it creates if it doesn't exist) 
        - url http://localhost:5000/api/v1/restaurants/review
    - type: PUT
        - edits a review for a restaurant
        - body takes an object with the fields as shown in the example below
        - ```
            {
             "review_id": "2345eb3d668b31de5d588f4292a",
            "text": "The worst food in the world",
            "user_id": "6969",
            "name": "Messi"
            }
            ```
        - url http://localhost:5000/api/v1/restaurants/review
    - type: DELETE
        - deletes a review for a restaurant
        - url request takes id query for review id
            - example: http://localhost:5000/api/v1/restaurants/review?id=652c5a548db04b6b4d38f97f
        - body takes an object with the fields as shown in the example below
        - ```
            {
            "user_id": "6969",
            "name": "Messi" (optional)
            }
            ```
    - type: GET
        TO BE ADDED




