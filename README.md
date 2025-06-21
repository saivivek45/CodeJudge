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
git clone <YOUR_REPO_URL>
cd CodeJudge
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up `.env`

Create a `.env` file in the root:

```
PORT=3000
MONGODB_URL=mongodb://localhost:27017/codejudge
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=1d
REDIS_URL=redis://localhost:6379
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
[**http://localhost:3000/api-docs**](http://localhost:3000/api-docs)

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

