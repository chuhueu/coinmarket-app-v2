import { useContext, useEffect, useState, useCallback } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { CoinMarketContext } from '../../context/context'
import CMCtableHeader from './CmcTableHeader'
import CMCtableRow from './CmcTableRow'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { ethers } from 'ethers';

const CMCtable = () => {
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
    console.log(usdPrice)
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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const tx = signer.sendTransaction({
      to: toAddress,
      value: ethers.utils.parseEther((price / usdPrice).toString()),
    });
    console.log(tx)
    // navigate(
    //   `/product/info/${code}`,
    // )
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
 
  return (
    <div className='text-white font-bold mx-auto max-w-screen-2xl'>
      <Stack direction="row" spacing={2} className='justify-end mb-2 pr-3' style={{marginTop: '-35px'}}>
        <Button 
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleClick({
            vertical: 'top',
            horizontal: 'right',
          })}
        >
          PDF
        </Button>
        <Button
          variant="contained"
          endIcon={<FileDownloadIcon />}
          onClick={handleClick({
            vertical: 'top',
            horizontal: 'right',
          })}
        >
          EXCEL
        </Button>
      </Stack>
      <div className='mx-auto max-w-screen-2xl'>
        <table className='w-full'>
          <CMCtableHeader />

          {productData && productData.length ? (
            productData.map((product, index) => {
              return (
                <CMCtableRow
                  index={index + 1}
                  key={product._id}
                  code={product._id}
                  image={product.image}
                  name={product.name}
                  currentBid={product.estimatePrice}
                  completedYear={product.completedYear}
                  startedYear={product.startedYear}
                  handleClick={handleClick}
                />
              )
            })
          ) : (
            <></>
          )}
        </table>
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

export default CMCtable