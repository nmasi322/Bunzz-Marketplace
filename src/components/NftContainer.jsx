import React from 'react'
import NftCard from './NftCard'

const NftContainer = ({nfts}) => {
  return (
    <div className='md:grid grid-cols-3 gap-3 px-3'>
    {
        nfts.map((nft, index) => {
            return <NftCard nft={nft} key={index} />
        })
    }
    </div>
  )
}

export default NftContainer