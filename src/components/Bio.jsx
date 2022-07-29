import Pfp from './pfp'
import bunzz from "bunzz-sdk";
import { useState, useEffect } from 'react';
import NftContainer from './NftContainer';

const DAPP_ID = process.env.REACT_APP_DAPP_ID;
const API_KEY = process.env.REACT_APP_API_KEY;

const Bio = () => {
    const [handler, setHandler] = useState();
    const [userAddress, setUserAddress] = useState(null);
    const [sliced, setSliced] = useState([]);
    const [nfts, setNfts] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setup()
    }, [])
    function showHandler() {
        setShow(!show)
    }
    const setup = async () => {
        const handler = await bunzz.initializeHandler({
        dappId: DAPP_ID,
        apiKey: API_KEY,
        });
    
        const userAddress = await handler.getSignerAddress();
        
        console.log(userAddress);

        setUserAddress(userAddress);
        setSliced(userAddress.slice(0, 15))
        setHandler(handler);
    }
    const connectWallet = async () =>{
        if (typeof window.ethereum !== 'undefined') {
            const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setUserAddress(account[0]);
            setSliced(account[0].slice(0, 15))
        }
    }

    const getNfts = async () => {
        if(!userAddress) return;
        const response = await fetch(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${userAddress}`)
        const data = await response.json()
        setNfts(data.items);
    }

    useEffect(() => {
        getNfts()
    }, [userAddress])
  return (
    <div className='relative py-10'>
        <div>
            <Pfp/>
        </div>
        <div className='absolute top-28 bg-gray-200 w-full h-1'></div>
        <div className='relative'>
            <div className='p-5'>
                {
                    !userAddress ? <button className='rounded py-3 bg-[#592693] text-white w-40 hover:cursor-pointer' onClick={connectWallet}>Connect wallet</button> : <h1 onClick={() => { navigator.clipboard.writeText(userAddress)
                    alert("Wallet address copied!")
                    }} className='font-semibold hover:cursor-pointer'>{sliced}....</h1> 
                }
            </div>
            <div>
                <h1 className='p-5 text-xl md:text-2xl font-semibold'>NFTs in your wallet</h1>
            </div>
            <div>
                <NftContainer nfts={ nfts } />
            </div>
        </div>
    </div>
  )
}

export default Bio