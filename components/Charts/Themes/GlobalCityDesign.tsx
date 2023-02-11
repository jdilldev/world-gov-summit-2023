import { getMax, getMin, getWorldAvg, retrieveData } from "../../../app/data/generateData"
import { ChartDimensions, LinearData, PercentileData } from "../../../app/data/types"
import GlobalWarmingIcon from '../../../public/icons/global-melting.svg'
import HappyPlanetIcon from '../../../public/icons/earth.svg'
import { CustomTooltip, StatCard, StatCardCustom } from "../../Shared"
import { PRE_CONTENT_ICON_SIZE } from "../../../app/constants"
import HeatmapChart from "../HeatmapChart"
import BumpChart from "../BumpChart"
import LineChart from "../LineChart"
import { Point } from "@nivo/line"
import PieChart from "../PieChart"
import ScatterPlot from "../ScatterPlot"
import { useState, useEffect } from "react"

export const ShareOfElectricityFromRenewables = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const renewableEnergyTrends = retrieveData({ aggregator: 'multiRegions', metrics: ['2015_electricity_from_renewables', '2020_electricity_from_renewables'], }, 'linear') as LinearData[]
    const { value: min } = getMin('2015_electricity_from_renewables', 'world')
    const { value: max } = getMax('2015_electricity_from_renewables', 'world')

    return <div className='flex flex-col place-items-center'>
        <p className='text-sm text-center font-equinox '>Use of renewable energy<br /><span className="text-white">in 2015 and 2020</span></p>
        <LineChart

            tooltipContent={({ p: { serieId, data: { xFormatted, yFormatted } } }: { p: Point }) => `In ${xFormatted}, ${yFormatted}% of ${serieId}'s energy was renewable`}
            data={renewableEnergyTrends} dimensions={{ width, height: height - 50 }} />
    </div>
}

export const ParisAgreementStatus = () => {
    //https://climateactiontracker.org/countries/
    // no countries are meeting the agreement
    // 9 countries are close (< 2°C WORLD; 1.5 is target)
    return <p className='h-full text-sm flex flex-col justify-around gap-2'>
        <span className='font-agelast capitalize text-center hover:text-blue-400'>
            <a target="_blank" rel="noopener noreferrer" href="www.google.com">paris agreement</a>
        </span>
        <span className='text-xs text-center text-green-400'>Target: -1.5 ºC Global Temp </span>
        <hr className='border-solid border-red-400 border-1' />
        <p><span className='text-purple-400'>0 countries</span> meet the target</p>
        <p><span className="text-cyan-300">9 countries</span> are close</p>
    </p>
}

export const WaterStressByRegion = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    //https://sdg6data.org/en/snapshots#demo-wrapper
    // (higher hte worse)
    // northern and western africa - 84%
    //central and southern asia - 70%
    //eastern and southeastern asia -31%
    //europe and north america -12%
    //latin america and carribbean  - 7%
    // subsaharan-africa - 6%
    //australia and new zealand -5%
    const data = [
        {
            "id": "Water Stress",
            "data": [
                {
                    "x": "Latin America and the Carribbean",
                    "y": 7
                },
                {
                    "x": "Australia and New Zealand",
                    "y": 5
                },
                {
                    "x": "Northern and Western Africa",
                    "y": 84
                },
                {
                    "x": "Sub-Saharan Africa",
                    "y": 6
                },
                {
                    "x": "Central and Southern Asia",
                    "y": 70
                },
                {
                    "x": "Eastern and Southeastern Asia",
                    "y": 31
                },
                {
                    "x": "Europe and North America",
                    "y": 12
                }
            ]
        },
    ]
    return <div className=''>
        <p className='flex flex-col text-sm text-center default-font-color font-equinox'>Subregional Water Stress<br />
            < span className='font-body text-xs' > (the lighter, the scarcer)</span >
            <span className='text-sm text-white font-body'>2019 </span>
        </p >
        <HeatmapChart data={data} dimensions={{ width: width, height: height - 50 }} />
    </div >
}

export const CorrelationBetweenCO2EmissionsAndRenewables = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const [windowSize, setWindowSize] = useState(0)
    useEffect(() => {
        const updateWindowSize = () => setWindowSize(window.innerWidth)
        window.addEventListener("resize", updateWindowSize);
        return () => window.removeEventListener("resize", updateWindowSize);
    }, [])

    const rawData = retrieveData({ metrics: ['2019_CO2e_emissions_per_capita', '2020_electricity_from_renewables'], aggregator: 'world' }, 'linear') as LinearData[]

    const data = rawData.reduce((acc, curr) => {
        if (curr.data.length === 2) {
            acc.push({
                id: curr.id,
                data: [{ x: (curr.data[1].y).toString(), y: (curr.data[0].y) }]
            })
        }
        return acc
    }, [] as LinearData[])

    return <ScatterPlot data={data} dimensions={{
        width,
        height: height - 30
    }} />

}


export const HappyPlanetIndex = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const Content = () => {
        const bottomCountry = getMin('2019_happy_planet_index', 'world')
        const topCountry = getMax('2019_happy_planet_index', 'world')
        const avg_2019 = getWorldAvg('2019_happy_planet_index')
        const avg_2016 = getWorldAvg('2016_happy_planet_index')
        return <StatCard
            icon={<HappyPlanetIcon className={PRE_CONTENT_ICON_SIZE + ' fill-[#78cce2'} />}
            metric="HPI"
            stat={avg_2019.toFixed(1) + ' Avg 2019'}
            text={'(higher is better)'}
            percentage={false}
            year='Since 2016'
            delta={(avg_2019 - avg_2016)}
            dimensions={{
                width,
                height,
            }}
            topCountry={topCountry}
            bottomCountry={bottomCountry}
        />
    }

    return <StatCardCustom content={<Content />} dimensions={{ width, height }} />
}

export const AvgGlobalTempChangePerDecade = ({ dimensions }: { dimensions: ChartDimensions }) => {
    // https://www.climate.gov/news-features/understanding-climate/climate-change-global-temperature#:~:text=Earth's%20temperature%20has%20risen%20by,0.18%C2%B0%20C)%20per%20decade.
    return <StatCard
        icon={<GlobalWarmingIcon className={PRE_CONTENT_ICON_SIZE + ' fill-red-600'} />}
        metric={'climate change'}
        stat={'.18 ºC'}
        text={'increase in global temp per decade'}
        year={'Since 1981'}
        dimensions={dimensions} />
}
