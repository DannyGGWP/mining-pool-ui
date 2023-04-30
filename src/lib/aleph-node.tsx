/**
 * @fileoverview Aleph Node API
 */
/**
 * Fetches the balance of a wallet
 * @param walletName the name of the wallet
 * @returns the balance of the wallet
 */
export async function fetchBalance(walletName:string) {
    const alephNode = process.env.REACT_APP_ALEPH_NODE_URL;
    const alephPort = process.env.REACT_APP_ALEPH_NODE_PORT;
    try {
        const res = await fetch(`${alephNode}:${alephPort}/wallet/${walletName}/balance`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
    
}
/**
 * fetches the node info
 * @returns the node info in JSON format
 */
export async function fetchNodeInfo() {
    const alephNode = process.env.REACT_APP_ALEPH_NODE_URL;
    const alephPort = process.env.REACT_APP_ALEPH_NODE_PORT;
    try {
        const res = await fetch(`${alephNode}:${alephPort}/infos/node`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
    
}
/**
 * Fetch the average hash rate of the network for the last time period
 * @param timePeriod the time period to fetch the average hash rate for
 * @returns the average hash rate of the network for the last time period
 */
export async function fetchAverageHashrate(timePeriod:string) {
    const alephNode = process.env.NODE_API_HOST;
    const alephPort = process.env.NODE_API_PORT;
    try {
        const reqUrl = `http://${alephNode}:${alephPort}/infos/current-hashrate?timespan=${timePeriod}`;
        const res = await fetch(reqUrl,{
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'X-API-KEY': process.env.NODE_API_KEY,
            },
        }); 
        const data = await res.json();
        
        return data['hashrate'];
    } catch (error) {
        console.log(error);
    }
}

// Path: mining-pool-ui\src\lib\aleph-wallet.tsx

