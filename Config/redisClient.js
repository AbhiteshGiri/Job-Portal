// redisClient.js
const { createClient } = require('redis');

// Use environment variable for Upstash Redis URL
const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    tls: true, // Required by Upstash
  },
});

redisClient.on('error', (err) => console.error('Redis Error:', err));

(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
})();

module.exports = redisClient;
