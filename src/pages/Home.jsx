import React from 'react'
import Header from '../components/Header'
import Trending from '../components/Trending'

const home = () => {
  return (
    <div className='min-h-screen'>
      <div className='pt-10'></div>
      <Header />
      <div className='mt-10'></div>
      <Trending />
      <div className='mt-20'></div>
      {/* CMC table */}
    </div>
  )
}

export default home
