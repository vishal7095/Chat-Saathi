# Real-Time Chat Application: Chat-Saathi

A real-time chat application using **Socket.IO** for messaging, built with **Node.js** (backend) and **React** (frontend).

## Features
- Real-time messaging
- User authentication with JWT
- Group chat functionality
- Notifications for new messages

## Technologies
- **Frontend**: React, Chakra UI, Socket.IO Client
- **Backend**: Node.js, Express, Socket.IO, MongoDB
- **Authentication**: JWT

## Installation

### Backend Setup
1. Navigate to the `backend` folder.
2. Install dependencies:  
   ```bash
   npm install
   Set up environment variables in .env.
3. Start the server:
   ```bash
   npm start
   
### Frontend Setup
1. Navigate to the frontend folder.
2. Install dependencies:
   ```bash
   npm install
3. Update the Socket.IO endpoint in the frontend code.
Start the frontend:
   ```bash
   npm start build

### API Endpoints
- POST /api/chat: Access or create a chat
- GET /api/chat: Fetch chats
- POST /api/chat/group: Create a group chat
- PUT /api/chat/rename: Rename a group chat
  
### Socket Events
- setup: Authenticate socket connection
- typing: Emit when a user is typing
- new message: Emit when a new message is sent
