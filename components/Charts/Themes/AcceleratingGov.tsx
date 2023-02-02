import { getMax, getMin, getWorldAvg, retrieveData } from "../../../app/data/generateData"
import { ChartDimensions, LinearData } from "../../../app/data/types"
import RadarChart from "../RadarChart"
import { GdpPercentagesRadialBarChart, StatCard } from "../../Shared"
import PieChart from "../PieChart"
import BumpChart from "../BumpChart"

export const GovernmentStabilityRadar = ({ width, height }: ChartDimensions) => {
    const data = [
        {
            "metric": "Government Effectiveness",
            "Score": -getWorldAvg('2021_government_effectiveness')
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
        dimensions={{ width, height: height }}
        data={data}
        indexBy={'metric'}
        keys={['Score']} />

}

export const GovernmentRadialBar = ({ width, height }: ChartDimensions) => <>
    {/*     <p className="text-xs text-center font-body " >% GDP Expenditure Across Sectors</p>
 */}    <GdpPercentagesRadialBarChart dimensions={{ width, height }} relevantMetric='Government' />
</>

export const GovernmentHealthBullet = ({ width, height }: ChartDimensions) => {
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

    return <div className='font-equinox flex flex-col'>
        <p className='text-center lowercase'>Regional HDI Change between 2017 and 2021</p>
        <p className='font-body text-white text-sm'>This chart is different in that is show you the trend change, rather than actual numeric values.<br /> By looking at this from a regional perspective, we can see that some subregions improves, while others decreased. The overal net zero change in HDI over 4 years shows there is opportunity for improvement at the global level.</p>
        <BumpChart data={data2} dimensions={{ width, height: height - 70 }} />
    </div>


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
    return <StatCard
        preContent={<p className="font-equinox lowercase default-font-color">Human Development Index</p>}
        stat={hdi_2.toFixed(1)}
        dimensions={{ width, height }}
        text={'2017 to 2021'}
        secondaryText={'Change in HDI'}
        delta={hdi_2 - hdi}
    />
}

export const GovernmentIncreaseDecreaseChart = ({ width, height }: ChartDimensions) => {

    const data = [
        {
            "id": "increased",
            "value": 20,
        },
        {
            "id": "decreased",
            "value": 50,
        },

    ]

    return <PieChart data={data} width={width} height={height} />
}