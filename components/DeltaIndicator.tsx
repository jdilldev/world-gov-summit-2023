'use client'

import { useGlobalStore } from "../lib/store"
import NeutralIndicator from '../public/icons/neutral.svg'
import IncreaseIndicator from '../public/icons/up-triangle.svg'
import DecreaseIndicator from '../public/icons/down-triangle.svg'

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


const DeltaIndicator = ({ data, }: { data: any[], }) => {
    if (data.length === 0) throw Error('Uh-oh, you have a data error, for there was no data retrieved from the DB for this metric')

    const { metric } = useGlobalStore()
    const { val: latestVal, year: latestYear } = data.at(0)
    let previousYear: number | undefined = undefined
    let previousVal: number | undefined = undefined


    if (data.length > 1) {
        //get second most recent value
        previousYear = data.at(1).year
        previousVal = data.at(1).val
    }

    const isAvg = previousYear === undefined
    let delta = previousVal ? latestVal - previousVal : latestVal
    delta = delta.toFixed(2)


    return metric ? <div className="flex flex-col gap-2 justify-center items-center font-equinox  z-10 fixed top-[12%] right-1/4 pointer-events-none">
        <p className={`flex flex-col justify-center items-center tracking-widest lowercase ${_getDeltaColor(delta, isAvg)} text-xs`}>
            {metric + ' | ' + latestYear}
            <span className='text-white'>{'worldwide'}</span>
        </p>
        <div className={`flex flex-col gap-2 bg-opacity-60 justify-center items-center w-[5.5rem] h-[5.5rem] border-dashed rounded-full border-2 ${_getDeltaColor(delta, isAvg)} ${_getDeltaBorderColor(delta, isAvg)} ${_getDeltaBackgroundColor(delta, isAvg)}`}>
            {previousVal && <>{_getDeltaIndicator(delta, isAvg)}</>}
            <p className="justify-center items-center text-center text-sm">{delta}
                {!previousYear && <br />}
                <span className="">{`${previousYear ? ' since ' + previousYear : 'avg'}`}</span>
            </p>
        </div>
    </div>
        : <></>
}

export default DeltaIndicator