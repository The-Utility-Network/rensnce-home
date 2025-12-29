import fs from 'fs';
import path from 'path';

const API_KEY = process.env.BASESCAN_API_KEY;
if (!API_KEY) {
    console.error("Error: BASESCAN_API_KEY environment variable is not set.");
    process.exit(1);
}
const DIAMOND_ADDRESS = '0x389dfbCB6Ee872efa97bb5713d76DdA8419Af8CC';
const CHAIN_ID = 8453; // Base
const API_URL_BASE = `https://api.etherscan.io/v2/api?chainid=${CHAIN_ID}`;

// Selector for facetAddresses() is 0x52ef6b2c
const DATA = '0x52ef6b2c';

async function fetchFacets() {
    console.log(`Fetching facet addresses for ${DIAMOND_ADDRESS}...`);

    // 1. Get Facet Addresses
    try {
        const callUrl = `${API_URL_BASE}&module=proxy&action=eth_call&to=${DIAMOND_ADDRESS}&data=${DATA}&tag=latest&apikey=${API_KEY}`;
        const response = await fetch(callUrl);
        const json = await response.json();

        if (json.error) {
            throw new Error(`RPC Error: ${json.error.message}`);
        }

        const rawResult = json.result; // Hex string
        if (!rawResult || rawResult === '0x') {
            throw new Error('Empty result from facetAddresses()');
        }

        // Parse ABI encoded address[]
        // Format: 
        // 0x0...20 (offset to array data, usually 0x20)
        // 0x0...COUNT (number of addresses)
        // 0x...ADDR1
        // 0x...ADDR2

        // Remove 0x
        const cleanResult = rawResult.substring(2);
        console.log('Raw Result Length:', cleanResult.length);
        console.log('Raw Result (First 200 chars):', cleanResult.substring(0, 200));

        // Read count (skipping first 32 bytes / 64 chars offset)
        const countHex = cleanResult.substring(64, 128);
        console.log('Count Hex:', countHex);
        const count = parseInt(countHex, 16);

        console.log(`Found ${count} facets.`);

        const addresses = [];
        for (let i = 0; i < count; i++) {
            const start = 128 + (i * 64);
            const addrHex32 = cleanResult.substring(start, start + 64);
            // specific address is last 40 chars
            const addr = '0x' + addrHex32.substring(24);
            addresses.push(addr);
        }

        console.log('Facet Addresses:', addresses);

        // 2. Fetch Source for each facet
        const facetsData = [];

        for (const addr of addresses) {
            console.log(`Fetching source for facet: ${addr}...`);
            await new Promise(r => setTimeout(r, 200)); // Rate limit

            const sourceUrl = `${API_URL_BASE}&module=contract&action=getsourcecode&address=${addr}&apikey=${API_KEY}`;
            const srcResp = await fetch(sourceUrl);
            const srcData = await srcResp.json();

            if (srcData.status === '1' && srcData.result[0]) {
                const res = srcData.result[0];
                facetsData.push({
                    address: addr,
                    name: res.ContractName,
                    source: res.SourceCode
                });
                console.log(`  - Retrieved ${res.ContractName}`);
            } else {
                console.warn(`  - Failed to get source for ${addr}`);
            }
        }

        const outputPath = path.join(process.cwd(), 'facets_data.json');
        fs.writeFileSync(outputPath, JSON.stringify(facetsData, null, 2));
        console.log(`Saved facet data to ${outputPath}`);

    } catch (e) {
        console.error('Error fetching facets:', e);
    }
}

fetchFacets();
