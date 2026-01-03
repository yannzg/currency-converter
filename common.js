export const API_URL = 'https://api.frankfurter.app/latest';


export async function convertCurrency(amount, from, to) {
    if (from === to) {
        return Number(amount);
    }
    
    const url = `${API_URL}?from=${from}&to=${to}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch exchange rate.");
    }

    const data = await res.json();
    return Number(amount) * data.rates[to];
}