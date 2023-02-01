import { getMax, getMin, retrieveData } from "../../../app/data/generateData"
import { ChartDimensions, LinearData } from "../../../app/data/types"
import GlobalWarmingIcon from '../../../public/icons/global-warming.svg'
import { CustomTooltip, StatCard, StatCardCustom } from "../../Shared"
import { PRE_CONTENT_ICON_SIZE } from "../../../app/constants"
import HeatmapChart from "../HeatmapChart"
import BumpChart from "../BumpChart"
import LineChart from "../LineChart"

export const ShareOfElectricityFromRenewables = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const renewableEnergyTrends = retrieveData({ aggregator: 'multiRegions', metrics: ['2015_electricity_from_renewables', '2020_electricity_from_renewables'], }, 'linear') as LinearData[]
    console.log(renewableEnergyTrends)
    return <div className='flex flex-col  place-items-center'>
        <p className='text-xs lg:text-base text-center text-white font-equinox '>Use of renewable energy<br /></p>
        <LineChart data={renewableEnergyTrends} dimensions={{ width, height: height - 5 }} />
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
    return <div className='flex flex-col place-items-center'>
        <p className='text-sm lg:text-base text-center text-white font-equinox -mb-10'>Subregional Water Stress<br />
            <span className='text-sm default-font-color font-body'>(the darker, the scarcer)</span></p>
        <HeatmapChart data={data} dimensions={{ width: width - 40, height: height - 10 }} />
    </div>
}

export const CorrelationBetweenCO2EmissionsAndRenewables = () => {
}


export const HappyPlanetIndex = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const Content = () => {
        const { country: minCountry, value: minValue } = getMin('2019_happy_planet_index', 'world')
        const { country: maxCountry, value: maxValue } = getMax('2019_happy_planet_index', 'world')

        return <div style={{ width, height }} className='flex flex-col font-bold w-full h-full gap-1 lg:gap-2 text-2xl text-center font-equinox justify-center items-center'>
            <p className='text-sm'>2019</p>
            <p className='font-equinox flex flex-row items-center gap-1 default-text-color tracking-widest'>{'HPI '}
                <CustomTooltip placement="bottomEnd" text={<p className='min-w-[200px]'>HPI (Happy Planet Index) measures sustainability based on a nation's environment and people. The higher the index, the better.<br /><br />This ranking is from 2019.</p>} /></p>
            <p className='text-xs md:text-base text-amber-400'><span >#1 - </span> {maxCountry} {maxValue.toFixed(1)}</p>
            <p className='text-xs md:text-base text-rose-400'><span >Last - </span> {minCountry} {minValue}</p>
        </div >
    }

    return <StatCardCustom content={<Content />} dimensions={{ width, height }} />
}

export const AvgGlobalTempChangePerDecade = ({ dimensions }: { dimensions: ChartDimensions }) => {
    // https://www.climate.gov/news-features/understanding-climate/climate-change-global-temperature#:~:text=Earth's%20temperature%20has%20risen%20by,0.18%C2%B0%20C)%20per%20decade.
    return <StatCard
        preContent={<GlobalWarmingIcon className={PRE_CONTENT_ICON_SIZE + ' fill-red-500'} />}
        stat={'~ .18 ºC'}
        text={'increase per decade'}
        secondaryText={'Since 1981'}
        dimensions={dimensions} />
}
