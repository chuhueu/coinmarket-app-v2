import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Search from '../assets/svg/search'

import axios from 'axios';

export default function User() {
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

  const [session, setSession] = useState({});

  useEffect(() => {
    axios(`${process.env.REACT_APP_SERVER_URL}/authenticate`, {
      withCredentials: true,
    })
      .then(({ data }) => {
        const { iat, ...authData } = data; // remove unimportant iat value

        setSession(authData);
      })
      .catch((err) => {
        navigate('/');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signOut() {
    await axios(`${process.env.REACT_APP_SERVER_URL}/logout`, {
      withCredentials: true,
    });

    navigate('/');
  }

  return (
    <div className="pt-10 text-white mx-[10px]">
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
                onClick={signOut}
            >
                logout
            </button>
        </div>
      </div>
      <h3>User session:</h3>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
    // <div>
    //   <h3>User session:</h3>
    //   <pre>{JSON.stringify(session, null, 2)}</pre>
    //   <button type="button" onClick={signOut}>
    //     Sign out
    //   </button>
    // </div>
  );
}