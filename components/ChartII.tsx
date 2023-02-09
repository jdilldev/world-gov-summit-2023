import { FrameCorners } from '@arwes/core';
import { DefaultPlaceholder } from './Shared';
import { ReactNode, useContext } from 'react';
import { ChartDimensions } from '../app/data/types';
import { GovernmentHealthBullet } from './Charts/Themes/AcceleratingGov';
import { SummitThemeContext } from '../app/constants';
import { UnemploymentAndAccessToElectricity } from './Charts/Themes/PrioritizingLearningAndWork';
import { HealthExpenditureOfGDPDelta } from './Charts/Themes/FutureSocietiesAndHealthcare';
import { CorrelationBetweenCO2EmissionsAndRenewables } from './Charts/Themes/GlobalCityDesign';
import { GII } from './Charts/Themes/ExploringtheFrontier';
import { SEDA } from './Charts/Themes/EconomicResillience';


export const renderChartBasedOnTheme = (selectedTheme: string, { width, height }: { width: number, height: number }) => {
    let year = ''
    let description = ''
    let title = ''
    let RenderChart = <></>

    /* this rough calc checks if the frame is rectangular or square; if rectangular, we are in a flex-row view 
     * and need to condense the width of the chart to fit the text side-by side.
     * Only relevant for md screen size */
    const chartResponsiveWidth = (height * 2 < width) ? width * (2 / 3) : width
    switch (selectedTheme) {
        case 'Accelerating Development and Governance':
            title = 'Human Development Index'
            year = '2017 - 2021'
            description = 'Measures blah blah'
            RenderChart = <GovernmentHealthBullet dimensions={{ width: chartResponsiveWidth, height }} />
            break;
        case 'Global City Design and Sustainability':
            title = 'CO2 Emissions and Renewable Usage'
            description = 'todo'
            year = '2019'
            RenderChart = <CorrelationBetweenCO2EmissionsAndRenewables dimensions={{ width: chartResponsiveWidth, height }} />
            break;
        case 'Exploring the Frontiers':
            title = 'Global Innovation Index'
            RenderChart = <GII dimensions={{ width: chartResponsiveWidth, height }} />
            break;
        case 'Governing Economic Resilience and Connectivity':
            title = 'Seda'
            year = '2018'
            description = 'todo'
            RenderChart = <SEDA dimensions={{ width: chartResponsiveWidth, height }} />
            break;
        case 'Future of Societies and Healthcare':
            title = 'GDP Percentage Spent on Healthcare'
            year = '2017 - 2018 - 2019'
            description = 'We can get an idea of which regions prioritize and offer more health services. However this number is also driven signficantly by population. Quantity does not equal quality.'
            RenderChart = <HealthExpenditureOfGDPDelta dimensions={{ width: chartResponsiveWidth, height }} />
            break;
        case 'Prioritizing Learning and Work':
            year = '2019'
            title = 'Access to Electricity and Unemployment'
            description = 'Education and ability to acquire new skills is directly related to being able to use the Internet. Learning and working can be done remotely. Citizens of countries and regions with access to the internet are more likely to upskill, and therefore be more employable.'
            RenderChart = <UnemploymentAndAccessToElectricity dimensions={{ width: chartResponsiveWidth, height }} />
            break
        default: RenderChart = <DefaultPlaceholder placeholderLocation='two' height={height} />
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
    {/* 
        // @ts-ignore */}
    return <FrameCorners
        showContentLines
        cornerLength={50}
        cornerWidth={3}
        style={{ width: width, height: height, display: 'flex', justifyContent: 'center' }}
        animator={{ animate: false }}
        className='bg-cyan-700 bg-opacity-20 font-equinox'
    >
        <span className='absolute -top-2 right-0 text-xs md:text-base text-white'>{year}</span>
        <div className='flex flex-col mt-2 text-center justify-evenly items-center h-full w-full'>
            <p className='text-xs md:text-base lowercase flex flex-wrap gap-1'>
                {title}
            </p>
            <div className='flex flex-col gap-3 justify-center items-center md:flex-row lg:flex-col'>
                <p className='font-body text-stone-200 text-xs md:text-sm max-h-[80px] md:max-h-fit pt-2 md:pt-0 overflow-scroll'>{description}</p>
                {Chart}
            </div>
        </div>
    </FrameCorners>
}
