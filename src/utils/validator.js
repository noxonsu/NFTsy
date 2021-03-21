export const validateTokenId = (tokenId) => {
    return tokenId > 0;
}

export const validateUrl = (url) => {
    return url.startsWith('https://');
}

export const ERROR_TOKEN_ID_TEXT = 'Wrong tokenId: It should be greater than 0';
export const ERROR_URL_TEXT = 'Wrong url: It should starts with https://';
export const ERROR_CONTRACT_TEXT = 'Error with contract connection';