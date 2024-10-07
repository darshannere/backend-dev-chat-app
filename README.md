WebSocket Chat Application
# WebSocket Chat Application

This project is a simple WebSocket-based real-time chat application built using Node.js, Express, and WebSocket. The server allows users to join the chat, send messages, and view connected users in real time.

## Features

- Real-time chat functionality with WebSocket.
- Users can join the chat with a username.
- Broadcast messages to all connected users.
- Show a list of currently connected users.
- Handle user disconnects gracefully by removing them from the connected users list.
- API endpoint to get the list of currently connected users.

## Prerequisites

To run this project, you need to have Node.js and npm (Node Package Manager) installed on your machine.

You can download Node.js from [here](https://nodejs.org/).

## Installation

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/websocket-chat-app.git
cd websocket-chat-app
```

Install the dependencies:

```bash
npm install
```

## Running the Server

Start the WebSocket server by running:

```bash
npm start
```

The server will be running on [http://localhost:4000](http://localhost:4000).

## API Endpoints

### Get Connected Users

You can fetch the list of currently connected users using the following endpoint:

```http
GET /api/connected-users
```

This will return a JSON response with the list of connected users.

## WebSocket Message Structure

### 1. Joining the Chat

When a user joins the chat, the client should send a message with the following structure:

```json
{
    "type": "join",
    "username": "user123"
}
```

### 2. Sending a Chat Message

When a user sends a message, the client should send a message with the following structure:

```json
{
    "type": "message",
    "content": "Hello, world!"
}
```

### 3. Broadcasted Message Format

The server will broadcast messages to all connected clients in the following format:

```json
{
    "message": "user123: Hello, world!"
}
```

### 4. Connected Users Broadcast

Whenever a user joins or leaves the chat, the server will broadcast the list of connected users:

```json
{
    "type": "connected-users",
    "connectedUsers": ["user123", "user456"]
}
```

## Static Files

If you have a client application, place the built frontend files in the `client/build` directory. The server will serve these files as static assets.

## License

This project is licensed under the MIT License.

Feel free to modify this project and add more features!