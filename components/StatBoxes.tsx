import { Grid, } from '@nextui-org/react';
import { FrameLines } from '@arwes/core';
import InsightIcon from '../public/icons/brain.svg'
import SourceIcon from '../public/icons/source.svg'
import { ReactNode, useContext } from 'react';
import { getWorldAvg, retrieveData } from '../app/data/generateData';
import RadarChart from './Charts/RadarChart';
import RadialBarChart from './Charts/RadialBarChart';
import { ParentSize } from '@visx/responsive';
import { GovernmentHDIDifferenceChart, GovernmentIncreaseDecreaseChart, GovernmentRadialBar, GovernmentStabilityRadar } from './Charts/Themes/AcceleratingGov';
import { GdpPercentagesRadialBarChart, StatCard } from './Shared';
import { AvgGlobalTempChangePerDecade, HappyPlanetIndex, ParisAgreementStatus, ShareOfElectricityFromRenewables, WaterStressByRegion } from './Charts/Themes/GlobalCityDesign';
import GlobalWarmingIcon from '../public/icons/global-warming.svg'
import { DEFAULT_THEME_PROMPT, PRE_CONTENT_ICON_SIZE, SummitThemeContext } from '../app/constants';
import { AstronautsAndSatellites, CryptoStats, GDPStats, SpaceAgencies } from './Charts/Themes/ExploringtheFrontier';
import { EconomicGrowthDelta, GINI, InflationChanges, WarningAboutInterdependentEconomies } from './Charts/Themes/EconomicResillience';
import { string } from 'prop-types';
import { EmergentDiseases, HealthRadialChart, SuicideDeaths, Top10CausesOfDeath } from './Charts/Themes/FutureSocietiesAndHealthcare';
import { EducatedCountries, EducationPercentOfGDP, KidsOutOfSchool, Stability } from './Charts/Themes/PrioritizingLearningAndWork';

type DefaultStatItem = {
    numeric: string
    text: string
    bgImage?: string
}

const defaultStatBoxes: DefaultStatItem[] = [
    { numeric: '15', text: 'Subregions', /* bgImage: 'nw.jpg' */ },
    { numeric: '171', text: 'Countries', },
    { numeric: '6', text: 'Themes', },
    { numeric: '', text: 'Endless Insights', }
]

const StatBox = ({ item, index, source }: { item: DefaultStatItem, index: number, source?: string }) => {
    const selectedTheme = useContext(SummitThemeContext)

    return <div style={{ backgroundImage: `url(${item.bgImage ? item.bgImage : ''})`, }} className='w-[24%] h-full bg-cover bg-top'>
        <ParentSize className={`backdrop-blur-[0px]  backdrop-invert-0 backdrop-contrast-125  backdrop-brightness-150 backdrop-saturate-100 bg-black/40 `} debounceTime={10}>{({ width, height }) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <FrameLines
                hover
                style={{ width: width, height: height, }}
                palette='secondary'
                animator={{ animate: false }}
                largeLineWidth={2}
                smallLineWidth={4}
                smallLineLength={20}>
                {/* <MagnifyIcon className='absolute right-0 place-self-end hover:fill-yellow-400 w-4 h-4 fill-[#78cce2]' onClick={() => console.log('yoyo')} />*/}
                {selectedTheme === DEFAULT_THEME_PROMPT ? <DefaultStatBox item={item} /> : getContentForTheme(width - 5, height - 20, selectedTheme, index)}
                {source && <a href={source} target="_blank" rel="noreferrer"><SourceIcon className='absolute right-0 bottom-0 default-font-color h-3 w-3' /></a>}
            </FrameLines>
        }
        </ParentSize>
    </div>
}

const DefaultStatBox = ({ item }: { item: DefaultStatItem }) => <>
    {item.numeric !== '' ? <p className='font-nebula text-3xl p-2'>{item.numeric}</p> : <InsightIcon className='w-16 h-12 fill-[#9fd0dcb1]' />}
    <p className='font-body font-white uppercase md:font-nebula whitespace-wrap text-xs md:text-xl'>{item.text}</p>
</>

