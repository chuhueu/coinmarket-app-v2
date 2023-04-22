import React from 'react'
import { useContext, useEffect, useState, useCallback } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { CoinMarketContext } from '../../context/context'
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { ethers } from 'ethers';

const ProductContent = () => {
    const toAddress = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
    const price = 0;
    const [usdPrice, setUsdPrice] = useState(0);
    const navigate = useNavigate();
    let { getListProduct } = useContext(CoinMarketContext)
    let [productData, setProductData] = useState([])
    const [state, setState] = useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    useEffect(() => {
      setData();
      getPrice();
    }, [])
  
    const setData = useCallback(async () => {
      try {
        const products = await getListProduct()
        setProductData(products)
      } catch (e) {
        console.log(e.message)
      }
    }, [getListProduct])
  
    const getPrice = async () => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/ethtoken`);
      setUsdPrice(response.data.usdPrice.toFixed(2));
    }
  
    const handleClick = (newState, code) => async () => {
      const userLocalStorage =
        localStorage.getItem('user-signature') ??
        localStorage.getItem('user-address') ??
        localStorage.getItem('user-profileId') ??
        ''
      if (!userLocalStorage) {
        setState({ open: true, ...newState });
        return; 
      }
      navigate(
        `/product/info/${code}`,
      )
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   console.log(provider)
    //   await provider.send("eth_requestAccounts", []);
    //   const signer = provider.getSigner();
    //   const tx = signer.sendTransaction({
    //     to: toAddress,
    //     value: ethers.utils.parseEther((price / usdPrice).toString()),
    //   });
    //   console.log(tx)
    };
  
    const handleClose = () => {
      setState({ ...state, open: false });
    };
    return (
        <div className="px-4 pb-4">
            <div className='mx-auto max-w-screen-2xl'>
                <div className='grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 xl:gap-x-8'>
                    {productData && productData.length ? (
                        productData.map((product) => {
                            return (
                                <div
                                    className='relative translate-y-0 hover:z-10 hover:shadow-2xl hover:-translate-y-0.5 rounded-lg shadow-xl transition-all cursor-pointer group w-full p-5 py-3 pb-0 bg-[#323546] rounded-xl text-white mr-3'
                                    key={product._id}
                                    onClick={handleClick({
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }, product._id)}
                                >
                                    <img className="rounded-t-lg object-cover h-48 w-96" src={product.image} alt="" />
                                    <div className="p-5">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                                        <p className="mb-3 font-medium opacity-50">{product.desc.slice(0, 100)}...</p>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <></>
                    )}
                    
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal  }}
                open={open}
                onClose={handleClose}
                message="You have to login"
                key={vertical + horizontal}
            />
        </div>
    )
}

export default ProductContent