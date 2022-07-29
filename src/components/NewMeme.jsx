import { useState } from "react";
import { NFTStorage, File } from "nft.storage";
import Navbar from "./Navbar";
import SuccessfulMint from "./SuccessfulMint";
 
const nftStorage = new NFTStorage({
  token: process.env.REACT_APP_NFT_STORAGE_KEY,
}); 

const store = async (name, description, data, fileName, type) => {
  const metadata = await nftStorage.store({
    name,
    description,
    image: new File([data], fileName, { type }),
  });
  return metadata;
};

const NewMeme = ({ bunzz, userAddress }) => {
  const [blob, setBlob] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [base64, setBase64] = useState(null);
  const [onGoing, setOnGoing] = useState(false);
  const [tokenId, setTokenId] = useState();
  const [tokenIds, setTokenIds] = useState([]);
  const [listTkId, setListTkId] = useState()
  const [success, setSuccess] = useState(false)
  const [price, setPrice] = useState()
  const [type, setType] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const marketplaceAddress = "0x087C92658F7387696A0b94f969d06bcB58E25a3b"
  const marketplaceContract = bunzz?.getContract("Simple Marketplace (For NFT)")
  const nftContract = bunzz?.getContract("NFT (IPFS Mintable)")
  function showHandler(){
    setSuccess(!success)
  }
  const select = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      readAsBlob(file);
      readAsBase64(file);
      setType(file.type);
      setFileName(file.name);
    }
  };

  const readAsBlob = (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      console.log(reader.result);
      setBlob(reader.result);
    };
  };

  const readAsBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      setBase64(reader.result);
    };
  };

  const submit = async () => {
    setOnGoing(true);
    try {
      const metadata = await store(name, description, blob, fileName, type);
      const contract = await nftContract;
      const inputUrl = metadata.url.replace(/^ipfs:\/\//, "");
      const tx = await contract.safeMint(userAddress, inputUrl);
      const receipt = await tx.wait();
      const event = receipt.events[0];
      const _tokenId = event.args[2];
      await contract.approve(marketplaceAddress, _tokenId);
      setTokenId(_tokenId);
      setTokenIds(prev => [...prev, _tokenId])
      console.log(tokenIds);
      setBase64(null);
      setSuccess(true)
    } catch (err) {
      console.error(err);
      alert("Error!")
    } finally {
      setOnGoing(false);
    }
  };

  const list = async () => {
    const contract = await marketplaceContract;
    const listed = await contract.list(listTkId, price)
    console.log(listed);
  }

  // const listings = async () => {
  //   const contract = await marketplaceContract;
  //   const listedNft = await contract.listings(getListedTkId)
  //   console.log(listedNft);
  // }

  // const buy = async () => {
  //   const contract = await marketplaceContract;
  //   const bought = await contract.buy()
  // }

  return (
    <div>
    <div>
      <Navbar/>
    </div>
    <div className="relative text-center h-full duration-500 w-3/4 mx-auto rounded shadow-lg pb-4 my-10">
      <h1 className="text-lg md:text-xl my-4 font-bold">
        Mint your new meme
      </h1>
      <input className="border-2 outline-none border-gray-400 px-4 py-2 rounded"
        placeholder="Meme Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      /><br/><br/>
      <input  className="border-2 outline-none border-gray-400 px-4 py-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
      /><br/><br/>
      <h1 className="font-semibold">Upload the meme</h1>
      <input type="file" accept="image/*" onChange={select} />
      {base64 ? (
          <img className="mx-auto rounded-lg my-8" src={base64} alt="hoge" />
      ) : (
        <></> 
      )}<br/><br/>
      {onGoing ? (
        <div className="hover:cursor-pointer bg-[#592693] py-2 text-white font-semibold w-40 mx-auto rounded">
          Loading...
        </div>
      ) : (
        <button className="hover:cursor-pointer bg-[#592693] py-2 text-white font-semibold w-40 rounded" onClick={submit}>
          Mint
        </button>
      )}
      <div className="py-3 px-5 md:px-10 text-gray-700">
        <p>Use the token Id below to query for your minted meme on the "View Meme" page. And make sure you have some Rinkeby eth. Get some <a className="underline" href='https://rinkebyfaucet.com/'>here</a></p>
        {tokenId ? <p className="font-semibold text-lg py-4">Token ID: {tokenId}</p> : <></>}
      </div>
      {
        success && <SuccessfulMint remove={showHandler} />
      }
      
      {/* <div>
      <input className="border-2 outline-none border-gray-400 px-4 py-2 rounded" type='text' onChange={(e) => setGetListedTkId(e.target.value)} />
        <button className="hover:cursor-pointer bg-[#592693] py-2 text-white font-semibold w-40 rounded" onClick={listings}>Get Listed</button>
      </div> */}
    </div>
    <div className="text-center">
    <h1 className="font-bold text-lg md:text-xl my-7">List your minted Nft on the marketplace</h1>
      <div>
        <input placeholder="Token Id" className="border-2 outline-none border-gray-400 px-4 py-2 rounded" type='text' onChange={(e) => setListTkId(e.target.value)} /><br/><br/>
        <input placeholder="Price (in wei)" className="border-2 outline-none border-gray-400 px-4 py-2 rounded" type='text' onChange={(e) => setPrice(e.target.value)} /><br/><br/>
        <button className="hover:cursor-pointer bg-[#592693] py-2 text-white font-semibold w-40 rounded" onClick={list}>List</button>
        </div>
    </div>
    </div>
  );
}

export default NewMeme