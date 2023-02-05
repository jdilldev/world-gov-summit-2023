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
    const smallerHeight = height - 50
    switch (selectedTheme) {
        case 'Accelerating Development and Governance':
            title = 'GDP Percentage Spent on Healthcare'
            year = '2017 - 2018 - 2019'
            description = 'We can get an idea of which regions prioritize and offer more health services. However this number is also driven signficantly by population. Quantity does not equal quality.'
            RenderChart = <GovernmentHealthBullet dimensions={{ width, height }} />
            break;
        case 'Global City Design and Sustainability':
            return RenderChart = <CorrelationBetweenCO2EmissionsAndRenewables dimensions={{ width, height }} />
        case 'Exploring the Frontiers':
            return RenderChart = <GII dimensions={{ width, height }} />
        case 'Governing Economic Resilience and Connectivity':
            return RenderChart = <SEDA dimensions={{ width, height }} />
        case 'Future of Societies and Healthcare':
            title = 'GDP Percentage Spent on Healthcare'
            year = '2017 - 2018 - 2019'
            description = 'We can get an idea of which regions prioritize and offer more health services. However this number is also driven signficantly by population. Quantity does not equal quality.'
            RenderChart = <HealthExpenditureOfGDPDelta dimensions={{ width, height }} />
            break;
        case 'Prioritizing Learning and Work':
            year = '2019'
            title = 'Access to Electricity and Unemployment'
            description = 'Education and ability to acquire new skills is directly related to being able to use the Internet. Learning and working can be done remotely. Citizens of countries and regions with access to the internet are more likely to upskill, and therefore be more employable.'
            RenderChart = <UnemploymentAndAccessToElectricity dimensions={{ width, height }} />
            break
        default: RenderChart = <DefaultPlaceholder placeholderLocation='two' height={height} />
    }

    return <ChartII
        year={year}
        description={description}
        title={title}
        dimensions={{ width, height: height }}
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
        style={{ width: width, height: height, }}
        animator={{ animate: false }}
        className='bg-cyan-700 bg-opacity-20 font-equinox'
    >
        <span className='absolute -top-4 right-0 text-xs md:text-base text-white'>{year}</span>
        <div className='flex flex-col mt-2 text-center justify-between items-center'>
            <p className='text-xs md:text-base lowercase flex flex-wrap gap-1'>
                {title}
            </p>
            <p className='font-body text-stone-200 text-xs md:text-sm max-h-[80px] md:max-h-fit pt-2 md:pt-0 overflow-scroll'>{description}</p>
            {Chart}
        </div>

    </FrameCorners>
}
