import React, { useState, useEffect } from "react";
import Web3 from 'web3';

import { CONTRACT_ADDRESS_MAIN, CONTRACT_ADDRESS_SELL } from '../../constants/contract';
import CONTRACT_MAIN_ABI from '../../constants/mintNFT.json';
import CONTRACT_SELL_ABI from '../../constants/sellNFT_CryptoArteSales.json';

import './App.css';
import '../FormsContainer/FormsContainer.css';

import { Button } from "../Button/Button";
import { FormsContainer } from "../FormsContainer/FormsContainer";

let web3 = new Web3(Web3.givenProvider);

const NETWORK_TYPE_INTERVAL = 2000;

export const App = () => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [walletError, setWalletError] = useState('Please connect MetaMask');
    const [currentNetworkType, setCurrentNetworkType] = useState(undefined as undefined | string);
    const [networkType, setNetworkType] = useState('main');
    const [tokenId, setTokenId] = useState(undefined as number | undefined);
    const [currentPage, setCurrentPage] = useState('');
    const [currentAccount, setCurrentAccount] = useState(undefined);
    const [currentTokenUrl, setCurrentTokenUrl] = useState('');
    const getCurrentNetworkType = () => web3.eth.net.getNetworkType().then((v) => setCurrentNetworkType(v));
    // @ts-ignore
    const getCurrentAccount = () => setCurrentAccount(web3.eth.accounts.currentProvider?.selectedAddress?.toLowerCase());
    // @ts-ignore
    window.init = ({ tokenId, networkType, page, newUrl }: Record<string, any>) => {
        if (tokenId) {
            setTokenId(tokenId);
        }
        if (networkType) {
            setNetworkType(networkType);
        }
        if (page) {
            setCurrentPage(page);
        }
        if (newUrl) {
            setCurrentTokenUrl(newUrl);
        }
    }
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
        getCurrentAccount();
        setInterval(getCurrentAccount, NETWORK_TYPE_INTERVAL);
        getCurrentNetworkType();
        setInterval(getCurrentNetworkType, NETWORK_TYPE_INTERVAL);
        // @ts-ignore
        if (window.nftConfig) {
            // @ts-ignore
            window.init(window.nftConfig);
        }
    }, []);

    // @ts-ignore
    const contractMain = new web3.eth.Contract(CONTRACT_MAIN_ABI, CONTRACT_ADDRESS_MAIN);
    // @ts-ignore
    const contractSell = new web3.eth.Contract(CONTRACT_SELL_ABI, CONTRACT_ADDRESS_SELL);
    const [errors, setErrors] = useState([] as string[]);
    const [isDone, setIsDone] = useState(false);
    const handleChangeCurrentPage = (page: string) => {
        setCurrentPage(page);
        setIsDone(false);
        setErrors([]);
    }

    return (
        <div className="App">
            {
                networkType !== currentNetworkType && (
                    <div className='App__title-text'>Please change <b>{currentNetworkType}</b> network type to <b>{networkType}</b></div>
                )
            }
            {
                networkType === currentNetworkType && (
                    <div className="App__content">
                        {
                            !isWalletConnected && (
                                <div className='Form App__center-form'>
                                    <div className='App__title-text'>{walletError}</div>
                                    <Button onClick={connectWallet} text='Connect' />
                                </div>
                            )
                        }
                        <FormsContainer
                            contractMain={contractMain}
                            contractSell={contractSell}
                            tokenId={tokenId}
                            currentAccount={currentAccount}
                            setErrors={setErrors}
                            setIsDone={setIsDone}
                            currentPage={currentPage}
                            currentTokenUrl={currentTokenUrl}
                            onChangeCurrentPage={handleChangeCurrentPage}
                        />
                    </div>
                )
            }
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
