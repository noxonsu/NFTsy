export const validateAddress = (address) => {
    return address.startsWith('0x');
}

export const validateUrl = (url) => {
    return url.startsWith('https://');
}

export const ERROR_ADDRESS_TEXT = 'Wrong address: It should starts with 0x';
export const ERROR_URL_TEXT = 'Wrong url: It should starts with https://';