import InsightIcon from '../public/icons/brain.svg'
import SourceIcon from '../public/icons/source.svg'
import { memo, useCallback, useContext, useMemo } from 'react';
import { ParentSize } from '@visx/responsive';
import { GovernmentHDIDifferenceChart, GovernmentIncreaseDecreaseChart, GovernmentRadialBar, GovernmentStabilityRadar } from './Charts/Themes/AcceleratingGov';
import { AvgGlobalTempChangePerDecade, HappyPlanetIndex, ParisAgreementStatus, ShareOfElectricityFromRenewables, WaterStressByRegion } from './Charts/Themes/GlobalCityDesign';
import { DEFAULT_THEME_PROMPT, SummitThemeContext } from '../app/constants';
import { AstronautsAndSatellites, CryptoStats, GDPStats, SpaceAgencies } from './Charts/Themes/ExploringtheFrontier';
import { EconomicGrowthDelta, GINI, InflationChanges, WarningAboutInterdependentEconomies } from './Charts/Themes/EconomicResillience';
import { EmergentDiseases, LifeExpectancy, SuicideDeaths, Top10CausesOfDeath } from './Charts/Themes/FutureSocietiesAndHealthcare';
import { EducatedCountries, UnemploymentBins, KidsOutOfSchool, Stability } from './Charts/Themes/PrioritizingLearningAndWork';
import { FrameLines } from '@arwes/core';

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

const StatBox = ({ selectedTheme, item, index, source }: { selectedTheme: string, item: DefaultStatItem, index: number, source?: string }) => {
    return <div style={{ backgroundImage: `url(nw.jp)`, }} className='basis-[49%] md:basis-[24%] h-1/2 md:h-full bg-cover bg-top'>
        <ParentSize className={`backdrop-blur-[0px] -mr-1 backdrop-invert-0 backdrop-contrast-125 backdrop-brightness-150 backdrop-saturate-100 bg-black/30`} debounceTime={10}>{({ width, height }) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <FrameLines
                hover
                invert
                style={{ width: width, height: height, }}
                palette='secondary'
                animator={{ animate: false }}
                squareSize={35}
                largeLineWidth={2}
                smallLineWidth={4}
                smallLineLength={40}>
                {/* <MagnifyIcon className='absolute right-0 place-self-end hover:fill-yellow-400 w-4 h-4 fill-[#78cce2]' onClick={() => console.log('yoyo')} />*/}
                {selectedTheme === DEFAULT_THEME_PROMPT ? <DefaultStatBox item={item} /> : getContentForTheme(width - 5, height - 20, selectedTheme, index)}
                {source && <a href={source} target="_blank" rel="noreferrer"><SourceIcon className='fixed right-1 bottom-2 default-font-color h-3 w-3' /></a>}
                {/*                 <TableIcon className='fixed right-3 bottom-2 default-font-color h-3 w-3' />
 */}            </FrameLines>
        }
        </ParentSize>
    </div>
}

const DefaultStatBox = memo(({ item }: { item: DefaultStatItem }) => {
    console.log(item)
    return <>
        {item.numeric !== '' ? <p className='font-nebula text-3xl p-2'>{item.numeric}</p> : <InsightIcon className='w-16 h-12 fill-[#9fd0dcb1]' />}
        <p className='font-body font-white uppercase md:font-nebula whitespace-wrap text-xs md:text-xl'>{item.text}</p>
    </>
})

const getContentForTheme = (width: number, height: number, theme: string, position: number) => {
    console.count('get content for theme ' + width)
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
            break;
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
            break;
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
            break;
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
            break;
        case 'Future of Societies and Healthcare':
            switch (position) {
                case 0:
                    return <Top10CausesOfDeath dimensions={{ width, height }} />
                case 1:
                    return <SuicideDeaths dimensions={{ width, height }} />
                case 2:
                    return <EmergentDiseases dimensions={{ width, height }} />
                case 3:
                    return <LifeExpectancy dimensions={{ width, height }} />
            }
            break;
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
                    return <UnemploymentBins dimensions={{ width, height }} />
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
    'Governing Economic Resilience and Connectivity': {
        0: 'https://www.imf.org/external/datamapper/PCPIPCH@WEO/OEMDC',
        2: 'https://www.emerald.com/insight/content/doi/10.1108/REPS-10-2018-010/full/html'
    },
    'Future of Societies and Healthcare': {
        0: 'https://ourworldindata.org/causes-of-death#:~:text=Cardiovascular%20diseases%20are%20the%20leading,second%20biggest%20cause%20are%20cancers.',
        1: 'https://www.who.int/news-room/fact-sheets/detail/suicide',
        2: 'https://www.bcm.edu/departments/molecular-virology-and-microbiology/emerging-infections-and-biodefense/emerging-infectious-diseases',
        3: 'https://data.worldbank.org/indicator/SP.DYN.LE00.IN'
    },
    'Prioritizing Learning and Work': {
        2: 'https://worldpopulationreview.com/country-rankings/most-educated-countries'
    }
}

const checkForSource = (selectedTheme: string, index: number) =>
    selectedTheme !== DEFAULT_THEME_PROMPT && Object.hasOwn(sourceMap[selectedTheme], index) ? sourceMap[selectedTheme][index] : undefined


export const StatBoxes = () => {
    console.count('StatBoxes')
    const { selectedTheme } = useContext(SummitThemeContext)
    return <div className='flex flex-wrap gap-y-2 justify-evenly h-full w-full md:flex-nowrap'>
        {defaultStatBoxes.map((item, index) => {
            const getSource = useCallback(checkForSource, [selectedTheme, index])
            const source = getSource(selectedTheme, index)
            return <StatBox key={'statBox-' + selectedTheme + index} selectedTheme={selectedTheme} item={item} index={index} source={source} />
        }
        )}
    </div>
}