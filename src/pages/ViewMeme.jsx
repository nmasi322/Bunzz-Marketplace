import React from 'react'
import bunzz from "bunzz-sdk";
import { useState, useEffect } from 'react';
import Memes from '../components/Memes';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DAPP_ID = process.env.REACT_APP_DAPP_ID;
const API_KEY = process.env.REACT_APP_API_KEY; 

const ViewMeme = () => {
    const [handler, setHandler] = useState();
    const [userAddress, setUserAddress] = useState(null);

    useEffect(() => {
        setup()
    }, [])
    const setup = async () => {
        const handler = await bunzz.initializeHandler({
        dappId: DAPP_ID,
        apiKey: API_KEY,
        });
    
        const userAddress = await handler.getSignerAddress();
        
        console.log(userAddress);

        setUserAddress(userAddress);
        setHandler(handler);
    }
  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div className='m-5 md:m-10 min-h-[80vh]'>
            <Memes handler={handler} />
        </div>
        <Footer/>
    </div>
  )
}

export default ViewMeme