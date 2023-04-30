// 
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../lib/pool-node';
import { fetchAverageHashrate } from '@/lib/aleph-node'

//Type Script deffinitions for the API response
// block: string - the name of the pool. Optional
// error: string - the error message. Optional
type FoundBlock = {
    block: string,
    miner: string
}
type PoolData = {
    blocks?: [FoundBlock],
    networkHashrate?: number,
    poolHashrate?: string,
    currentEffort?: number,
    networkDifficulty?: string,
    poolLuck?: number,
    error?: string
}
/**
 * Mining Pool API handler
 * @param req 
 * @param res 
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PoolData>
) {
    // If the request is not a GET request, return an error
    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' })
    }
    else {
        // Return pool information
        const poolHashrate = await client.get('pool-hashrate');
        const hashrate = await fetchAverageHashrate("100000");
        const numHashrate = parseInt(hashrate);
        const difficulty =  numHashrate / (60 * 100000); // Calculate the difficulty. get the hashrate in MH/s and divide by 60*1000000 to get the difficulty in P
        const blocks: [FoundBlock] = [];
        const data = await client.hGetAll('foundBlocks');
        for (const [key, value] of Object.entries(data)) {
            blocks.push({ block: key, miner: value });
        }
        res.status(200).json({ blocks: blocks, hashrate: hashrate ,poolHashrate : poolHashrate, networkDifficulty: `${difficulty} P` })
    }

}