import React from 'react'

const page = ({params}: {params: {id: string}}) => {
    const id = params.id;
  return (
    <div>user: {id}</div>
  )
}

export default page