import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { rateLimit } from 'express-rate-limit'
import { RedisStore } from 'rate-limit-redis'
import redisClient from './config/redisClient.js'

import connectDB from './config/db.js'
import userController from './routes/authRoute.js'
import questionController from './routes/problemRoute.js'
import adminRouter from './routes/adminProblemRoute.js'
import submissionRouter from './routes/submissionRoutes.js'
import router from './routes/leaderBoard.js'
import swaggerDocs from './swagger.js';
import { createServer } from 'http';
import { Server } from 'socket.io';





dotenv.config()

const port = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(cors())
swaggerDocs(app);


const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});
app.set('io', io);

// ✅ Submit limiter
const submitLimiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redisClient.sendCommand(args) }),
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions. Please slow down!' }
})
app.use('/api/code', submitLimiter) // applies only to /api/code

// ✅ Global limiter
const globalLimiter = rateLimit({
  store: new RedisStore({ sendCommand: (...args) => redisClient.sendCommand(args) }),
  windowMs: 60 * 60 * 1000,
  limit: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in 1 hour.' }
})
// Apply globalLimiter to /api except /api/code
app.use('/api', (req, res, next) => {
  if (req.path.startsWith('/code')) return next()
  globalLimiter(req, res, next)
})

// ✅ Connect DB
connectDB()

// ✅ Routes
app.use('/api/auth', userController)
app.use('/api/problems', questionController)
app.use('/api/admin/problems', adminRouter)
app.use('/api/code', submissionRouter)
app.use('/api/leaderboard',router)

// ✅ Test route
app.get('/', (req, res) => {
  res.send('API WORKING')
})

server.listen(port, () => console.log(`Server running on port ${port}`));