import { createClient } from 'redis'
import dotenv from 'dotenv'
dotenv.config()

// Create the client
const redisClient = createClient({ url: process.env.REDIS_URL })

// Attach error listener
redisClient.on('error', (err) => {
  console.error('❌ Redis Error:', err)
})

await redisClient.connect()

export default redisClient
