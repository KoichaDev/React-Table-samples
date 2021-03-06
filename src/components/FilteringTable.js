import { useMemo } from 'react'
import { useTable, useGlobalFilter, useFilters } from 'react-table';
import MOCK_DATA from '../mock-data/MOCK_DATA.json';
import ColumnFilter from './ColumnFilter';
import { COLUMNS, GROUPED_COLUMNS } from './columns'
import GlobalFilter from './GlobalFilter';
import './table.css';

const FilteringTable = () => {
    // ! The useTable library also recommends to use React use the Memoization-hook (useMemo).
    // ! If we didn't use memoize the columns and data, React Table would think that we are receiving new data on every render 
    // ! and then attempt to recalculate it a lot of logic every single time. This will definently affect the component performance 
    // const columns = useMemo(() => GROUPED_COLUMNS, []);
    const columns = useMemo(() => COLUMNS, []);
    const mockData = useMemo(() => MOCK_DATA, []);

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, []);

    // This hook takes two properties to render the UI. 
    const tableInstance = useTable({
        columns: columns,
        data: mockData,
        defaultColumn: defaultColumn,
    },
        useFilters,
        useGlobalFilter)

    // These are functions and arrays from the hook that comes from the useHook package given to us to enable easy table creation
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups, //This will give us access our grouped of header such as first name, last name, id etc.
        footerGroups,
        rows,
        prepareRow,
        state: {
            globalFilter
        },
        setGlobalFilter
    } = tableInstance

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => {
                        return <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                // The 'Header' property is located on the columns.js file, so basically, id, first_name, last_name etc.
                                return <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            })}
                        </tr>

                    })}
                </thead>
                <tbody {...getTableBodyProps}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(rowCell => {
                                        return <td {...rowCell.getCellProps()}>{rowCell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map(footerGroup => {
                        return <>
                            <tr  {...footerGroup.getFooterGroupProps()}>
                                {footerGroup.headers.map(column => {
                                    return <>
                                        <td {...column.getFooterProps}>{column.render('Footer')}</td>
                                    </>
                                })}
                            </tr>
                        </>
                    })}
                </tfoot>
            </table>
        </>
    )
}

export default FilteringTable
