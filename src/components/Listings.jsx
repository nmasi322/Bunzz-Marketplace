import React, { useState, useEffect } from 'react'
import NftContainer from './NftContainer';

const Listings = ({userAddress}) => {
    const [nfts, setNfts] = useState(null)
    const getListings = async () => {
        if(!userAddress) return;
        const response = await fetch(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${userAddress}`)
        const data = await response.json()
        setNfts(data.items);
        console.log(nfts);
    }

    useEffect(() => {
        getListings()
    }, [userAddress])
  return (
    <div>
        <button onClick={getListings}>Connect</button>
    </div>
  )
}

export default Listings