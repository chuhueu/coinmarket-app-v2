import React from 'react'
import Header from '../components/Header'
import Trending from '../components/Trending'
import CMCtable from '../components/cmc-table/CmcTable'


const home = () => {
  return (
    <div className='min-h-screen'>
      <Header />
      <div className='mt-10'></div>
      <Trending />
      <div className='mt-20'></div>
      <CMCtable />
    </div>
  )
}

export default home
