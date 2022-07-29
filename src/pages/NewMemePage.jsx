import React, {useState, useEffect} from 'react'
import bunzz from 'bunzz-sdk';
import NewMeme from '../components/NewMeme';
import Listings from '../components/Listings';
import Footer from '../components/Footer';

const DAPP_ID = process.env.REACT_APP_DAPP_ID;
const API_KEY = process.env.REACT_APP_API_KEY; 

const NewMemePage = () => {
  const [handler, setHandler] = useState();
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    setup()
  }, [handler, userAddress])

  const setup = async () => {
    const handler = await bunzz.initializeHandler({
      dappId: DAPP_ID,
      apiKey: API_KEY,
    });
    
    setHandler(handler);
    const userAddress = await handler.getSignerAddress();
    setUserAddress(userAddress);
  }
  return (
    <div>
    <div>
      <NewMeme bunzz={handler} userAddress={userAddress} />
      {/* <Listings userAddress={userAddress} /> */}
    </div>
    <div className='mt-6'>
      <Footer />
    </div>
    </div>
  )
}

export default NewMemePage