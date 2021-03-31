import React, { useState, useEffect } from "react";
import Web3 from 'web3';

import { CONTRACT_ADDRESS_MAIN, CONTRACT_ADDRESS_SELL } from '../../constants/contract';
import CONTRACT_MAIN_ABI from '../../constants/mintNFT.json';
import CONTRACT_SELL_ABI from '../../constants/sellNFT_CryptoArteSales.json';

import './App.css';
import '../Form/Form.css';

import { FormMint } from "../FormMint/FormMint";
import { FormPurchase } from "../FormPurchase/FormPurchase";
import { FormUrl } from "../FormUrl/FormUrl";
import { Button } from "../Button/Button";

let web3 = new Web3(Web3.givenProvider);

let tokenId: number | undefined;
// @ts-ignore
window.init = (initialParams: any) => {
    tokenId = initialParams.tokenId;
}

const NETWORK_TYPE_INTERVAL = 2000;

export const App = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [walletError, setWalletError] = useState('Please connect MetaMask');
    const [networkType, setNetworkType] = useState(undefined as undefined | string);
    const getNetworkType = () => web3.eth.net.getNetworkType().then((v) => setNetworkType(v));
    const connectWallet = () => {
        try {
            // @ts-ignore
            if (window.ethereum) {
                // @ts-ignore
                window.ethereum.enable()
                    .then(() => setIsWalletConnected(true))
                    .catch(() => setIsWalletConnected(false));
                // @ts-ignore
            } else if (window.web3) {
                web3 = new Web3(web3.currentProvider);
            } else {
                setWalletError('Please install MetaMask');
                setIsWalletConnected(false);
            }
        } catch (e) {
            setIsWalletConnected(false)
        }
    }

    useEffect(() => {
        connectWallet();
        // @ts-ignore
        setCurrentAccount(web3.eth.accounts.currentProvider?.selectedAddress?.toLowerCase());
        getNetworkType();
        setInterval(getNetworkType, NETWORK_TYPE_INTERVAL);
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
                {
                    !isWalletConnected && (
                        <div className='Form App__center-form'>
                            <div className='App__title-text'>{walletError}</div>
                            <Button onClick={connectWallet} text='Connect' />
                        </div>
                    )
                }
                <FormMint contractMain={contractMain} contractSell={contractSell} tokenId={tokenId} currentAccount={currentAccount} setErrors={setErrors} setIsDone={setIsDone} />

                <FormPurchase contractSell={contractSell} tokenId={tokenId} currentAccount={currentAccount} setErrors={setErrors} setIsDone={setIsDone} />

                <FormUrl contractMain={contractMain} currentAccount={currentAccount} setErrors={setErrors} setIsDone={setIsDone} />
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
