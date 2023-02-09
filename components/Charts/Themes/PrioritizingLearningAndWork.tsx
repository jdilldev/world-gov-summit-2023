import { PRE_CONTENT_ICON_SIZE } from "../../../app/constants"
import { getMax, getWorldAvg, retrieveData } from "../../../app/data/generateData"
import { ChartDimensions, LinearData } from "../../../app/data/types"
import { CustomTooltip, GdpPercentagesRadialBarChart, StatCard } from "../../Shared"
import BarChart from "../BarChart"
import CoupIcon from '../../../public/icons/removal.svg'
import { ScatterPlot } from "@nivo/scatterplot"
import FunnelChart from "../FunnelChart"
import AbcIcon from '../../../public/icons/cubes.svg'
import ElectionIcon from '../../../public/icons/politics.svg'
import WaffleChart from "../WaffleChart"
import UpArrow from '../../../public/icons/up-arrow.svg'
import DownArrow from '../../../public/icons/down-arrow.svg'
import SquareIcon from '../../../public/icons/pattern.svg'
import NeutralIcon from '../../../public/icons/neutral.svg'

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
    const data = retrieveData({ metrics: ['2021_unemployment', 'access_to_electricity'], aggregator: 'world' }, 'linear') as LinearData[]
    //91 = 100
    let electricity = 0
    let unemployment = 0
    let both = 0

    Object.values(data).forEach(item => {
        if (item.data[0] && item.data[0].y < 5) unemployment++
        if (item.data[1] && item.data[1].y > 99) electricity++
        if (item.data[0] && item.data[1] && item.data[1].y > 99 && item.data[0].y < 5) both++
    })

    const funnelData = [
        {
            "id": "electricity",
            "value": electricity,
            "label": "Access to Electricity"
        },
        {
            "id": "unemployment",
            "value": unemployment,
            "label": "Low Unemployment"
        },
        {
            "id": "both",
            "value": both,
            "label": "Access to Electricity and Low Unemployment"
        },
        {
            "id": "fourth",
            "value": 13,
            "label": "Placeholder"
        }
    ]

    return <FunnelChart data={funnelData} dimensions={{ width, height: height - 135 }} />
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

export const UnemploymentBins = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const data = [

        {
            "id": "Canada",
            "label": "Decreased 3% or more",
            "value": 1,
            "color": "#72ff9f"
        },
        {
            "id": "USA",
            "label": "Decreased 3% or more",
            "value": 1,
            "color": "#72ff9f"
        },
        {
            "id": "UK",
            "label": "Decreased 3% or more",
            "value": 1,
            "color": "#72ff9f"
        },
        {
            "id": "Belgium",
            "label": "Decreased 3% or more",
            "value": 1,
            "color": "#72ff9f"
        },
        {
            "id": "Chad",
            "label": "Increased 3% or more",
            "value": 1,
            "color": "#ba72ff"
        },
        {
            "id": "Nigeria",
            "label": "Increased 3% or more",
            "value": 1,

            "color": "#ba72ff"
        },
        {
            "id": "Montana",
            "label": "Increased 3% or more",
            "value": 1,
            "color": "#ba72ff"
        },
    ]
    return <div style={{ height: height }} className='flex flex-col gap-2 text-xs lg:text-base'>
        <p className="text-xs font-equinox lowercase">Unemployment<br />Changes</p>
        <p className='text-xs text-white absolute top-0 right-0'>2018 to 2021</p>
        <div style={{ height: height - 60 }} className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-col gap-1 font-body text-xs min-w-[65px]">
                <UpUnemploymentLegend range={'3%+'} fill={'fill-green-200'} />
                <UpUnemploymentLegend range={'1-3%'} fill={'fill-emerald-500'} />
                <p className="flex flex-row gap-1 items-center"><SquareIcon className='fill-cyan-600 w-3 h-3' />{'+/- 1%'}</p>
                <DownUnemploymentLegend range={'1-3%'} fill={'fill-rose-300'} />
                <DownUnemploymentLegend range={'3%+'} fill={'fill-rose-500'} />
                <p className="flex flex-row gap-1 items-center"><SquareIcon className='fill-gray-300 w-3 h-3' />{'No Data'}</p>
            </div>
            <WaffleChart data={data} dimensions={{ width: width - 75, height: height }} />
        </div>
    </div>
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
