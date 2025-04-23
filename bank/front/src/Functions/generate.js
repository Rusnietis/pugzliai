export default function generateInvoiceNumber() {
    const randomDigits = Math.floor(100000000 + Math.random() * 900000000);
    return `LT ${randomDigits}`;
    
}

//console.log(generateInvoiceNumber())