const getContentForTheme = (width: number, height: number, theme: string, position: number) => {
    switch (theme) {
        case 'Accelerating Development and Governance':
            switch (position) {
                case 0:
                    return <GovernmentHDIDifferenceChart width={width} height={height} />
                case 1:
                    return <GovernmentIncreaseDecreaseChart width={width} height={height} />
                case 2:
                    return <GovernmentStabilityRadar width={width} height={height} />
                case 3:
                    return <GovernmentRadialBar width={width} height={height} />
            }
        case 'Global City Design and Sustainability':
            switch (position) {
                case 0:
                    return <AvgGlobalTempChangePerDecade dimensions={{ width, height }} />
                case 1:
                    return <ShareOfElectricityFromRenewables dimensions={{
                        width,
                        height
                    }} />
                case 2:
                    return <WaterStressByRegion dimensions={{ width, height }} />
                case 3:
                    return <HappyPlanetIndex dimensions={{ width, height }} />
            }
        case 'Exploring the Frontiers':
            switch (position) {
                case 0:
                    return <CryptoStats dimensions={{ width, height }} />
                case 1:
                    return <GDPStats dimensions={{ width, height }} />
                case 2:
                    return <SpaceAgencies dimensions={{ width, height }} />
                case 3:
                    return <AstronautsAndSatellites dimensions={{ width, height }} />
            }
        case 'Governing Economic Resilience and Connectivity':
            switch (position) {
                case 0:
                    return <InflationChanges dimensions={{ width, height }} />
                case 1:
                    return <GINI dimensions={{ width, height }} />
                case 2:
                    return <WarningAboutInterdependentEconomies dimensions={{ width, height }} />
                case 3:
                    return <EconomicGrowthDelta dimensions={{ width, height }} />
            }
        case 'Future of Societies and Healthcare':
            switch (position) {
                case 0:
                    return <Top10CausesOfDeath dimensions={{ width, height }} />
                case 1:
                    return <SuicideDeaths dimensions={{ width, height }} />
                case 2:
                    return <EmergentDiseases dimensions={{ width, height }} />
                case 3:
                    return <HealthRadialChart dimensions={{ width, height }} />
            }
        case 'Prioritizing Learning and Work':
            switch (position) {
                case 0:
                    return <KidsOutOfSchool dimensions={{
                        width,
                        height
                    }} />
                case 1:
                    return <Stability dimensions={{ width, height }} />
                case 2:
                    return <EducatedCountries dimensions={{ width, height }} />
                case 3:
                    return <EducationPercentOfGDP dimensions={{ width, height }} />
            }
    }
}

const sourceMap: { [key: string]: { [key: number]: string } } = {
    'Accelerating Development and Governance': {

    },
    'Global City Design and Sustainability': {
        0: 'https://www.climate.gov/news-features/understanding-climate/climate-change-global-temperature',
        2: 'https://sdg6data.org/en/snapshots#demo-wrapper'
    },
    'Exploring the Frontiers': {
        0: "https://www.investopedia.com/articles/forex/041515/countries-where-bitcoin-legal-illegal.asp",
        2: 'https://www.civitas-stl.com/civ1819/Government-space-agencies.pdf',
        3: "https://www.civitas-stl.com/civ1819/Government-space-agencies.pdf",
    },
    'Governing Economic Resilience and Connectivity': {},
    'Future of Societies and Healthcare': {
        0: 'https://ourworldindata.org/causes-of-death#:~:text=Cardiovascular%20diseases%20are%20the%20leading,second%20biggest%20cause%20are%20cancers.',
        1: 'https://www.who.int/news-room/fact-sheets/detail/suicide',
        2: 'https://www.bcm.edu/departments/molecular-virology-and-microbiology/emerging-infections-and-biodefense/emerging-infectious-diseases'
    },
    'Prioritizing Learning and Work': {
        2: 'https://worldpopulationreview.com/country-rankings/most-educated-countries'
    }
}

const checkForSource = (selectedTheme: string, index: number) =>
    selectedTheme !== DEFAULT_THEME_PROMPT && Object.hasOwn(sourceMap[selectedTheme], index) ? sourceMap[selectedTheme][index] : undefined


export const StatBoxes = () => {
    retrieveData({ aggregator: "world", metrics: ['2017_HDI'], }, "hierarchical");
    //console.log(getWorldAvg('2018_unemployment'))
    const selectedTheme = useContext(SummitThemeContext)
    return <Grid className='flex justify-between h-1/6 lg:h-1/5'>
        {defaultStatBoxes.map((item, index) =>
            <StatBox key={'statBox' + index} item={item} index={index} source={checkForSource(selectedTheme, index)} />
        )}
    </Grid>
}