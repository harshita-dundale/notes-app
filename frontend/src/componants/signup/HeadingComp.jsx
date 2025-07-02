import React from 'react'

function HeadingComp({first, second}) {
  return (
    <div>
      <h1 className='text-center signup-h1' data-aos="zoom-in">{first} <br /> {second}</h1>
    </div>
  )
}

export default HeadingComp