import React, { useState, useEffect } from "react";
import Web3 from 'web3';

import { CONTRACT_ADDRESS_MAIN, CONTRACT_ADDRESS_SELL } from '../../constants/contract';
import CONTRACT_MAIN_ABI from '../../constants/mintNFT.json';
import CONTRACT_SELL_ABI from '../../constants/sellNFT_CryptoArteSales.json';

import './App.css';

import { FormAddress } from "../FormAddress/FormAddress";
import { FormMint } from "../FormMint/FormMint";
import { FormPurchase } from "../FormPurchase/FormPurchase";

const web3 = new Web3(Web3.givenProvider);

let tokenId: number | undefined;
// @ts-ignore
window.init = (initialParams: any) => {
    tokenId = initialParams.tokenId;
}

export const App = () => {
    useEffect(() => {
        // @ts-ignore
        window.ethereum.enable();
        // @ts-ignore
        setCurrentAccount(web3.eth.accounts.currentProvider.selectedAddress.toLowerCase());
    }, []);

    // @ts-ignore
    const contractMain = new web3.eth.Contract(CONTRACT_MAIN_ABI, CONTRACT_ADDRESS_MAIN);
    // @ts-ignore
    const contractSell = new web3.eth.Contract(CONTRACT_SELL_ABI, CONTRACT_ADDRESS_SELL);
    const [currentAccount, setCurrentAccount] = useState(undefined);
    const [errors, setErrors] = useState([] as string[]);
    const [isDone, setIsDone] = useState(false);

    return (
        <div className="App">
            <div className="App__content">
                <FormMint contractMain={contractMain} contractSell={contractSell} tokenId={tokenId} currentAccount={currentAccount} setErrors={setErrors} setIsDone={setIsDone} />

                <FormAddress contractMain={contractMain} currentAccount={currentAccount} setErrors={setErrors} setIsDone={setIsDone} />

                <FormPurchase contractSell={contractSell} tokenId={tokenId} currentAccount={currentAccount} setErrors={setErrors} setIsDone={setIsDone} />
            </div>
            {
                !!errors.length && (
                    <div className="App__errors">
                        {errors.map((error) => (
                            <div key={error} className="App__errors__error">{error}</div>
                        ))}
                    </div>
                )
            }
            { isDone && <div className="App__done">DONE</div> }
        </div>
    );
}
