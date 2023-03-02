import { PRE_CONTENT_ICON_SIZE } from "../../../app/constants"
import { getMax, getWorldAvg, retrieveData } from "../../../app/data/generateData"
import { CategoricalData, ChartDimensions, LinearData } from "../../../app/data/types"
import { CustomTooltip, GdpPercentagesRadialBarChart, StatCard } from "../../Shared"
import BarChart from "../BarChart"
import CoupIcon from '../../../public/icons/removal.svg'
import ScatterPlot from "../ScatterPlot"
import FunnelChart from "../FunnelChart"
import AbcIcon from '../../../public/icons/cubes.svg'
import ElectionIcon from '../../../public/icons/politics.svg'
import WaffleChart from "../WaffleChart"
import UpArrow from '../../../public/icons/up-arrow.svg'
import DownArrow from '../../../public/icons/down-arrow.svg'
import SquareIcon from '../../../public/icons/pattern.svg'
import NeutralIcon from '../../../public/icons/neutral.svg'
import { useEffect, useState } from "react"
import { useSSR } from "@nextui-org/react"
import SwarmPlot from "../SwarmPlot"

export const KidsOutOfSchool = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const avg_2018 = getWorldAvg('2018_primary_school_aged_kids_out')
    const avg_2021 = getWorldAvg('2021_primary_school_aged_kids_out')

    return <StatCard
        icon={<AbcIcon className={PRE_CONTENT_ICON_SIZE + ' fill-cyan-200'} />}
        stat={avg_2021.toFixed(1) + '% Avg'}
        delta={parseFloat((avg_2021 - avg_2018).toFixed(1))}
        metric={'Uneducated Youth'}
        text={'Kids 4-11 out of school'}
        year={'since 2018'}
        dimensions={{
            width,
            height
        }} />
}

export const UnemploymentAndAccessToElectricity = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const [windowSize, setWindowSize] = useState(0)
    useEffect(() => {
        const updateWindowSize = () => setWindowSize(window.innerWidth)
        window.addEventListener("resize", updateWindowSize);
        return () => window.removeEventListener("resize", updateWindowSize);
    }, [])


    const rawData = retrieveData({ aggregator: 'world', metrics: ['2021_unemployment', 'access_to_electricity'], }, 'linear') as LinearData[]

    const data = rawData.reduce((acc, curr) => {
        if (curr.data.length === 2) {
            acc.push({
                id: curr.id,
                data: [{ x: (curr.data[1].y).toString(), y: (curr.data[0].y) }]
            })
        }
        return acc
    }, [] as LinearData[])

    // console.log(data)

    const tdata = [
        {
            "id": "0.0",
            "group": "group A",
            "price": 293,
            "volume": 19
        },
        {
            "id": "0.1",
            "group": "group A",
            "price": 223,
            "volume": 17
        },
        {
            "id": "0.2",
            "group": "group A",
            "price": 364,
            "volume": 11
        },
        {
            "id": "0.3",
            "group": "group A",
            "price": 87,
            "volume": 13
        },
        {
            "id": "0.4",
            "group": "group A",
            "price": 263,
            "volume": 16
        },
        {
            "id": "0.5",
            "group": "group A",
            "price": 81,
            "volume": 17
        },
        {
            "id": "0.6",
            "group": "group A",
            "price": 458,
            "volume": 13
        },
        {
            "id": "0.7",
            "group": "group A",
            "price": 390,
            "volume": 20
        },
        {
            "id": "0.8",
            "group": "group A",
            "price": 269,
            "volume": 16
        },
        {
            "id": "0.9",
            "group": "group A",
            "price": 477,
            "volume": 9
        },
        {
            "id": "0.10",
            "group": "group A",
            "price": 231,
            "volume": 6
        },
        {
            "id": "0.11",
            "group": "group A",
            "price": 243,
            "volume": 12
        },
        {
            "id": "0.12",
            "group": "group A",
            "price": 30,
            "volume": 15
        },
        {
            "id": "0.13",
            "group": "group A",
            "price": 8,
            "volume": 9
        },
        {
            "id": "0.14",
            "group": "group A",
            "price": 473,
            "volume": 12
        },
        {
            "id": "0.15",
            "group": "group A",
            "price": 336,
            "volume": 10
        },
        {
            "id": "0.16",
            "group": "group A",
            "price": 345,
            "volume": 20
        },
        {
            "id": "0.17",
            "group": "group A",
            "price": 281,
            "volume": 10
        },
        {
            "id": "0.18",
            "group": "group A",
            "price": 276,
            "volume": 16
        },
        {
            "id": "0.19",
            "group": "group A",
            "price": 498,
            "volume": 5
        },
        {
            "id": "0.20",
            "group": "group A",
            "price": 440,
            "volume": 5
        },
        {
            "id": "0.21",
            "group": "group A",
            "price": 162,
            "volume": 19
        },
        {
            "id": "0.22",
            "group": "group A",
            "price": 51,
            "volume": 15
        },
        {
            "id": "0.23",
            "group": "group A",
            "price": 244,
            "volume": 10
        },
        {
            "id": "0.24",
            "group": "group A",
            "price": 220,
            "volume": 8
        }]

    return <SwarmPlot data={tdata} dimensions={{
        width,
        height: height - 40
    }} />
}

