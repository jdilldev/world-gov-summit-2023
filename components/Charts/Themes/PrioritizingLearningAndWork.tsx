import { PRE_CONTENT_ICON_SIZE } from "../../../app/constants"
import { getMax, getWorldAvg, retrieveData } from "../../../app/data/generateData"
import { ChartDimensions, LinearData } from "../../../app/data/types"
import { CustomTooltip, GdpPercentagesRadialBarChart, StatCard } from "../../Shared"
import BarChart from "../BarChart"
import CoupIcon from '../../../public/icons/removal.svg'
import { ScatterPlot } from "@nivo/scatterplot"
import FunnelChart from "../FunnelChart"

export const KidsOutOfSchool = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const avg_2018 = getWorldAvg('2018_primary_school_aged_kids_out')
    const avg_2021 = getWorldAvg('2021_primary_school_aged_kids_out')

    return <StatCard
        preContent={<p className="font-equinox">In 2021</p>}
        stat={avg_2021.toFixed(1) + '% Avg'}
        delta={parseFloat((avg_2021 - avg_2018).toFixed(1))}
        text={'kids out of school'}
        secondaryText={'since 2018'}
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
        }
    ]

    return <div className='font-equinox flex flex-col'>
        <p className='text-center lowercase'>Access to Electricity and Unemployment</p>
        <p className='font-body text-white text-sm'>Education and ability to acquire new skills is directly related to being able to use the Internet. Learning and working can be done remotely. Citizens of countries and regions with access to the internet are more likely to upskill, and therefore be more employable.</p>
        <FunnelChart data={funnelData} dimensions={{ width, height: height - 15 }} />

    </div>


}

export const Stability = ({ dimensions }: { dimensions: ChartDimensions }) => {
    const avg_2021 = getWorldAvg('2021_political_instability')
    const avg_2017 = getWorldAvg('2017_political_instability')

    return <StatCard
        preContent={<CoupIcon className={PRE_CONTENT_ICON_SIZE + ' fill-teal-400'} />}
        stat={<p className='flex flex-row items-center gap-1'>{avg_2021.toFixed(2)}
            <CustomTooltip placement="bottom"
                text={
                    <p>This may seem like a strange statistic for learning and working, but for nations and regions where there are high levels of political instability, education is unlikely to be a primary concern. <br /><br />These areas are disadvanatged in that they are trying to meet basic  needs, whereas having the opportunity to pursue education can be seen as a luxury.</p>}
            /></p>}
        text={'Political Instability'}
        // secondaryText={'Change 2017 - 2021'} delta={avg_2021 - avg_2017}
        dimensions={dimensions} />
}

export const EducationPercentOfGDP = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    return <GdpPercentagesRadialBarChart dimensions={{ width, height }} relevantMetric='Education' />
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
    return <div className='flex flex-col place-items-center'>
        <p className='font-equinox lowercase text-sm lg:text-base'>10 Most Educated Nations</p>
        <BarChart data={data} index={'country'} keys={['percentage']} dimensions={{ width, height: height - 20 }} />
    </div>
}
