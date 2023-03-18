
import React from 'react'
import { getAvg, getMetric, getMinMax } from '../../api/routes';
import { WORLD_SUMMIT_THEMES } from '../../constants/constants';
import type { AggregatorType, CountryMetrics, CountryProfile } from '../../data/types'
import NeutralIndicator from '../../../public/icons/neutral.svg'
import IncreaseIndicator from '../../../public/icons/up-triangle.svg'
import DecreaseIndicator from '../../../public/icons/down-triangle.svg'
import CountryAndRegionalComparissons from '../../../components/CountryAndRegionalComparissons';


const _getDeltaIndicator = (delta: number, isAvg: boolean) => {
    const indicatorClass = 'w-4 h-4 '
    if (isAvg)
        return 'fill-cyan-700'
    else if (Math.abs(delta).toFixed(1) === '0.0')
        return <NeutralIndicator className={indicatorClass + 'fill-[#fcd706]'} />
    else if (delta > 0)
        return <IncreaseIndicator className={indicatorClass + 'fill-green-500'} />
    else (delta < 0)
    return <DecreaseIndicator className={indicatorClass + 'fill-red-500'} />

}

const _getDeltaColor = (delta: number, isAvg: boolean): string => {
    if (isAvg)
        return 'text-[#56d3dcc8]'
    else if (Math.abs(delta).toFixed(1) === '0.0')
        return 'text-[#fcd706]'
    else if (delta > 0)
        return 'text-green-500'
    else
        return 'text-red-500'

}

const _getDeltaBorderColor = (delta: number, isAvg: boolean): string => {
    if (isAvg)
        return 'border-[#56d3dcc8]'
    else if (Math.abs(delta).toFixed(1) === '0.0')
        return 'border-[#fcd706]'
    else if (delta > 0)
        return 'border-green-500'
    else
        return 'border-red-500'

}

const _getDeltaBackgroundColor = (delta: number, isAvg: boolean): string => {
    if (isAvg)
        return 'bg-teal-800'
    else if (Math.abs(delta).toFixed(1) === '0.0')
        return 'bg-yellow-800'
    else if (delta > 0)
        return 'bg-green-900'
    else
        return 'bg-red-900'

}


export default async function Page({ params, searchParams }: {
    params: { grouping: AggregatorType, metric: CountryMetrics },
    searchParams?: { region: string }
}) {
    const { grouping, metric } = params
    let region = undefined
    if (grouping === 'singleRegion' && searchParams)
        region = searchParams.region.replace(/_/g, ' ')

    const data = region ? await getAvg({ metric, grouping, region }) : await getAvg({ metric, grouping: (grouping as 'world' | 'allRegions') })

    const { val: latestVal, year: latestYear } = data.at(0)!
    let previousYear: string | undefined = undefined
    let previousVal: number | undefined = undefined

    if (data.length > 1) {
        //get second most recent value
        previousYear = data.at(1)!.year
        previousVal = data.at(1)!.val
    }

    const isAvg = previousYear === undefined
    let delta = previousVal ? latestVal - previousVal : latestVal
    delta = parseFloat(delta.toFixed(2))

    return metric ? <>
        <div className="flex flex-col gap-2 justify-center items-center font-equinox  z-10 fixed top-[12%] right-1/4 pointer-events-none">
            <p className={`flex flex-col justify-center items-center tracking-widest lowercase ${_getDeltaColor(delta, isAvg)} text-xs`}>
                {metric + ' | ' + latestYear}
                <span className='text-white'>{grouping === 'singleRegion' ? region : grouping}</span>
            </p>
            <div className={`flex flex-col gap-2 bg-opacity-60 justify-center items-center w-[5.5rem] h-[5.5rem] border-dashed rounded-full border-2 ${_getDeltaColor(delta, isAvg)} ${_getDeltaBorderColor(delta, isAvg)} ${_getDeltaBackgroundColor(delta, isAvg)}`}>
                {previousVal && <>{_getDeltaIndicator(delta, isAvg)}</>}
                <p className="justify-center items-center text-center text-sm px-1">{delta}
                    {!previousYear && <br />}
                    <span className="">{`${previousYear ? ' since ' + previousYear : 'avg'}`}</span>
                </p>
            </div>
        </div>
    </>
        : <></>

}

export async function generateStaticParams() {
    const staticParams: { grouping: AggregatorType, metric: CountryMetrics }[] = []
    const groupings = ["world", "multiRegions", "singleRegion"];

    //go thru each theme and add its metrics to an array
    const availableMetrics: CountryMetrics[] = WORLD_SUMMIT_THEMES.reduce((acc: CountryMetrics[], curr) => {
        acc.push(...curr.metrics)
        return acc
    }, [])

    //return that array as an obj {metric: <metric>}
    availableMetrics.forEach(metric => {
        for (const grouping in groupings) {
            staticParams.push({ grouping: (grouping as AggregatorType), metric })
        }
    })

    return staticParams
}
