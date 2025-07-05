# CodeJudge Frontend

A modern React frontend for the CodeJudge coding platform, built with React, Tailwind CSS, and Monaco Editor.

## 🚀 Features

- **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- **Authentication** - JWT-based login/registration system
- **Code Editor** - Monaco Editor with syntax highlighting for multiple languages
- **Problem Management** - Browse, search, and solve coding problems
- **Real-time Feedback** - Live submission results and status updates
- **Leaderboard** - View top performers and rankings
- **Admin Panel** - Full CRUD operations for problem management
- **Responsive Design** - Works perfectly on desktop and mobile devices

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Monaco Editor** - VS Code-like code editor
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Elegant toast notifications

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 3000

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/codejudge-frontend.git
   cd codejudge-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in the root directory
   echo "REACT_APP_API_URL=http://localhost:3000/api" > .env
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3001`

## 🎯 Usage

### For Users:
1. **Register/Login** - Create an account or sign in
2. **Browse Problems** - View available coding challenges
3. **Solve Problems** - Use the built-in code editor to write solutions
4. **Submit Code** - Get instant feedback on your submissions
5. **Track Progress** - View your dashboard and submission history
6. **Leaderboard** - See your ranking among other users

### For Admins:
1. **Admin Dashboard** - Access comprehensive management tools
2. **Create Problems** - Add new coding challenges
3. **Edit Problems** - Modify existing problems
4. **Manage Test Cases** - Add sample and hidden test cases
5. **Monitor Activity** - View platform statistics and user activity

## 🎨 Available Pages

- **/** - Dashboard (redirects to /dashboard)
- **/login** - User authentication
- **/register** - User registration
- **/dashboard** - User dashboard with stats and quick actions
- **/problems** - Problem listing with search and filters
- **/problems/:id** - Individual problem page with code editor
- **/leaderboard** - User rankings and statistics
- **/admin** - Admin dashboard (admin users only)

## 🔐 Authentication

The app uses JWT tokens for authentication:
- Tokens are stored in localStorage
- Automatic token refresh on API calls
- Protected routes for authenticated users
- Role-based access control for admin features

## 🎛️ Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern web browsers

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

### Tailwind CSS

The app uses a custom Tailwind configuration with:
- Custom color scheme (primary and secondary colors)
- Responsive breakpoints
- Custom component classes
- Dark theme support for code editor

## 🎯 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── Dashboard/
│   │   │   └── Dashboard.js
│   │   ├── Problems/
│   │   │   ├── Problems.js
│   │   │   └── ProblemDetail.js
│   │   ├── Leaderboard/
│   │   │   └── Leaderboard.js
│   │   ├── Admin/
│   │   │   └── AdminDashboard.js
│   │   ├── Layout/
│   │   │   └── Header.js
│   │   └── Common/
│   │       └── LoadingSpinner.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📦 Building for Production

Create a production build:
```bash
npm run build
```

The build files will be in the `build/` directory.

## 🚀 Deployment

The app can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Built with ❤️ by the CodeJudge team