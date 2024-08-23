export function generateCode(length: number = 9): string {
    if (length < 1 || length > 9) {
        throw new Error("Length must be between 1 and 9.");
    }
    
    const min = Math.pow(10, length - 1); 
    const max = Math.pow(10, length) - 1; 
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
}

export function generateRegistration(): string {
    const registration = Math.floor(100000 + Math.random() * 900000).toString();
    return registration.padStart(6, '0');
}


