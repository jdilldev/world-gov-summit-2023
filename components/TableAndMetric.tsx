'use client'

import { CONTEXT_CATEGORY, DEFAULT_THEME_PROMPT, WORLD_SUMMIT_THEMES } from "../app/constants/constants"
import { AggregatorType, CountryMetrics } from "../app/data/types"
import { useGlobalStore } from "../lib/store"
import Table from "./Table"
import { usePathname, useRouter } from "next/navigation"
import AggregatorSelect from "./AggregatorSelect"
import { replaceUnderscoreWithSpace } from "../utils"

const TableAndMetric = ({ data, theme, metric, globalAvg, grouping }: { data: any[], theme: string, metric: CountryMetrics, globalAvg: any, grouping: AggregatorType }) => {
    const { filter, setFilter, hideMissingData, setHideMissingData } = useGlobalStore()
    const pathname = usePathname()
    const router = useRouter()
    // const [filter, setFilter] = useState('')
    // const [hideMissingData, setHideMissingData] = useState(false)
    const mostRecentGlobalAvg = globalAvg.at(0)!.val
    const latestYear = Object.keys(data[0].years).at(-1)!

    let filteredData = data.filter((params) => {
        const filterAsNumber = parseFloat(filter)
        if (filterAsNumber)
            return params.years[latestYear] >= filterAsNumber

        const paramKey = grouping === 'allRegions' ? params.region : params.country
        return paramKey ? paramKey.toLowerCase().includes(filter.toLowerCase()) : false
    })

    if (hideMissingData)
        filteredData = filteredData.filter(({ years }) => years[latestYear])

    return theme === DEFAULT_THEME_PROMPT ? <></> : <div className="fixed top-12 right-0 w-1/4 flex flex-col mr-3 h-full">
        <div className="hidden md:inline dashboard-card h-fit max-h-[66%] mb-3">
            <div className="sticky top-0 flex flex-col gap-y-1">

                <div className="flex flex-col gap-1">
                    <p className="font-agelast tracking-widest">Rank</p>

                    <div className='flex flex-row justify-between'>
                        <AggregatorSelect />
                        <select
                            className='text-xs bg-transparent w-28 border-solid border-b-2 border-pink-500'
                            value={metric}
                            onChange={(e) => {
                                const [_, theme, grouping, __] = pathname!.split('/')
                                const pathnameWithUpdatedMetric = `${theme}/${grouping}/${e.target.value}`;
                                router.push(pathnameWithUpdatedMetric)
                            }}
                        >
                            {WORLD_SUMMIT_THEMES.find(
                                summit_theme =>
                                    summit_theme.name === replaceUnderscoreWithSpace(theme))!.metrics.map(metric => <option key={metric} value={metric}>{metric}</option>)}
                        </select>
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
            <div className='max-h-[80%] h-fit overflow-scroll'>
                <div className="flex flex-row flex-wrap justify-between items-center text-xs">
                    <Table data={filteredData} sortOrder={'descending'} />
                </div>
            </div>

        </div>
        <div className="dashboard-card hidden md:inline md:h-1/4">
            <p className="font-agelast tracking-widest">{CONTEXT_CATEGORY}</p>
            <p className="font-body text-sm font-thin">TODO</p>
        </div>
    </div>
}

export default TableAndMetric

