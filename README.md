#  Buzzing Chat

A real-time chat application built with React, Node.js, and WebSocket technology featuring a Bumble-inspired design.

##  Features

- **Real-time Messaging**: Instant message delivery using WebSocket connections
- **Typing Indicators**: See when other users are typing
- **Multi-user Simulation**: Switch between different user personas (You, Alice, Bob, Charlie)
- **Bumble-inspired Design**: Beautiful yellow and black theme
- **Responsive UI**: Works seamlessly on desktop and mobile devices
- **Auto-scroll**: Messages automatically scroll to the latest
- **Connection Status**: Real-time connection indicator
- **Message History**: Persistent message storage with initial sample messages

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Data fetching and caching
- **WebSocket** - Real-time communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **WebSocket (ws)** - WebSocket server
- **CORS** - Cross-origin resource sharing

##  Project Structure

```
buzzing-chat/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # React entry point
│   │   └── index.css      # Global styles
│   └── index.html         # HTML template
├── server/                # Backend Node.js application
│   ├── index.js           # Express server setup
│   └── storage.js         # In-memory data storage
├── shared/                # Shared utilities
│   └── schema.js          # Data validation schemas
├── package.json           # Project dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # Project documentation
```

##  Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/buzzing-chat.git
   cd buzzing-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - WebSocket: ws://localhost:5000/ws

##  Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run server` | Start only the backend server |
| `npm run client` | Start only the frontend development server |
| `npm run build` | Build the frontend for production |
| `npm run start` | Start the application in production mode |
| `npm run preview` | Preview the production build locally |
| `npm run clean` | Clean build directories |

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

- `NODE_ENV`: Set to `development` or `production`
- `PORT`: Server port (default: 5000)

### Port Configuration

- **Backend Server**: 5000
- **Frontend Dev Server**: 3000
- **WebSocket**: 5000/ws

##  Design System

### Color Palette

The application uses a Bumble-inspired color scheme:

- **Primary Yellow**: `#F7B500` (Bumble yellow)
- **Secondary Black**: `#000000` (Bumble black)
- **Accent Orange**: `#FF6B35` (Gradient accent)
- **Background**: `#FEFEFE` (Clean white)

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

##  API Endpoints

### REST API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/messages` | Fetch recent messages |
| `POST` | `/api/messages` | Send a new message |

### WebSocket Events

| Event | Description |
|-------|-------------|
| `message` | New message received |
| `typing` | User typing indicator |
| `initial_messages` | Initial message history |

## 🧪 Testing Multi-user Functionality

1. **Open multiple browser windows/tabs**
2. **Select different users** from the dropdown in each window
3. **Start typing** in one window to see typing indicators in others
4. **Send messages** to see real-time updates across all windows

##  Deployment

### Production Build

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

##  Assignment Requirements

This project fulfills the following requirements:

-  **Real-time chat functionality** with WebSocket
-  **Typing indicators** for enhanced UX
-  **Bumble-inspired design** with yellow/black theme
-  **Multi-user simulation** with user selection
-  **Professional code structure** with proper organization
-  **Required keywords**: `define-ocg` and `varOcg` variables
-  **Modern tech stack**: React, Node.js, WebSocket
-  **Responsive design** for mobile and desktop

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- Bumble for design inspiration
- React and Node.js communities
- WebSocket technology for real-time communication

---

**Built with ❤ by the TaskMaster Team**
