import React from 'react'

const NftCard = ({nft}) => {
    let contract = nft.contract
    contract.toString()
  return (
    <div className='border-2 rounded-md p-3 relative my-5 md:m-0'>
        <div>
            <img className='w-60 h-60 my-5 mx-auto rounded-3xl shadow' src={nft.meta.content[0].url} />
        </div>
        <div className=''>
            {/* <span><h2 className='font-semibold'>Contract Address: </h2> {contract}</span>
            <h2>Collection Address: {nft.collection}</h2> */}
            <h2>Name: {nft.meta.name}</h2>
            <h2>Description: {nft.meta.description}</h2>
        </div>
        {/* <div>
            <button className='py-2 font-semibold rounded bg-[#592693] text-white w-20 hover:cursor-pointer'>List</button>
        </div> */}
    </div>
  )
}

export default NftCard