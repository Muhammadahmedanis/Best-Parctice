import { Redis } from "ioredis";
export const redis = new Redis({
    host: process.env.REDIS_HOST_URL,
    port: process.env.REDIS_PORT_NUMBER,
    password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
    console.log("Redis is connected");
});

redis.on('close', () => {
    console.log('Connection closed');
});

redis.on('error', (err) => {
    console.error('Error with Redis:', err);
});