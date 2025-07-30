# 🚀 CodeJudge Backend

A scalable **Node.js + Express** backend for a Coding Judge platform that securely evaluates code submissions in Docker, manages problems, and provides feedback to users.

---

## 📝 Features

✅ **User Authentication (JWT)**\
✅ **Admin Problem Management (Add, Edit, Delete)**\
✅ **Multi-language Code Submission (Python, C++, JavaScript)**\
✅ **Sandboxed Docker Execution**\
✅ **Rate Limiting (Redis + Express Rate-Limit)**\
✅ **Leaderboard (Top solvers)**\
✅ **WebSocket Real-time Submission Status (optional)**\
✅ **Discord Bot Integration**\
✅ **Swagger API Docs**

---

## ⚙️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Redis (rate limiter)
- Dockerode (code sandbox)
- Swagger (API docs)
- WebSocket (optional, for live updates)

---

## 🚀 Setup

### 1️⃣ Clone repo

```bash
git clone https://github.com/saivivek45/CodeJudge
cd CodeJudge
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up `.env`

Create a `.env` file in the backend directory:

```
PORT=3001
MONGODB_URL=mongodb://localhost:27017/codejudge
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=1d
REDIS_URL=redis://localhost:6379

# Discord Bot Configuration (Optional)
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_GUILD_ID=your_guild_id
DISCORD_CHANNEL_ID=your_channel_id
```

### 4️⃣ Ensure Docker & Redis are running

✅ Make sure Docker daemon is up\
✅ Make sure Redis server is running

---

## ▶️ Run

```bash
npm run dev
```

or

```bash
node server.js
```

---

## 📌 API Docs

Swagger UI available at:\
[**http://localhost:3001/api-docs**](http://localhost:3001/api-docs)

## 🤖 Discord Bot

The platform includes a Discord bot integration that allows users to:
- Browse problems via Discord commands
- View leaderboard and problem details
- Receive real-time submission notifications

For detailed bot setup instructions, see [BOT_SETUP.md](BOT_SETUP.md)

---

## 🌟 Sample Problems

Here’s an example payload to add a problem (as admin):

```json
{
  "title": "Multiply Two Numbers",
  "description": "Given two integers, print their product.",
  "difficulty": "easy",
  "inputFormat": "Two integers, each on a separate line.",
  "outputFormat": "Product of the two numbers.",
  "sampleTestCases": [
    {
      "input": "2\n3",
      "expectedOutput": "6"
    }
  ],
  "hiddenTestCases": [
    {
      "input": "5\n5",
      "expectedOutput": "25"
    }
  ]
}
```
## 🛡 Security

✅ Code runs in Docker containers\
✅ Rate limited via Redis\
✅ JWT-based auth

---

---

## 💡 Notes

- Supports Python, JavaScript, and C++.
- Easy to extend to more languages.
- Future-ready for features like plagiarism check, unit tests, etc.
