import React, { Fragment } from "react"
import {
  useTable,
  usePagination,
  useRowSelect,
  useFilters,
} from "react-table"
import Link from "next/link"
import {
  HiChevronDoubleLeft,
  HiChevronLeft,
  HiChevronDoubleRight,
  HiChevronRight,
} from "react-icons/hi"

import { DefaultColumnFilter } from "../utils/tableHelpers"

const defaultPropGetter = () => ({})

const Table = ({
  columns,
  data,
  detailPath,
  getRowProps = defaultPropGetter,
}) => {
  const filterTypes = React.useMemo(() => ({
    text: (rows, id, filterValue) => {
      return rows.filter((row) => {
        const rowValue = row.values[id]
        return rowValue !== undefined
          ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
          : true
      })
    },
  }))

  const defaultColumn = React.useMemo(
    () => ({
      // Set up default filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  // Define table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of rows, page for pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageSize: 10 },
    },
    useFilters,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          id: "detail",
          Header: () => <div></div>,
          Cell: ({ row }) => (
            <Link href={`/${detailPath}/${row.cells[0].value}`}>
              <a className="px-6 py-2 text-xs font-medium text-indigo-600 hover:text-indigo-900 tracking-wider cursor-pointer hover:bg-gray-100 rounded-lg">
                View
              </a>
            </Link>
          ),
        },
      ])
    }
  )

  return (
    <Fragment>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIdx) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps(getRowProps(row))}
                className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Bottom Tool Bar */}
      <div
        className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Bottom Toolbar"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
            <span className="font-medium">{pageOptions.length}</span>
          </p>
        </div>

        <div className="flex-1 flex justify-between sm:justify-end">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="relative inline-flex items-center px-4 py-2 hover:bg-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <HiChevronDoubleLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="relative inline-flex items-center px-4 py-2 hover:bg-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <HiChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="relative inline-flex items-center px-4 py-2 hover:bg-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <HiChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="relative inline-flex items-center px-4 py-2 hover:bg-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <HiChevronDoubleRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Fragment>
  )
}

export default Table
