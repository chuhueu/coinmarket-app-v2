import {React, useState} from 'react'
import Search from '../assets/svg/search'
import { useNavigate } from 'react-router-dom';

import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import axios from 'axios';


const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const tabs = [
    {
      id: 1,    
      text: 'Home',
      isBadge: false,
    },
    {
      id: 2,
      text: 'Exchanges',
      isBadge: false,
    },
    {
      id: 3,
      text: 'NFT',
      isBadge: true,
    },
    {
      id: 4,
      text: 'Watch list',
      isBadge: false,
    },
    {
      id: 5,
      text: 'Products',
      isBadge: true,
    },
    {
      id: 6,
      text: 'Learn',
      isBadge: false,
    },
  ]
  const navigate = useNavigate();

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // TODO: remove later
  const handleAuthFake = () => {
    setIsLogin(!isLogin)
  }

  const onChangeTab = (tab) => {
    console.log(tab)
    // eslint-disable-next-line default-case
    switch(tab.id) {
      case 1: {
        navigate('/')
        break;
      }
      case 2: {
        navigate('/exchanges')
        break;
      }
      case 3: {
        navigate('/nft')
        break;
      }
      default: navigate('/')
    }
  }

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
      network: 'evm'
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
    <div className="text-white flex bg-[#17171A] text-white h-20 gap-[100px] w-full p-[30px]">
      <div className="flex justify-center h-full max-w-screen-xl mx-auto px-4">
        <div className="flex justify-center items-center gap-[20px]">
            { tabs.map((tab, index) => {
                return (
                    <div onClick={() => onChangeTab(tab)} key={index} className="relative mr-1 cursor-pointer hover:opacity-60">
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
            {/* Change later */}
            {
              isLogin &&
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
            }
        </div>
      </div>
    </div>
  )
}

export default Header
