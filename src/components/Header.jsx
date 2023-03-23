import React from 'react'
import Search from '../assets/svg/search'
import { useNavigate } from 'react-router-dom';

import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import axios from 'axios';


const Header = () => {    
//   const [tabs, setTabs] = useState([]);
  const tabs = [
    {
        text: 'Cryptpcurrencies',
        isBadge: true,
    },
    {
        text: 'Exchanges',
        isBadge: false,
    },
    {
        text: 'NFT',
        isBadge: true,
    },
    {
        text: 'Cryptown',
        isBadge: true,
    },
    {
        text: 'Portfolio',
        isBadge: false,
    },
    {
        text: 'Watch list',
        isBadge: false,
    },
    {
        text: 'Products',
        isBadge: true,
    },
    {
        text: 'Learn',
        isBadge: false,
    },
  ]
  const navigate = useNavigate();

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleAuth = async () => {
    //disconnects the web3 provider if it's already active
    if (isConnected) {
      await disconnectAsync();
    }
    // enabling the web3 provider metamask
    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    });

    const userData = {
      address: account,
      chain: chain.id,
      network: 'evm',
      // domain: 'hieucv-nft-v2.netlify.app',
      // statement: 'Please sign this message to confirm your identity.',
      // uri: 'http://localhost:3000',
      // timeout: 15
    };
    console.log(userData)
    // making a post request to our 'request-message' endpoint
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/request-message`,
      userData,
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    const message = data.message;
    // signing the received message via metamask
    const signature = await signMessageAsync({ message });

    await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/verify`,
      {
        message,
        signature,
      },
      { withCredentials: true } // set cookie from Express server
    );

    // redirect to /user
    navigate('/user');
  };
  return (
    <div className="text-white flex mx-[10px]">
      <div className="flex justify-center h-full max-w-screen-xl mx-auto px-4">
        <div className="flex justify-center items-center gap-[20px]">
            { tabs.map((tab, index) => {
                return (
                    <div key={index} className="relative mr-1 cursor-pointer hover:opacity-60">
                        <div className="text-white flex mx-[10px]">{tab.text}</div>
                        {tab.isBadge && <div className="rounded-full bg-blue-600 h-1 w-1 absolute bottom-5 right-0 top-1 ring-4"/>}
                    </div>
                )
            })}

            <div className='flex items-center'>
                <div className="flex items-center justify-center p-2 rounded bg-[#171924]">
                    <Search />
                    <input className="bg-transparent outline-none text-white w-70 ml-3" placeholder='Search' />
                </div>
            </div>
            <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => handleAuth()}
            >
                login
            </button>
        </div>
      </div>
    </div>
  )
}

export default Header
