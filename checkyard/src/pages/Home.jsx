import React from 'react'

const Home = () => {

  

  return (
    <div>
      <div className='relative mt-24 -z-10'>
        <img src="machine.png" alt="Machines" className='w-full h-96 object-cover'/>
        <div className='flex flex-col absolute inset-0 justify-center items-center text-white bg-opacity-50 bg-black w-content'>
            <h1 className='font-bold text-4xl'>Welocome To</h1>
            <p className='text-6xl font-bold text-green-500 text-border-black'>CheckYard</p>
            <div className='w-[15%] h-1 bg-white mt-4'></div>
        </div>
      </div>
      <div>
      <div className='flex  mx-auto justify-between w-10/12 max-[640px]:flex max-[640px]:flex-col max-[640px]:justify-center xs:items-center mt-6'>
        <div className='flex flex-col w-6/12 max-[640px]:w-full'>
          <h1 className='text-3xl font-bold mb-4 text-center'>About Us</h1>
          <p className='text-xl text-zinc-500 mb-4 text-center'>Subheading for description or instructions</p>
          <p className='text-zinc-700 mb-4'>Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:

Excepteur efficient emerging, minim veniam anim aute carefully 
curated Ginza conversation exquisite perfect nostrud nisi
 intricate Content. Qui  international first-class nulla ut. Punctual
  adipisicing, essential lovely queen tempor eiusmod irure. 
  Exclusive izakaya charming Scandinavian impeccable aute
   quality of life soft power pariatur Melbourne occaecat discerning.
    Qui wardrobe aliquip, et Porter destination Toto remarkable
     officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.</p>
        </div>
        <div className='md:w-1/5 flex justify-center md:justify-end border-gray-800'>
        <img src="https://www.pontevertical.pt/images/quem-somos.png" alt="about us" className='rounded-lg shadow-lg w-full border-gray-800'/>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home
