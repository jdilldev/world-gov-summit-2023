import { ChartDimensions } from "../../../app/data/types"
import { CustomTooltip, GdpPercentagesRadialBarChart, StatCard } from "../../Shared"
import CirclePackingChart from "../CirclePackingChart"
import DiseaseIcon from '../../../public/icons/bacteria.svg'
import { PRE_CONTENT_ICON_SIZE } from "../../../app/constants"
import { getWorldAvg } from "../../../app/data/generateData"


export const Top10CausesOfDeath = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    //https://ourworldindata.org/causes-of-death#:~:text=Cardiovascular%20diseases%20are%20the%20leading,second%20biggest%20cause%20are%20cancers.
    //2019 
    const data = {
        "id": "2019 Causes of Death",
        "children": [
            {
                "id": "Cardiovascular",
                "value": 18.56,
                "children": []
            },
            {
                "id": "Cancers",
                "value": 10.8,
                "children": []
            },
            {
                "id": "Respiratory",
                "value": 3.97,
                "children": []
            },
            {
                "id": "Lower respiratory",
                "value": 2.56,
                "children": []
            },
            {
                "id": "Neonatal",
                "value": 1.88,
                "children": []
            },
            {
                "id": "Dementia",
                "value": 1.62,
                "children": []
            },
            {
                "id": "Diabetes",
                "value": 1.55,
                "children": []
            },
            {
                "id": "Diarrheal",
                "value": 1.53,
                "children": []
            },
            {
                "id": "Liver",
                "value": 1.47,
                "children": []
            },
        ]
    }

    return <div className="flex flex-col text-xs md:text-sm font-equinox place-items-center">
        <p>Top 10 Causes of death</p>
        <p>Worldwide - 2019</p>
        <CirclePackingChart data={data} dimensions={{ width, height: height - 40 }} />
    </div>
}

export const SuicideDeaths = ({ dimensions }: { dimensions: ChartDimensions }) => {
    // https://www.who.int/news-room/fact-sheets/detail/suicide    // Suicide is the 2nd leading cause of death in the world for those aged 15-24 years
    // Suicide is the fourth leading cause of death among 15-29 year-olds globally in 2019.
    const SuicideText = () => <p className="text-center text-sm font-equinox default-font-color">4th cause of death<br /> <span>15 - 29 year-olds</span></p>
    return <StatCard
        preContent={<SuicideText />}
        stat={<p className='flex flex-row items-center gap-1'>suicide <CustomTooltip text={<p>Death by suicide was the 4th leading cause of death globally. This statistic underscores the importance of mental health.<br /><br />15 to 29 year-olds are a key demographic for building a strong future society.</p>} /></p>}
        text={'2019'}
        dimensions={dimensions} />
}

export const EmergentDiseases = ({ dimensions }: { dimensions: ChartDimensions }) => {
    return <StatCard
        preContent={<DiseaseIcon className={PRE_CONTENT_ICON_SIZE + ' !fill-[#78cce2] !important;'} />
        }
        stat={<p className='flex flex-row items-center gap-1'>{'+ 40'}
            <CustomTooltip placement="bottom"
                text={
                    <p>The number of emerging diseases is
                        <span className='text-red-400'> not</span> historically normal.
                        <br /><br />
                        The World Health Organization reported in 2007 that the rate of emerging infectious diseases is unprecedented.
                        <br /><br />
                        Since the 1970s, approximately 40 infectious diseases have been discovered, including
                        <ul className="grid grid-cols-3 mt-1">
                            <li>SARS</li>
                            <li>MERS</li>
                            <li>Ebola</li>
                            <li>chikungunya</li>
                            <li>Zika</li>
                            <li>COVID-19</li>
                        </ul>
                    </p>}
            />
        </p>}
        text={'Infectious Diseases'}
        secondaryText={'Since 1970'}
        dimensions={dimensions} />
}


export const HealthRadialChart = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    return <GdpPercentagesRadialBarChart relevantMetric="Healthcare" dimensions={{ width, height }} />
}

export const HealthExpenditureOfGDPDelta = ({ dimensions }: { dimensions: ChartDimensions }) => {
    //  const healthExpenditureGDP = getWorldAvg('')
    return <StatCard stat={'hi'} dimensions={dimensions} />
}

//55
    //providing nearly 100% of citizens or residents with health coverage in some form
    // https://www.internationalinsurance.com/health/countries-free-healthcare.php#:~:text=Anyone%20in%20the%20country%2C%20even,these%20countries%20can%20vary%20widely.
