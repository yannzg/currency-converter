import { convertCurrency } from "./common.js";


// Registering service worker 

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
            console.log('✅ Service Worker registered:', reg.scope);
        })
        .catch(error => {
            console.error('❌ Service Worker registration failed:', error);
        });
}


const swapArrow = document.querySelector(".swap-arrow");
let rotation = 0;

const input = document.getElementById("fromAmount");
const output = document.getElementById("toAmount");

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");


const currencies = {
    'EUR': { flag: '🇪🇺', code: 'EUR', name: 'Euro' },
    'USD': { flag: '🇺🇸', code: 'USD', name: 'US Dollar' },
    'GBP': { flag: '🇬🇧', code: 'GBP', name: 'British Pound' },
    'CNY': { flag: '🇨🇳', code: 'CNY', name: 'Chinese Yuan' },
    'JPY': { flag: '🇯🇵', code: 'JPY', name: 'Japanese Yen' },
    'CAD': { flag: '🇨🇦', code: 'CAD', name: 'Canadian Dollar' },
    'AUD': { flag: '🇦🇺', code: 'AUD', name: 'Australian Dollar' },
    'CHF': { flag: '🇨🇭', code: 'CHF', name: 'Swiss Franc' },
    'NOK': { flag: '🇳🇴', code: 'NOK', name: 'Norwegian Krone' },
    'INR': { flag: '🇮🇳', code: 'INR', name: 'Indian Rupee' },
    'BRL': { flag: '🇧🇷', code: 'BRL', name: 'Brazilian Real' },
    'MXN': { flag: '🇲🇽', code: 'MXN', name: 'Mexican Peso' },
    'SGD': { flag: '🇸🇬', code: 'SGD', name: 'Singapore Dollar' },
    'HKD': { flag: '🇭🇰', code: 'HKD', name: 'Hong Kong Dollar' },
    'KRW': { flag: '🇰🇷', code: 'KRW', name: 'South Korean Won' },
    'TRY': { flag: '🇹🇷', code: 'TRY', name: 'Turkish Lira' },
    'RUB': { flag: '🇷🇺', code: 'RUB', name: 'Russian Ruble' },
    'ZAR': { flag: '🇿🇦', code: 'ZAR', name: 'South African Rand' },
    'SEK': { flag: '🇸🇪', code: 'SEK', name: 'Swedish Krona' },
    'NZD': { flag: '🇳🇿', code: 'NZD', name: 'New Zealand Dollar' },
    'PLN': { flag: '🇵🇱', code: 'PLN', name: 'Polish Złoty' },
    'THB': { flag: '🇹🇭', code: 'THB', name: 'Thai Baht' },
    'IDR': { flag: '🇮🇩', code: 'IDR', name: 'Indonesian Rupiah' },
    'AED': { flag: '🇦🇪', code: 'AED', name: 'UAE Dirham' },
    'PHP': { flag: '🇵🇭', code: 'PHP', name: 'Philippine Peso' }
}

// Conversion functions

async function convertFromTo() {
    try {
        const result = await convertCurrency(
            input.value,
            fromCurrency.value,
            toCurrency.value
        );
        output.value = result.toFixed(2);

    } catch (err) {
        console.error(err);
    }
}

async function convertToFrom() {
    try {
        const result = await convertCurrency(
            output.value,
            toCurrency.value,
            fromCurrency.value
        );
        input.value = result.toFixed(2);
    } catch (err) {
        console.log(err);
    }
}

// Saving latest conversion on browser

function saveToLocalStorage() {
    localStorage.setItem('fromCurrency', fromCurrency.value);
    localStorage.setItem('toCurrency', toCurrency.value);
    localStorage.setItem('fromAmount', input.value);
}

// Executing above functions

input.addEventListener("input", () => {
    convertFromTo();
    saveToLocalStorage();

});
fromCurrency.addEventListener("change", () => {
    convertFromTo();
    saveToLocalStorage();
});
toCurrency.addEventListener("change", () => {
    convertFromTo();
    saveToLocalStorage();
});

output.addEventListener("input", convertToFrom);

// Load saved values on page load

if (localStorage.getItem('fromCurrency')) {
    fromCurrency.value = localStorage.getItem('fromCurrency');
}
if (localStorage.getItem('toCurrency')) {
    toCurrency.value = localStorage.getItem('toCurrency');
}
if (localStorage.getItem('fromAmount')) {
    input.value = localStorage.getItem('fromAmount');
}

convertFromTo();

// Swapping both fields & adding a rotation effect

swapArrow.addEventListener("click", () => {

    // Swap
    const tempCurrency = fromCurrency.value;
    const tempAmount = input.value;

    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCurrency;

    input.value = output.value;
    output.value = tempAmount;

    // Rotation
    if (window.innerWidth > 768) {
        rotation -= 180;
        swapArrow.style.transform = `rotate(${rotation}deg)`;

    }
})


// Function to block the use of letter 'e'

function blockE(e) {
    if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
    }
};

input.addEventListener("keydown", blockE);
output.addEventListener("keydown", blockE);


convertFromTo()
