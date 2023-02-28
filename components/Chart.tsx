import { FrameCorners } from '@arwes/core';
import { DefaultPlaceholder } from './Shared';
import { ReactNode } from 'react';
import { ChartDimensions } from '../app/data/types';
import { GovernmentHealthBullet } from './Charts/Themes/AcceleratingGov';
import { UnemploymentAndAccessToElectricity } from './Charts/Themes/PrioritizingLearningAndWork';
import { HealthExpenditureOfGDPDelta } from './Charts/Themes/FutureSocietiesAndHealthcare';
import { CorrelationBetweenCO2EmissionsAndRenewables } from './Charts/Themes/GlobalCityDesign';
import { GII } from './Charts/Themes/ExploringtheFrontier';
import { SEDA } from './Charts/Themes/EconomicResillience';
import { useWindowSize } from '../app/hooks/hooks';


export const renderChartBasedOnTheme = (selectedTheme: string, { width, height }: { width: number, height: number }) => {
    let year = ''
    let description = ''
    let title = ''
    let RenderChart = <></>

    /* this rough calc checks if the frame is rectangular or square; if rectangular, we are in a flex-row view 
     * and need to condense the width of the chart to fit the text side-by side.
     * Only relevant for md screen size */
    const chartResponsiveWidth = (height * 2 < width) ? width * (2 / 3) : width
    const chartResponsiveHeight = (height * 2 < width) ? height - 50 : height * (2 / 3)
    switch (selectedTheme) {
        case 'Accelerating Development and Governance':
            title = 'Human Development Index'
            year = '2017 - 2021'
            description = 'Measures blah blah'
            RenderChart = <GovernmentHealthBullet dimensions={{ width: chartResponsiveWidth, height: chartResponsiveHeight }} />
            break;
        case 'Global City Design and Sustainability':
            title = 'CO2 Emissions and Renewable Usage'
            description = "There does not appear to be a clear correlation between CO2e emissions and a country's use of renewable energy. The country's towards the top of the chart have high CO2e emissions, while the country's towards the right get the majority of their energy from renewable sources."
            year = '2019/2020'
            RenderChart = <CorrelationBetweenCO2EmissionsAndRenewables dimensions={{ width: chartResponsiveWidth, height: chartResponsiveHeight }} />
            break;
        case 'Exploring the Frontiers':
            year = '2019'
            title = 'Global Innovation Index'
            RenderChart = <GII dimensions={{ width: chartResponsiveWidth, height: chartResponsiveHeight }} />
            break;
        case 'Governing Economic Resilience and Connectivity':
            title = 'Seda'
            year = '2018'
            description = 'todo'
            RenderChart = <SEDA dimensions={{ width: chartResponsiveWidth, height: chartResponsiveHeight }} />
            break;
        case 'Future of Societies and Healthcare':
            title = 'GDP Percentage Spent on Healthcare'
            year = '2017 - 2018 - 2019'
            description = 'We can get an idea of which regions prioritize and offer more health services. However this number is also driven signficantly by population. Quantity does not equal quality.'
            RenderChart = <HealthExpenditureOfGDPDelta dimensions={{ width: chartResponsiveWidth, height: chartResponsiveHeight }} />
            break;
        case 'Prioritizing Learning and Work':
            year = '2019'
            title = 'Access to Electricity and Unemployment'
            description = 'Education and ability to acquire new skills is directly related to being able to use the Internet. Learning and working can be done remotely. Citizens of countries and regions with access to the internet are more likely to upskill, and therefore be more employable.'
            RenderChart = <UnemploymentAndAccessToElectricity dimensions={{ width: chartResponsiveWidth, height: chartResponsiveHeight }} />
            break
        default: RenderChart = <DefaultPlaceholder placeholderLocation='two' height={chartResponsiveHeight} />
    }

    return <ChartII
        year={year}
        description={description}
        title={title}
        dimensions={{ width, height }}
        Chart={RenderChart}
    />
}

type ChartProps = {
    title: string;
    year: string;
    description: string;
    dimensions: ChartDimensions
    Chart: ReactNode;
}

const ChartII = ({ Chart, title, year, description, dimensions: { width, height } }: ChartProps) => {
    console.count('Chart II')
    const [_, viewPort] = useWindowSize()

    {/* 
        // @ts-ignore */}
    return <FrameCorners
        showContentLines
        cornerLength={50}
        cornerWidth={3}
        style={{ width: width - 2, height: height, display: 'flex', flexDirection: 'column', }}
        animator={{ animate: false }}
        className='bg-cyan-700 bg-opacity-20 font-equinox'
    >
        <div className='h-full'>
            <span className='absolute -top-2 right-0 text-xs md:text-base text-white'>{year}</span>
            <div className='flex flex-col mt-2 md:mt-3 lg:mt-4 gap-1 md:gap-2 lg:gap-3 text-center justify-between items-center'>
                <p className='text-xs md:text-base lowercase flex flex-wrap gap-1'>
                    {title}
                </p>
                <div className='flex flex-col gap-1 md:gap-3 justify-center items-center md:items-start lg:items-center md:flex-row lg:flex-col'>
                    {/* Mobile and Desktop views both have column layouts, whereas Tablet view has a row loayout.*/}
                    <p style={viewPort === 'MOBILE' || 'DESKTOP' ? { height: '80%' } : { height: height - 60 }} className={`px-2 font-body text-stone-200 text-xs max-h-[80%] md:text-sm pt-2 md:pt-0 overflow-scroll`}>{description}</p>
                    {Chart}
                </div>
            </div>
        </div>
    </FrameCorners>
}
