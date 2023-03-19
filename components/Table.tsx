'use client'

import { memo } from "react"
import { AGGREGATOR_TO_TABLE_HEADING } from "../app/constants/constants"
import { AggregatorType, SortType } from "../app/data/types"
import { useGlobalStore } from "../lib/store"
import { sortData } from "../utils"
import UpArrow from '../public/icons/up-arrow.svg'

const Table = ({ data, sortOrder }: { data: any[], sortOrder: SortType }) => {
    if (!data || !data.length) return <p>Info message</p>
    const { metric, grouping, region, theme: selectedTheme, setTheme, setMetric } = useGlobalStore()

    const latestYear = Object.keys(data[0].years).at(-1)!

    const sortedData = sortData(data, sortOrder, latestYear)

    return <table className="table-fixed border-collapse w-full">
        <thead className="w-full">
            <tr>
                <th className="text-sm w-[65%] overflow-clip">
                    {'metric'}
                    <span className='text-[.65rem]'>{' (year: ' + latestYear + ')'}</span>
                </th>
                <th className='text-sm'>Value <button className='hover:text-cyan-100'><span><UpArrow className='w-4 h-4 hover:fill-cyan-200' /></span></button></th>
            </tr>
        </thead>
        <tbody className="text-sm">
            {
                sortedData.map(({ country, years }: { country: string, years: { [key: string]: number } }) => {
                    const mostRecentVal = years[latestYear]
                    return <tr>
                        <td>{country}</td>
                        <td className={!mostRecentVal ? 'text-rose-500' : ''}>{mostRecentVal ?? 'no data'}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
}

export default Table