export const Stability = ({ dimensions }: { dimensions: ChartDimensions }) => {
    const avg_2021 = getWorldAvg('2021_political_instability')
    const avg_2017 = getWorldAvg('2017_political_instability')

    return <StatCard
        icon={<ElectionIcon className={PRE_CONTENT_ICON_SIZE + " stroke-cyan-700"} />}
        stat={<p className='flex flex-row items-center gap-1'>{avg_2021.toFixed(2)}
            <CustomTooltip placement="bottom"
                text={
                    <p>This may seem like a strange statistic for learning and working, but for nations and regions where there are high levels of political instability, education is unlikely to be a primary concern. <br /><br />These areas are disadvanatged in that they are trying to meet basic  needs, whereas having the opportunity to pursue education can be seen as a luxury.</p>}
            /></p>}
        metric={'Political Instability'}
        delta={Math.abs(avg_2021 - avg_2017)}
        percentage={false}
        year={'2017 to 2021'}
        text={'Global Avg 2021 Range -2.5 to 2.5'}
        dimensions={dimensions} />
}

const DownUnemploymentLegend = ({ range, fill }: { range: string, fill: string }) => <p className='flex flex-row items-center text-xs'><SquareIcon className={`${fill}  w-3 h-3`} /><DownArrow className='w-3 h-3 fill-emerald-400' /> {range}</p>
const UpUnemploymentLegend = ({ range, fill }: { range: string, fill: string }) => <p className='flex flex-row items-center text-xs'><SquareIcon className={`${fill}  w-3 h-3`} /><UpArrow className='w-3 h-3 fill-red-400' /> {range}</p>

const getUnemploymentBin = (delta: number): { label: string, color: string } => {
    const difference = isNaN(delta) ? 'no data' : delta

    if (difference > 3) {
        return { label: 'Increased more than 3%', color: '#f43f5e' }
    } else if (difference > 1 && difference <= 3) {
        return { label: 'Increased 1-3%', color: '#fecdd3' }
    } else if (difference >= -1 && difference <= 1) {
        return { label: 'Stayed within 1%', color: '#0891b2' }
    } else if (difference < -1 && difference >= -3) {
        return { label: 'Decreased 1-3%', color: '#a7f3d0' }
    } else if (difference < -3) {
        return { label: 'Decreased more than 3%', color: '#10b981' }
    } else {
        return { label: 'No data', color: '#9ca3af' }
    }
}

export const UnemploymentBins = () => {
    let rawData = retrieveData({ aggregator: 'world', metrics: ['2018_unemployment', '2021_unemployment'] }, 'categorical') as CategoricalData[]

    rawData = rawData.reduce((acc, curr) => {
        // 0 - 2018 unemployment
        // 1 - 2021 unemployment
        const unemployment_2018 = Number(curr['2018_unemployment'])
        const unemployment_2021 = Number(curr['2021_unemployment'])
        const difference = unemployment_2021 - unemployment_2018
        const { label, color } = getUnemploymentBin(difference)

        acc.push({
            id: curr.country,
            value: difference,
            label,
            color,
        })

        return acc
    }, [] as CategoricalData[])

    rawData = rawData.sort(({ value: a }, { value: b }) => isNaN(Number(b)) ? -1 : Number(a) - Number(b))

    const data = rawData.map((datum: CategoricalData) => { return { ...datum, value: 1 } })

    return <WaffleChart rawData={rawData} data={data} />

    {/* <div style={{ height: height }} className='flex flex-col gap-2 text-xs lg:text-base'>
        <p className="text-xs font-equinox lowercase">Unemployment<br />Changes</p>
        <p className='text-xs text-white absolute top-0 right-0'>2018 to 2021</p>
        <div style={{ height: height - 60 }} className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-col gap-1 font-body text-xs min-w-[65px]">
                <DownUnemploymentLegend range={'3%+'} fill={'fill-emerald-500'} />
                <DownUnemploymentLegend range={'1-3%'} fill={'fill-emerald-200'} />
                <p className="flex flex-row gap-1 items-center"><SquareIcon className='fill-[#0891b2] w-3 h-3' />{'+/- 1%'}</p>
                <UpUnemploymentLegend range={'1-3%'} fill={'fill-rose-200'} />
                <UpUnemploymentLegend range={'3%+'} fill={'fill-rose-500'} />
                <p className="flex flex-row gap-1 items-center"><SquareIcon className='fill-gray-300 w-3 h-3' />{'No Data'}</p>
            </div>
            <WaffleChart rawData={rawData} data={data} dimensions={{ width: width - 75, height: height }} />
        </div>
    </div> */
    }
}

export const EducatedCountries = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    //https://worldpopulationreview.com/country-rankings/most-educated-countries

    const data = [
        {
            country: "Canada",
            "percentage": 56.27
        },
        {
            country: "Japan",
            "percentage": 50.50
        },
        {
            country: "Israel",
            "percentage": 49.9
        },
        {
            country: "South Korea",
            "percentage": 48.86
        },
        {
            country: "UK",
            "percentage": 45.96
        },
        {
            country: "US",
            "percentage": 45.67
        },
        {
            country: "Australia",
            "percentage": 43.74
        },
        {
            country: "Finland",
            "percentage": 43.60
        },
        {
            country: "Norway",
            "percentage": 43.02
        },
        {
            country: "Luxembourg",
            "percentage": 42.86
        },
    ]
    return <div className='flex flex-col justify-center items-center'>
        <p className='font-equinox lowercase text-center text-xs '>10 Most Educated Nations<br />(tertiary education)</p>
        <BarChart data={data.reverse()} index={'country'} keys={['percentage']} dimensions={{ width, height: height - 35 }} />
    </div>
}
