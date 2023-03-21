'use client'

import { CONTEXT_CATEGORY, DEFAULT_THEME_PROMPT, WORLD_SUMMIT_THEMES } from "../app/constants/constants"
import { AggregatorType, CountryMetrics, MetricContext } from "../app/data/types"
import { useGlobalStore } from "../lib/store"
import Table from "./Table"
import { usePathname, useRouter } from "next/navigation"
import AggregatorSelect from "./AggregatorSelect"


const TableAndMetric = ({ data, theme, metricContext, globalAvg, grouping, region }: { data: any[], theme: string, metricContext: MetricContext, globalAvg: any, grouping: AggregatorType, region?: string }) => {
    const { filter, setFilter, hideMissingData, setHideMissingData } = useGlobalStore()

    const mostRecentGlobalAvg = globalAvg.at(0)!.val
    const latestYear = Object.keys(data[0].years).at(-1)!
    const { title: metricHumanReadableString } = metricContext

    let filteredData = data.filter((params) => {
        const filterAsNumber = parseFloat(filter)
        if (filterAsNumber)
            return params.years[latestYear] >= filterAsNumber

        const paramKey = grouping === 'allRegions' ? params.region : params.country
        return paramKey ? paramKey.toLowerCase().includes(filter.toLowerCase()) : false
    })

    if (hideMissingData)
        filteredData = filteredData.filter(({ years }) => years[latestYear])

    return theme === DEFAULT_THEME_PROMPT ? <></> : <div className="hidden md:flex fixed top-12 right-0 w-1/4 flex-col mr-3 h-full">
        <div className="hidden md:inline dashboard-card h-fit max-h-[66%] mb-3">
            <div className="sticky top-0 flex flex-col gap-y-1">

                <div className="flex flex-col gap-1">
                    <p className="font-agelast tracking-widest text-sm">Rank</p>

                    <div className='flex flex-row justify-between'>
                        <AggregatorSelect />
                    </div>
                </div>
                <p className='text-sm font-equinox lowercase text-pink-500'>Global Avg: {(mostRecentGlobalAvg).toFixed(2)}</p>
                <div className='flex flex-row text-xs text-white items-center gap-2'>
                    <p>Hide missing data</p>
                    <input type='checkbox' className="" checked={hideMissingData} onChange={() => setHideMissingData(!hideMissingData)} />
                </div>
                <div className='flex flex-row gap-2'>
                    <input type='text' className="mb-2 bg-transparent border-solid border-b-2 border-pink-300 text-pink-500 px-1" value={filter} onChange={e => setFilter(e.target.value)} />
                    {/*    <span className='text-xs'>higher</span> */}
                </div>
            </div>
            <div className='max-h-[78%] h-fit overflow-scroll'>
                <div className="flex flex-row flex-wrap justify-between items-center text-xs">
                    <Table data={filteredData} metric={metricHumanReadableString} />
                </div>
            </div>

        </div>
        <div className="dashboard-card hidden md:inline md:h-[23%]">
            <p className="font-agelast tracking-widest text-sm">{CONTEXT_CATEGORY}</p>
            <div className='flex flex-row items-center justify-between'>
                <a href={metricContext.url} target="_blank" rel="noopener noreferrer" className="font-equinox tracking-widest lowercase text-xs font-thin text-cyan-200 hover:text-cyan-100">{metricHumanReadableString}</a>
                <p className='text-lime-500 text-xs font-equinox lowercase'>{metricContext.favor === 'lower' ? 'lower is better' : metricContext.favor === 'higher' ? 'higher is better' : 'neutral'}</p>
            </div>
            <div className="md:h-3/4 overflow-scroll">
                <p className="text-sm">{metricContext.description}</p>
            </div>
        </div>
    </div>
}

export default TableAndMetric

