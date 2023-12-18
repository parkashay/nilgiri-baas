import CustomersTable from '@/components/table/CustomersTable'
import { Customer } from '@/types/types'
import React from 'react'

const tableData: Customer[] = [
  {
    name: "Ram Bahadur Thapa",
    bookedRoom: 3,
    address: 'Pokhara, Malepatan',
    email: 'e.e@gmail.com',
    phone: '+977 98-6967969'
  },
  {
    name: 'Sushmita Subedi',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    bookedRoom: 5,
    address: 'Bharatpur, Chitwan',
    email: 'sus@gmail.com',
    phone: '90909090909'
  }
]

const page = () => {
  return (
    <main className='px-3 lg:px-12'>
        <h1>Customers</h1>
        <section>
          <CustomersTable tableData={tableData} />
        </section>
    </main>
  )
}

export default page