export const validateTokenId = (tokenId) => {
    return tokenId > 0;
}

export const validateUrl = (url) => {
    return url.startsWith('https://');
}

export const validateAddress = (url) => {
    return url.startsWith('0x');
}

export const ERROR_TOKEN_ID_TEXT = 'Wrong tokenId: It should be greater than 0';
export const ERROR_PRICE_TEXT = 'Wrong price: It should be greater than 0';
export const ERROR_PURCHASE_VALUE_TEXT = 'Wrong purchase value: It should be greater than 0';
export const ERROR_URL_TEXT = 'Wrong url: It should starts with https://';
export const ERROR_ADDRESS_TEXT = 'Wrong address: It should starts with 0x';
export const ERROR_CONTRACT_TEXT = 'Error with contract connection';