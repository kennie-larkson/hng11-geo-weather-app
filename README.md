# hng11-geo-weather-app

# Express Server

This is a simple Node.js Express TypeScript server that exposes an API GET endpoint. The endpoint takes a query parameter `visitor_name` and returns a response object which includes the client IP address, the location city of the client along with a custom message containing visitor_name and the temperature in Celsius of the city.

## Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Install the dependencies by running the following command:

   ```sh
   npm install
   ```

## Running the Server

### To start the server run the following command

```sh
npm start
```

The server will start running on http://localhost:3000

## API Endpoint

## GET /api/hello

The endpoint takes a query parameter `visitor_name` and returns a response object which includes the client IP address, the location city of the client along with a custom message containing visitor_name and the temperature in Celsius of the city.

Request

- Method: GET
- URL: /api/greet
- Query Parameter: \* visitor (optional): The name of the visitor to include in the greeting message.
  Response
- Content-Type: application/json
- Body:

```json
{
  "client_ip": "102.89.23.63",
  "location": "Lagos (Ikoyi)",
  "greeting": "Hello, Kehinde!, the temperature is 26.3 Celcius in Lagos (Ikoyi)"
}
```

## Example

To test the endpoint, you can use a web browser or a tool like curl or Postman.

## Using a Web Browser

Navigate to http://localhost:3000/api/hello?visitor=YourName. You should see a JSON response like this:

```json
{
  "client_ip": "102.89.23.63",
  "location": "Lagos (Ikoyi)",
  "greeting": "Hello, Kehinde!, the temperature is 26.3 Celcius in Lagos (Ikoyi)"
}
```

## Using curl

Run the following command in your terminal:

```sh
curl "http://localhost:3000/api/hellot?visitor=YourName"
```

## License

This project is licensed under the MIT License.
