import {createClient} from 'redis'; 
const redisURL = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`; 
console.log(redisURL);
export const client = createClient({url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`});

client.on('error', (err) => {
    console.log('Redis Error | ' + err);
}
);

client.connect();
