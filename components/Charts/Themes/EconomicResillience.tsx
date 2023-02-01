import { countNumberOfIncreaseAndDecrease, getMax, getMin, getWorldAvg } from "../../../app/data/generateData"
import { source_data_obj } from "../../../app/data/source_data"
import { ChartDimensions } from "../../../app/data/types"
import { ButtonGroup, CustomTooltip, StatCard, StatCardCustom, } from "../../Shared"
import EconomicCrisisIcon from '../../../public/icons/economic-crisis.svg'
import { PRE_CONTENT_ICON_SIZE } from "../../../app/constants"
import { useState } from "react"
import PieChart from "../PieChart"

export const InflationChanges = ({ dimensions }: { dimensions: ChartDimensions }) => {
    //https://www.imf.org/external/datamapper/PCPIPCH@WEO/OEMDC
    const PreContent = () => <p className='font-equinox text-center text-sm md:text-base lg:text-lg default-font-color'>Global Inflation 2022</p>
    // const globalInflation = getWorldAvg('inflation').toFixed(1) + '%'
    const worldDelta = 8.8 - 4.7
    return <StatCard
        preContent={<PreContent />}
        stat={'8.8%'}
        delta={worldDelta}
        dimensions={dimensions}
    />
}

export const GINI = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const Content = () => {
        const { country: minCountry, value: minValue } = getMin('gini', 'world')
        const { country: maxCountry, value: maxValue } = getMax('gini', 'world')

        return <div style={{ width, height }} className='flex flex-col font-bold w-full h-full gap-1 lg:gap-2 text-2xl text-center font-equinox justify-center items-center'>
            <p className='font-equinox flex flex-row items-center gap-1 default-text-color tracking-widest'>{'GINI '}
                <CustomTooltip text={<p>GINI measures inequality amongst households within a country. The lower the index, the better.<br /><br />The years for which this data is available varies greatly per country.</p>} /></p>
            <hr className="mx-4" />
            <p className='text-xs md:text-base text-amber-400'><span >#1 - </span> {minCountry} {minValue}</p>
            <p className='text-xs md:text-base text-rose-400'><span >Last - </span> {maxCountry} {maxValue}</p>
        </div>
    }

    return <StatCardCustom content={<Content />} dimensions={{ width, height }} />
}

export const SEDA = () => {

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
        <PieChart data={year === '2021' ? data_2021 : data_2018} width={width - 20} height={height - 35} />
        <ButtonGroup className="text-xs self-start" controlValue={year} onChange={(val: string) => setYear(val)} values={['2018', '2021']} />
    </div>
}


export const WarningAboutInterdependentEconomies = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const Warning = () => {
        return <div style={{ width, height }} className='flex flex-col text-xs md:text-sm lg:text-base gap-1 place-content-center items-center font-equinox lowercase default-text-color text-center'>
            <EconomicCrisisIcon className={'h-10 w-10 lg:h-16 lg:w-16 mb-2 fill-[#35a7c3c5]'} />
            <p>Economic Interdependence is something to be conscientious of</p>
        </div>
    }
    //https://www.emerald.com/insight/content/doi/10.1108/REPS-10-2018-010/full/html
    return <StatCardCustom content={<Warning />} dimensions={{ width, height }} />
}