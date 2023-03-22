import NeutralIndicator from '../public/icons/neutral.svg'
import IncreaseIndicator from '../public/icons/up-triangle.svg'
import DecreaseIndicator from '../public/icons/down-triangle.svg'
import { AggregatorType, CountryMetrics, M49_subregion } from "../app/data/types"

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


const DeltaIndicator = ({ data, metric, grouping, region }: { data: any[], metric: string, grouping: AggregatorType, region?: string }) => {
    if (data.length === 0) throw Error('Uh-oh, you have a data error, for there was no data retrieved from the DB for this metric ')

    let { val: latestVal, year: latestYear } = data.at(0)!

    let previousYear: string | undefined = undefined
    let previousVal: number | undefined = undefined

    if (data.length > 1) {
        //get second most recent value
        previousYear = data.at(1)!.year
        previousVal = data.at(1)!.val
    }

    const isAvg = previousYear === undefined
    let delta = previousVal ? latestVal - previousVal : latestVal

    delta = delta ? parseFloat(delta.toFixed(2)) : 'No data'
    return <div className="flex flex-col gap-1 justify-center items-center font-equinox z-10 fixed top-[14%] right-[27%] pointer-events-none w-1/3">
        <p className={`flex flex-col text-center justify-center items-center tracking-widest lowercase ${_getDeltaColor(delta, isAvg)} text-xs`}>
            {metric + ' | ' + latestYear}
            <span className='text-white'>{grouping === 'singleRegion' ? region : grouping === 'allRegions' ? 'All Regions' : 'worldwide'}</span>
        </p>
        <div className={`flex flex-col bg-opacity-60 justify-center items-center w-24 h-24 border-dashed rounded-full border-2 ${_getDeltaColor(delta, isAvg)} ${_getDeltaBorderColor(delta, isAvg)} ${_getDeltaBackgroundColor(delta, isAvg)}`}>
            {previousVal && <>{_getDeltaIndicator(delta, isAvg)}</>}
            <p className="justify-center items-center text-center">{delta}
                <br />
                <span className="text-xs ">{`${previousYear ? ' since ' + previousYear : 'avg'}`}</span>
            </p>
        </div>
    </div>
}

export default DeltaIndicator