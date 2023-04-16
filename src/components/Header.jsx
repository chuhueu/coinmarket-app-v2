import {React, useEffect, useState} from 'react'
import Search from '../assets/svg/search'
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import axios from 'axios';
import logoFake from '../assets/logo/logo-fake.jpg';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Header = () => {
  const userLocalStorage =
    localStorage.getItem('user-signature') ??
    localStorage.getItem('user-address') ??
    localStorage.getItem('user-profileId') ??
    ''
  const [accessAuth, setAccessAuth] = useState(userLocalStorage);
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setAccessAuth(userLocalStorage);
  }, [isLogin, userLocalStorage])
  const navigate = useNavigate();

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const onChangeTab = (tab) => {
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

    const verifyResult = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/verify`,
      {
        message,
        signature,
      },
      { withCredentials: true } // set cookie from Express server
    );

    if (!verifyResult) {
      return;
    }
    axios(`${process.env.REACT_APP_SERVER_URL}/authenticate`, {
      withCredentials: true,
    })
      .then(({ data }) => {
        const { iat, ...authData } = data; // remove unimportant iat value
         const {address, profileId, signature} = authData;
        if (authData) {
          setIsLogin(true);
          localStorage.setItem('user-address', address);
          localStorage.setItem('user-profileId', profileId);
          localStorage.setItem('user-signature', signature);
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const signOut = async () => {
    const result = await axios(`${process.env.REACT_APP_SERVER_URL}/logout`, {
      withCredentials: true,
    });

    if (result.status !== 200) {
      return;
    }

    setIsLogin(false);
    localStorage.removeItem('user-signature');
    localStorage.removeItem('user-address');
    localStorage.removeItem('user-profileId');
    handleClose();
  }
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
            {
              !accessAuth && (
                <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={() => handleAuth()}
                >
                  login
                </button>
              )
            }
            {accessAuth && (
              <>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar alt="A" src={logoFake} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={signOut}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
        </div>
      </div>
    </div>
  )
}

export default Header
