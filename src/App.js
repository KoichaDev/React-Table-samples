import React from 'react'
import BasicTable from './components/BasicTable'
import SortingTable from './components/SortingTable'
import FilteringTable from './components/FilteringTable'
import PaginationTable from './components/PaginationTable'
import RowSelection from './components/RowSelection'
import ColumnOrder from './components/ColumnOrder'
import ColumnHiding from './components/ColumnHiding'

const App = () => {
  return (
    <div>
       {/* <BasicTable /> */}
       {/* <SortingTable /> */}
      {/* <FilteringTable /> */}
      {/* <PaginationTable /> */}
      {/* <RowSelection /> */}
      {/* <ColumnOrder /> */}
      <ColumnHiding />
    </div>
  )
}

export default App
