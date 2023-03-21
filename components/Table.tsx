'use client'

import { memo, useState } from "react"
import { AGGREGATOR_TO_TABLE_HEADING } from "../app/constants/constants"
import { AggregatorType, SortType } from "../app/data/types"
import { sortData } from "../utils"
import UpArrow from '../public/icons/up-arrow.svg'
import DownArrow from '../public/icons/down-arrow.svg'
import { usePathname } from 'next/navigation';

const Table = ({ data, metric }: { data: any[], metric: string }) => {
    if (!data || !data.length) return <p>No data matching criteria</p>
    const latestYear = Object.keys(data[0].years).at(-1)!

    const [sortOrder, setSortOrder] = useState<SortType>('descending')
    const [sortedData, setSortedData] = useState(sortData(data, sortOrder, latestYear))

    const pathname = usePathname()
    const [_, __, grouping] = pathname!.split('/')



    return <table className="table-fixed border-collapse w-full">
        <thead className="w-full">
            <tr>
                <th className="text-sm w-[65%] overflow-clip">
                    {metric}
                    <span className='text-[.65rem]'>{' (year: ' + latestYear + ')'}</span>
                </th>
                <th className='text-sm'>Value
                    <button className='hover:text-cyan-100'
                        onClick={() => {
                            const tmpSortOrder = (sortOrder === 'ascending') ? 'descending' : 'ascending'

                            setSortOrder(tmpSortOrder)
                            setSortedData([...sortData(data, tmpSortOrder, latestYear)])
                        }}
                    >
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