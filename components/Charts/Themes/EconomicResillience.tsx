import { countNumberOfIncreaseAndDecrease, getMax, getMin, getWorldAvg, retrieveData } from "../../../app/data/generateData"
import { source_data_obj } from "../../../app/data/source_data"
import { CategoricalData, ChartDimensions } from "../../../app/data/types"
import { ButtonGroup, CustomTooltip, StatCard, StatCardCustom, } from "../../Shared"
import EconomicCrisisIcon from '../../../public/icons/economic-crisis.svg'
import { PRE_CONTENT_ICON_SIZE } from "../../../app/constants/constants"
import { useState } from "react"
import PieChart from "../PieChart"
import BarChart from "../BarChart"
import InflationIcon from '../../../public/icons/inflation.svg'
import InequalityIcon from '../../../public/icons/balance.svg'

export const InflationChanges = ({ dimensions }: { dimensions: ChartDimensions }) => {
    //https://www.imf.org/external/datamapper/PCPIPCH@WEO/OEMDC
    const worldDelta = 8.8 - 4.7
    return <StatCard
        icon={<InflationIcon className={PRE_CONTENT_ICON_SIZE + ' fill-rose-500'} />}
        metric="inflation"
        year='From 2021'
        stat={'8.8%'}
        text={'2022 Average Inflation Worldwide'}
        delta={worldDelta}
        dimensions={dimensions}
    />
}

export const GINI = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const Content = () => {
        const worldAvg = getWorldAvg('gini')
        const min = getMin('gini', 'world')
        const max = getMax('gini', 'world')

        return <StatCard
            icon={<InequalityIcon className={PRE_CONTENT_ICON_SIZE + ' fill-stone-400'} />}
            stat={<div className='flex flex-row gap-1 items-center'>
                {worldAvg.toFixed(1) + ' Avg'}
                <CustomTooltip
                    text={<p>GINI measures inequality amongst households within a country. The lower the index, the better.<br /><br />The year of the data for each country is different. The scores used are the most recent for each country.</p>} />
            </div>
            }
            dimensions={{
                width,
                height
            }}
            metric={'GINI'}
            text='Lower is better'
            year={'Year varies'}
            topCountry={min}
            bottomCountry={max}
        />
    }

    return <StatCardCustom content={<Content />} dimensions={{ width, height }} />
}

export const SEDA = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const data = retrieveData({ metrics: ['seda'], aggregator: 'multiRegions' }, 'categorical') as CategoricalData[]
    const globalAvg = getWorldAvg('seda').toFixed(1)
    const { country, value: max } = getMax('seda', 'world')
    const { country: countryMin, value: min } = getMin('seda', 'world')

    return <>Seda - todo</>
}
export const EconomicGrowthDelta = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const { increased: inc2018, decreased: dec2018 } = countNumberOfIncreaseAndDecrease('2018_economic_growth', 'world')
    const { increased: inc2021, decreased: dec2021 } = countNumberOfIncreaseAndDecrease('2021_economic_growth', 'world')

    const [year, setYear] = useState('2021')

    const data_2018 = [{ id: 'increased', value: inc2018 }, { id: 'decreased', value: dec2018 }]
    const data_2021 = [{ id: 'increased', value: inc2021 }, { id: 'decreased', value: dec2021 }]

    return <div className='flex flex-col place-items-center justify-evenly'>
        <div className="flex flex-row gap-2 items-center">
            <CustomTooltip placement={'leftEnd'} text={'Did you expect a more drastic difference between 2018 and 2021? With COVID-19 in full swing by 2021, many economies proved to be resillient.'} />
            <span className='text-xs lg:text-sm font-equinox lowercase'>GDP Growth and Decline</span>
        </div>
        <PieChart softMargins={true} data={year === '2021' ? data_2021 : data_2018} width={width - 20} height={height - 35} />
        <ButtonGroup className="text-xs self-start" controlValue={year} onChange={(val: string) => setYear(val)} values={['2018', '2021']} />
    </div>
}


export const WarningAboutInterdependentEconomies = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const Warning = () => {
        return <div style={{ width, height }} className='flex flex-col pr-2 text-xs md:text-sm lg:text-base gap-1 place-content-center items-center font-equinox lowercase default-text-color text-center'>
            <EconomicCrisisIcon className={PRE_CONTENT_ICON_SIZE + ' fill-[#35a7c3c5]'} />
            <p>As economoic interdependence increases, beware of its pros and cons</p>
        </div>
    }
    //https://www.emerald.com/insight/content/doi/10.1108/REPS-10-2018-010/full/html
    return <StatCardCustom content={<Warning />} dimensions={{ width, height }} />
}