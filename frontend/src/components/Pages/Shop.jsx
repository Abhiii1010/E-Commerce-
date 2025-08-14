import React from 'react'
import Hero from '../Hero/Hero'
import Popular from '../Popular/Popular'
import Offers from '../Offers/Offers'
import NewCollections from '../NewCollections/NewCollections'
import NewsLetter from '../NewsLetter/NewsLetter'
import Footer from '../Footer/Footer'

function Shop() {
  return (
    <div>
     <Hero/>
     <Popular/>
     <Offers/>
     <NewCollections/>
     <NewsLetter/>
     <Footer/>
    </div>
  )
}

export default Shop
