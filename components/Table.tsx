'use client'

import { memo } from "react"
import { AGGREGATOR_TO_TABLE_HEADING } from "../app/constants/constants"
import { AggregatorType } from "../app/data/types"
import { useGlobalStore } from "../lib/store"


const Table = ({ data }: { data: any[], }) => {
    const { grouping, region, theme: selectedTheme, setTheme, setMetric } = useGlobalStore()


    return !data || data.length === 0
        ? <p>Info message</p>
        : <table className="table-fixed border-collapse w-full">
            <thead className="w-full">
                <tr>
                    <th className="w-[70%]">{'heading'}</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {/*  {data.filter(({ id }) => id !== '').map(({ id, value }) => {
                    console.log(data)
                    return <tr className={`${id === 'World' ? 'text-red-400 bg-white' : ''}`}>
                        <td>{value}</td>
                        <td>{value}</td>
                    </tr>
                })}
 */}
            </tbody>
        </table>
}

export default Table