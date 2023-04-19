import { createContext } from 'react'
import axios from 'axios'

export const CoinMarketContext = createContext()

export const CoinMarketProvider = ({children}) => {
    const getListProduct = async () => {
        const result = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/api/product`,
        );
        if (result.status === 200) {
            return result.data;
        }
    }

    const getTopTenCoins = async () => {
        try {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
            headers.append('Access-Control-Allow-Credentials', 'true');
            const res = await fetch(
                `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=87eabef6-a4f6-440a-bf5e-93e60d393cc2`,
                {
                    method: 'GET',
                    Accept: '*/*',
                    headers: headers
                },
            )
            const data = await res.json()
            return data.data
        } catch (e) {
            console.log(e.message)
        }
    }
    
    return (
        <CoinMarketContext.Provider
            value={{
                getTopTenCoins,
                getListProduct
            }}
        >
            {children}
        </CoinMarketContext.Provider>
    )
}