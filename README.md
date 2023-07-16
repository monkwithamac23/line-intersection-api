# LineString Intersection API

This is a Node.js server that provides an API to find intersections between a long LineString and a set of randomly spread lines.

## Requirements

- Node.js (>=14.0.0)
- npm (Node Package Manager)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/monkwithamac23/line-intersection-api.git
   cd line-intersection-api
Install dependencies:


npm install
Set the Authentication Token:
Replace the YOUR_AUTH_TOKEN placeholder in the code with your actual authentication token.

Start the server:


npm start
The server will now be running at http://localhost:8080.

API Endpoints
POST /checkIntersections
Find intersections between a LineString and a set of randomly spread lines.

Headers:

Authorization: Bearer YOUR_AUTH_TOKEN
Request Body:


{
  "type": "LineString",
  "coordinates": [[lon1, lat1], [lon2, lat2], ..., [lonN, latN]]
}
Response:

200 OK: Returns an array of intersecting lines and their corresponding intersection points. If no intersections are found, an empty array is returned.
400 Bad Request: Invalid linestring format or missing request body.
401 Unauthorized: Invalid or missing authentication token.
Input and Output Examples
Example 1: Valid Request
Request:


POST http://localhost:8080/checkIntersections
Authorization: Bearer YOUR_AUTH_TOKEN
Content-Type: application/json

{
  "type": "LineString",
  "coordinates": [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9]]
}
Response:


[
  {
    "id": "L1",
    "intersection": {
      "type": "Point",
      "coordinates": [1, 1]
    }
  },
  {
    "id": "L2",
    "intersection": {
      "type": "Point",
      "coordinates": [3, 3]
    }
  }
]
Example 2: No Intersections
Request:


POST http://localhost:8080/checkIntersections
Authorization: Bearer YOUR_AUTH_TOKEN
Content-Type: application/json

{
  "type": "LineString",
  "coordinates": [[-10, -10], [-5, -5], [0, 0], [5, 5], [10, 10]]
}
Response:


[]
License
This project is licensed under the MIT License - see the LICENSE file for details.

Author
Vipul kokane
GitHub: monkwithamac23



Make sure to replace the placeholders (e.g., `YOUR_AUTH_TOKEN)

