import React, {useState, useEffect} from 'react'
import bunzz from 'bunzz-sdk';
import NewMeme from '../components/NewMeme';

const DAPP_ID = process.env.REACT_APP_DAPP_ID;
const API_KEY = process.env.REACT_APP_API_KEY; 

const NewMemePage = () => {
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
        <NewMeme handler={handler} userAddress={userAddress} />
    </div>
  )
}

export default NewMemePage