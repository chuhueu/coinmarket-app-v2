import { useState } from "react"
import Rate from "./cmc-table/Rate"
import fire from "../assets/fire.png"
import btc from "../assets/btc.png"
import usdt from "../assets/usdt.png"
import gainers from "../assets/gainers.png"
import recent from "../assets/recent.png"
import monaLisa from "../assets/mona-lisa.png"
import theLastDinner from "../assets/the-last-dinner.png"
import fullStars from "../assets/full-stars.png"
import TrendingCard from "./TrendingCard"
import React from "react"

const styles = {
    trendingWrapper: `mx-auto max-w-screen-2xl`,
    h1: `text-3xl text-white`,
    flexCenter: `flex items-center`
}

const Trending = () => {
    const [checked, setChecked] = useState(false)

    const trendingData = [
        {
            number: 1,
            symbol: "BTC",
            name: "Mona Lisa",
            icon: monaLisa,
            isIncrement: true,
            rate: "2.34%"
        },
        {
            number: 2,
            symbol: "USDT",
            name: "The Last Supper (Bữa ăn tối cuối cùng)",
            icon: theLastDinner,
            isIncrement: false,
            rate: "9.32%"
        },
        {
            number: 1,
            symbol: "BTC",
            name: "The Starry Night (Đêm đầy sao)",
            icon: fullStars,
            isIncrement: true,
            rate: "2.34%"
        },
        {
            number: 1,
            symbol: "BTC",
            name: "Mona Lisa",
            icon: monaLisa,
            isIncrement: true,
            rate: "2.34%"
        },
        {
            number: 2,
            symbol: "USDT",
            name: "The Last Supper (Bữa ăn tối cuối cùng)",
            icon: theLastDinner,
            isIncrement: false,
            rate: "9.32%"
        },
        {
            number: 1,
            symbol: "BTC",
            name: "The Starry Night (Đêm đầy sao)",
            icon: fullStars,
            isIncrement: true,
            rate: "2.34%"
        },
    ]

    return <div className="text-white">
        <div className={styles.trendingWrapper}>
            <div className="flex justify-between">
                <h1 className={styles.h1}>Todays Cryptocurrency Prices by Market Cap</h1>

                <div className="flex">
                    <p className="text-gray-400 ">Highlights &nbsp;</p>
                </div>
            </div>
            <br />
            <div className="flex">
                <p>The global crypto market cap is $1.74T, a &nbsp; </p>
                <span> <Rate isIncrement={true} rate='0.53%' /> </span>
                <p> &nbsp; decrease over the last day. <span className="underline">Read More</span> </p>
            </div>
            <br />

            <div className={styles.flexCenter}>
                <TrendingCard title='Trending' icon={fire} trendingData={trendingData} />
                <TrendingCard title='Biggest Gainers' icon={gainers} trendingData={trendingData} />
                <TrendingCard title='Recently Added' icon={recent} trendingData={trendingData} />
            </div>
        </div>
    </div>
}

export default Trending