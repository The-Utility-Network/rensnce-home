import fs from 'fs';
import path from 'path';

const facetsData = JSON.parse(fs.readFileSync('facets_data.json', 'utf8'));
// Try to read contract_data.json if it exists, otherwise use an empty array
let contractData = [];
try {
    contractData = JSON.parse(fs.readFileSync('contract_data.json', 'utf8'));
} catch (e) {
    console.log('contract_data.json not found or invalid, proceeding with facets only.');
}

const outputDir = path.join('src', 'assets', 'contracts');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const contractsToExtract = [
    'RENSNCEDAODMND',
    'RENSNCEDRCTRY',
    'RENSNCERPSTRY',
    'RENSNCEUNDRWRTR',
    'MKVLIMNT',
    'RENSNCERSRV'
];

// Combine data sources
const allData = [...facetsData];
if (Array.isArray(contractData)) {
    allData.push(...contractData);
} else if (contractData) {
    // If contract_data is a single object (unlikely given previous context but possible)
    allData.push(contractData);
}

const extractedContracts = {};

allData.forEach(contract => {
    if (contractsToExtract.includes(contract.name)) {
        console.log(`Processing ${contract.name}...`);

        let sourceObj;
        try {
            // Source is a string containing JSON
            if (typeof contract.source === 'string') {
                // Remove double curly braces if they exist at the ends (sometimes Etherscan returns {{ ... }})
                let cleanSource = contract.source;
                if (cleanSource.startsWith('{{') && cleanSource.endsWith('}}')) {
                    cleanSource = cleanSource.slice(1, -1);
                }
                sourceObj = JSON.parse(cleanSource);
            } else {
                sourceObj = contract.source;
            }
        } catch (error) {
            console.error(`Error parsing source for ${contract.name}:`, error);
            return;
        }

        const sources = sourceObj.sources;
        if (!sources) {
            console.error(`No sources found for ${contract.name}`);
            return;
        }

        // Find the main file. 
        // Strategy: Look for the file that matches the contract name, e.g., "RENSNCEDAODMND.sol"
        // It might be nested in a path.
        let mainFileContent = '';
        let mainFilePath = '';

        for (const [filePath, fileData] of Object.entries(sources)) {
            if (filePath.includes(`${contract.name}.sol`)) {
                mainFileContent = fileData.content;
                mainFilePath = filePath;
                break;
            }
        }

        if (mainFileContent) {
            fs.writeFileSync(path.join(outputDir, `${contract.name}.sol`), mainFileContent);
            extractedContracts[contract.name] = mainFileContent;
            console.log(`Extracted ${contract.name} to ${path.join(outputDir, `${contract.name}.sol`)}`);
        } else {
            console.warn(`Could not find main file for ${contract.name}`);
        }
    }
});

// Generate index.ts
let indexContent = '';
for (const [name, content] of Object.entries(extractedContracts)) {
    // Escape backticks for template literals
    const escapedContent = content.replace(/`/g, '\\`').replace(/\$/g, '\\$');
    indexContent += `export const ${name}_SOURCE = \`${escapedContent}\`;\n\n`;
}

fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
console.log('Generated index.ts');
