import { Redis } from "ioredis";
export const redis = new Redis({
    // host: '',
    // port: '',
    // password: '',
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