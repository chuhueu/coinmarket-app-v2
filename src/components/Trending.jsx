// import { useState } from "react"
// import Rate from "./cmc-table/Rate"
import fire from "../assets/fire.png"
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
    flexCenter: `flex items-center mt-5`
}

const Trending = () => {
    // const [checked, setChecked] = useState(false)

    const trendingData = [
        {
            number: 1,
            symbol: "",
            name: "Mona Lisa",
            icon: monaLisa,
            isIncrement: true,
            rate: "2.34%"
        },
        {
            number: 2,
            symbol: "",
            name: "The Last Supper (Bữa ăn tối cuối cùng)",
            icon: theLastDinner,
            isIncrement: false,
            rate: "9.32%"
        },
        {
            number: 3,
            symbol: "",
            name: "The Starry Night (Đêm đầy sao)",
            icon: fullStars,
            isIncrement: true,
            rate: "2.34%"
        },
    ]

    return <div className="text-white px-4">
        <div className={styles.trendingWrapper}>
            <div className="flex justify-between">
                <h1 className={styles.h1}>List of products for today's auction</h1>
            </div>
            <div className={styles.flexCenter}>
                <TrendingCard title='Trending' icon={fire} trendingData={trendingData} />
                <TrendingCard title='Biggest Gainers' icon={gainers} trendingData={trendingData} />
                <TrendingCard title='Recently Added' icon={recent} trendingData={trendingData} />
            </div>
        </div>
    </div>
}

export default Trending