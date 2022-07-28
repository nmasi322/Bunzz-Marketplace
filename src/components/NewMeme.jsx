import { useState } from "react";
import { NFTStorage, File } from "nft.storage";
import Navbar from "./Navbar";
 
const nftStorage = new NFTStorage({
  token: process.env.REACT_APP_NFT_STORAGE_KEY,
}); 

const store = async (name, description, data, fileName, type) => {
  const metadata = await nftStorage.store({
    name,
    description,
    image: new File([data], fileName, { type }),
  });
  console.log(metadata);
  return metadata;
};

const NewMeme = ({ handler, userAddress, showHandler }) => {
  const [blob, setBlob] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [base64, setBase64] = useState(null);
  const [onGoing, setOnGoing] = useState(false);
  const [tokenId, setTokenId] = useState();
  const [listTkId, setListTkId] = useState()
  const [price, setPrice] = useState()
  const [type, setType] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const marketplaceAddress = "0x5B84Bc4832432D4F03BBeB436772162f1D0DAFd7"

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
      const contract = await handler.getContract("NFT (IPFS Mintable)");
      const inputUrl = metadata.url.replace(/^ipfs:\/\//, "");
      const tx = await contract.safeMint(userAddress, inputUrl);
      const receipt = await tx.wait();
      const event = receipt.events[0];
      const _tokenId = event.args[2];
      await contract.approve("0x5B84Bc4832432D4F03BBeB436772162f1D0DAFd7", _tokenId);
      setTokenId(_tokenId);
      setBase64(null);
      window.alert("Meme minted!"); 
    } catch (err) {
      console.error(err);
      alert("Error!")
    } finally {
      setOnGoing(false);
    }
  };

  const list = async () => {
    const contract = await handler.getContract("Simple Marketplace (For NFT)");
    const listed = await contract.list(tokenId, price)
    console.log(listed);
  }

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
      <div className="py-3 text-gray-700">
        <p>Use the token Id below to query for your minted meme. And make sure you have some Goerli eth. Get some <a className="underline" href='https://goerlifaucet.com/'>here</a></p>
        {tokenId ? <p className="font-semibold text-lg py-4">Token ID: {tokenId}</p> : <></>}

      </div>
      <div>
        <input type='text' onChange={(e) => setPrice(e.target.value)} />
        <button onClick={list}>List</button>
      </div>
    </div>
    </div>
  );
}

export default NewMeme