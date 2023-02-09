import { getMax, getMin, getWorldAvg, retrieveData } from "../../../app/data/generateData"
import { ChartDimensions, LinearData } from "../../../app/data/types"
import RadarChart from "../RadarChart"
import BumpChart from "../BumpChart"
import HdiIcon from '../../../public/icons/networking.svg'
import EfficacyIcon from '../../../public/icons/team.svg'
import { GdpPercentagesRadialBarChart, StatCard } from "../../Shared"
import { PRE_CONTENT_ICON_SIZE } from "../../../app/constants"

export const GovernmentStabilityRadar = ({ width, height }: ChartDimensions) => {
    const data = [
        {
            "metric": "Government Effectiveness",
            "Score": Math.abs(getWorldAvg('2021_government_effectiveness'))
        },
        {
            "metric": "Rule of Law",
            "Score": -getWorldAvg('2021_rule_of_law')
        },
        {
            "metric": "Political Instability",
            "Score": -getWorldAvg('2021_political_instability')
        },
        {
            "metric": "Control of Corruption",
            "Score": -getWorldAvg('2021_control_of_corruption')
        },
        {
            "metric": "Regulatory Quality",
            "Score": -getWorldAvg('2021_regulatory_quality')
        }
    ]

    return < RadarChart
        dimensions={{ width: width, height: height }}
        data={data}
        indexBy={'metric'}
        keys={['Score']} />

}

export const GovernmentRadialBar = ({ width, height }: ChartDimensions) => <>
    {/*     <p className="text-xs text-center font-body " >% GDP Expenditure Across Sectors</p>
 */}    <GdpPercentagesRadialBarChart dimensions={{ width, height }} relevantMetric='Government' />
</>

export const GovernmentHealthBullet = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const integrityAvg = getWorldAvg('2022_government_integrity')
    const { value: integrityMax } = getMax('2022_government_integrity', 'world')
    const { value: integrityMin } = getMin('2022_government_integrity', 'world')

    const data = [

        {
            "id": "Integrity (2022)",
            "ranges": [
                0,
                integrityMax
            ],
            "measures": [
                integrityMin,
                integrityAvg,
                integrityMax
            ],
            "markers": [
                integrityAvg
            ]
        },
        {
            "id": "HDI (2021)",
            "ranges": [
                0,
                8
            ],
            "measures": [
                2,
                6,

            ],
            "markers": [
                6.3
            ]
        },
        {
            "id": "efficacy (2021)",
            "ranges": [
                0,
                8
            ],
            "measures": [
                7.5
            ],
            "markers": [
                5
            ]
        }
    ]



    const data2 = retrieveData({ metrics: ['2017_HDI', '2021_HDI'], aggregator: 'multiRegions' }, 'linear') as LinearData[]

    return <BumpChart data={data2} dimensions={{ width, height: height - 60 }} />



    {/* <>
        <div className="flex flex-col items-start justify-between">
            <p className="font-agelast text-lg">Government Health</p>
            <div className="w-full text-sm flex flex-row justify-evenly gap-3 lg:gap-1">
                {['Global Avg', '10th percentile', '90th percentile']
                    .map(item => <div key={item} className="flex flex-row items-center">{item === 'Global Avg' ? <LegendIcon className='h-6 w-5 pr-2 fill-[#ffb84ddf]' /> : <LegendIconII className={`h-6 w-5 pr-2 ${item === '10th percentile' ? 'fill-[#b2f54de0]' : 'fill-[#7726f982]'}`} />}<span className='whitespace-nowrap'>{item}</span></div>)
                }
            </div>
        </div>
        <BulletChart data={data} width={width} height={height} />
    </> */}
}


export const GovernmentHDIDifferenceChart = ({ width, height }: ChartDimensions) => {
    const hdi = getWorldAvg('2017_HDI')
    const hdi_2 = getWorldAvg('2021_HDI')

    const topCountry = getMax('2021_HDI', 'world')
    const bottomCountry = getMin('2021_HDI', 'world')

    return <StatCard
        icon={<HdiIcon className={PRE_CONTENT_ICON_SIZE + ' fill-indigo-400'} />}
        metric="HDI"
        year="Since 2017"
        stat={hdi_2.toFixed(3)}
        dimensions={{ width, height }}
        text={'2021 Global Avg'}
        delta={hdi_2 - hdi}
        percentage={false}
        topCountry={topCountry}
        bottomCountry={bottomCountry}
    />
}

export const GovernmentIncreaseDecreaseChart = ({ width, height }: ChartDimensions) => {
    const avg_2021 = getWorldAvg('2021_government_effectiveness')
    const avg_2017 = getWorldAvg('2017_government_effectiveness')

    const topCountry = getMax('2021_government_effectiveness', 'world')
    const bottomCountry = getMin('2021_government_effectiveness', 'world')

    return <StatCard
        icon={<EfficacyIcon className={PRE_CONTENT_ICON_SIZE + ' fill-amber-500'} />}
        metric="Gov Efficacy"
        year="2021"
        stat={avg_2021.toFixed(1)}
        // delta={avg_2021 - avg_2017}
        dimensions={{
            width: width,
            height: height
        }}
        text={'-2.5 to 2.5'}
        topCountry={topCountry}
        bottomCountry={bottomCountry}
    />

}