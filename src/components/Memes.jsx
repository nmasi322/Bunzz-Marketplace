import React, {useState} from 'react'

const Memes = ({ handler }) => {
  const [tokenId, setTokenId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [onGoing, setOnGoing] = useState(false);

  const submit = async () => {
    setOnGoing(true);
    try {
      const contract = await handler.getContract("NFT (IPFS Mintable)");
      const { data: tokenUri } = await contract.tokenURI(tokenId);
      const url = tokenUri.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/");
      const res = await fetch(url);
      const data = await res.json();
      setName(data.name);
      setDescription(data.description);
      setImage(data.image.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/"));
    } catch (err) {
      console.error(err);
    } finally {
      setOnGoing(false);
    }
  };
  return (
    <div className='p-5 md:p-0'>
      <h1 className='font-semibold text-xl md:text-2xl py-5'>View your Minted Meme</h1> 
        <input className='p-2 border-2 border-gray-300 rounded-lg outline-none'
          placeholder="token ID"
          value={tokenId}
          required
          onChange={(e) => setTokenId(e.target.value)}
          type="text"
        /><br/><br/>
        { 
          onGoing ? <button className="hover:cursor-pointer bg-[#592693] py-2 text-white font-semibold w-40 rounded">Loading...</button> : 
          <button className="hover:cursor-pointer bg-[#592693] py-2 text-white font-semibold w-40 rounded" onClick={submit}>View</button>
        }
        {
          name && 
          <div className='my-5 rounded border-2 p-3 md:mr-4'>
            {
              name ? <p className='font-semibold text-lg my-1'>Name: {name}</p> : <></>
            }
            {description ? <p>Description: {description}</p> : <></>}
            {tokenId ? <p>TokenID: {tokenId}</p> : <></>}
            {image ? <img className='rounded-lg my-3' src={image} alt="image" /> : <></>}
          </div>
        }
    </div>
  )
   
}

export default Memes