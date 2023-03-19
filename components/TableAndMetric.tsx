'use client'

import { useState } from "react"
import { getAvg } from "../app/api/routes"
import { CONTEXT_CATEGORY } from "../app/constants/constants"
import { CountryMetrics } from "../app/data/types"
import Table from "./Table"

const TableAndMetric = ({ data, metric, globalAvg }: { data: any[], metric: CountryMetrics, globalAvg: any }) => {
    const [filter, setFilter] = useState('')
    const mostRecentGlobalAvg = globalAvg.at(0)!.val
    const latestYear = Object.keys(data[0].years).at(-1)!

    const filteredData = data.filter(({ country, years }: { country: string, years: { [key: string]: number } }) => {
        const filterAsNumber = parseFloat(filter)
        if (filterAsNumber)
            return years[latestYear] >= filterAsNumber

        return country ? country.toLowerCase().includes(filter) : false
    })

    return <div className="absolute top-12 right-0 w-1/4 flex flex-col mr-3 h-full">
        <div className="hidden md:inline dashboard-card h-fit max-h-[66%] mb-3 overflow-scroll">
            <div className="flex flex-col gap-y-1">
                <p className="font-agelast tracking-widest">Rank</p>
                <p className='text-sm font-equinox lowercase text-pink-500'>Global Avg: {(mostRecentGlobalAvg).toFixed(2)}</p>
                <div className='flex flex-row text-xs text-white items-center gap-2'> <p>Ignore empty values</p><input type='checkbox' className="" /></div>
                <div className='flex flex-row gap-2'>
                    <input type='text' className="mb-2 rounded-sm text-pink-500 px-1" onChange={e => setFilter(e.target.value)} />
                    {/*    <span className='text-xs'>higher</span> */}
                </div>
            </div>
            <div className="flex flex-row flex-wrap justify-between items-center text-xs">
                <Table data={filteredData} sortOrder={'ascending'} />
            </div>
        </div>
        <div className="dashboard-card hidden md:inline md:h-1/4">
            <p className="font-agelast tracking-widest">{CONTEXT_CATEGORY}</p>
            <p className="font-body text-sm font-thin">TODO</p>
        </div>
    </div>
}

export default TableAndMetric

