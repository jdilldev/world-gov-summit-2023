'use client'

import { memo } from "react"
import { AGGREGATOR_TO_TABLE_HEADING } from "../app/constants/constants"
import { AggregatorType, SortType } from "../app/data/types"
import { sortData } from "../utils"
import UpArrow from '../public/icons/up-arrow.svg'
import DownArrow from '../public/icons/down-arrow.svg'
import { usePathname } from 'next/navigation';

const Table = ({ data, sortOrder }: { data: any[], sortOrder: SortType }) => {
    if (!data || !data.length) return <p>No data matching criteria</p>

    const pathname = usePathname()
    const [_, __, grouping, metric] = pathname!.split('/')

    const latestYear = Object.keys(data[0].years).at(-1)!

    const sortedData = sortData(data, 'descending', latestYear)

    return <table className="table-fixed border-collapse w-full">
        <thead className="w-full">
            <tr>
                <th className="text-sm w-[65%] overflow-clip">
                    {'Health expenditure p/ person'}
                    <span className='text-[.65rem]'>{' (year: ' + latestYear + ')'}</span>
                </th>
                <th className='text-sm'>Value
                    <button className='hover:text-cyan-100'>
                        <span>
                            {sortOrder === 'ascending' ?
                                <UpArrow className='mt-1 w-4 h-4 hover:fill-cyan-200' />
                                : <DownArrow className='mt-1 w-4 h-4 hover:fill-cyan-200' />
                            }
                        </span>
                    </button>
                </th>
            </tr>
        </thead>
        <tbody className="text-sm">
            {
                sortedData.map((fields) => {
                    const mostRecentVal = fields.years[latestYear] ? fields.years[latestYear].toFixed(2) : fields.years[latestYear]
                    const fieldKey = grouping === 'allRegions' ? fields.region : fields.country
                    return <tr key={fieldKey}>
                        <td>{fieldKey}</td>
                        <td className={!mostRecentVal ? 'text-rose-500' : ''}>{mostRecentVal ?? 'no data'}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
}

export default Table