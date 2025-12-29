import fs from 'fs';
import path from 'path';

const API_KEY = process.env.BASESCAN_API_KEY;
if (!API_KEY) {
    console.error("Error: BASESCAN_API_KEY environment variable is not set.");
    process.exit(1);
}
const CONTRACT_ADDRESS = '0x389dfbCB6Ee872efa97bb5713d76DdA8419Af8CC';
const CHAIN_ID = 8453; // Base

// BaseScan API URL (Etherscan V2 compatible)
// Note: Etherscan V2 might just need the standard basescan api endpoint for getsourcecode
const API_URL = `https://api.etherscan.io/v2/api?chainid=${CHAIN_ID}&module=contract&action=getsourcecode&address=${CONTRACT_ADDRESS}&apikey=${API_KEY}`;

async function fetchContract() {
    console.log(`Fetching source code for ${CONTRACT_ADDRESS} on Base (${CHAIN_ID})...`);

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.status !== '1') {
            throw new Error(`API Error: ${data.message} - ${data.result}`);
        }

        const result = data.result[0];

        // Log some basic info
        console.log(`Contract Name: ${result.ContractName}`);
        console.log(`Compiler Version: ${result.CompilerVersion}`);
        console.log(`Proxy: ${result.Proxy}`);
        console.log(`Implementation: ${result.Implementation}`);

        // Save raw output to file for inspection
        const outputPath = path.join(process.cwd(), 'contract_data.json');
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log(`Full response saved to ${outputPath}`);

        // If it's a Diamond or Proxy, we might need to fetch the implementation source as well if it's not included
        // Etherscan usually returns the proxy source. If it's verified as a proxy, 'Implementation' field will have address.
        if (result.Proxy === '1' && result.Implementation) {
            console.log(`Detected Proxy. Implementation address: ${result.Implementation}`);
            // We might need to fetch the implementation source separately if the user wants the "facets"
            // But for a Diamond, usually the "Diamond" contract itself is just the shell.
            // The user mentioned "Diamond contract... primary contracts for each facet".
            // A Diamond (EIP-2535) has *multiple* implementation contracts (facets).
            // Etherscan's standard API might not list all facets in 'Implementation' field strictly like a single proxy.
            // We need to check if the source code includes the Diamond Loupe or if we need to query the DiamondLoupe facet to get all facets.
        }

    } catch (error) {
        console.error('Failed to fetch contract:', error);
    }
}

fetchContract();
