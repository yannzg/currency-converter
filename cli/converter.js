#!/usr/bin/env node

import { convertCurrency } from '../common.js';

// CLI Converter

const args = process.argv.slice(2);

async function main() {
    if (args.length !== 3) {
        console.log('Usage: fx <amount> <fromCurrency> <toCurrency>');
        console.log('Example: fx 100 USD EUR');
        process.exit(1);
    }

    const amount = args[0];
    const from = args[1];
    const to = args[2];

    if (isNaN(amount)) {
        console.log('Amount must be a number.');
        process.exit(1);
    }

    try {
        const result = await convertCurrency(amount, from.toUpperCase(), to.toUpperCase());
        console.log(`${amount} ${from.toUpperCase()} = ${result.toFixed(2)} ${to.toUpperCase()}`);
    } catch (error) {
        console.error(`${error.message}`);
        process.exit(1);
    }
}


main();


