import { FrameCorners } from '@arwes/core';
import { DefaultPlaceholder } from './Shared';
import { useContext } from 'react';
import { ChartDimensions } from '../app/data/types';
import { GovernmentHealthBullet } from './Charts/Themes/AcceleratingGov';
import { SummitThemeContext } from '../app/constants';
import { UnemploymentAndAccessToElectricity } from './Charts/Themes/PrioritizingLearningAndWork';
import { HealthExpenditureOfGDPDelta } from './Charts/Themes/FutureSocietiesAndHealthcare';
import { CorrelationBetweenCO2EmissionsAndRenewables } from './Charts/Themes/GlobalCityDesign';
import { GII } from './Charts/Themes/ExploringtheFrontier';
import { SEDA } from './Charts/Themes/EconomicResillience';


const renderChartBasedOnTheme = (selectedTheme: string, width: number, height: number) => {
    switch (selectedTheme) {
        case 'Accelerating Development and Governance':
            return <GovernmentHealthBullet width={width} height={height} />
        case 'Global City Design and Sustainability':
            return <CorrelationBetweenCO2EmissionsAndRenewables dimensions={{ width, height }} />
        case 'Exploring the Frontiers':
            return <GII dimensions={{ width, height }} />
        case 'Governing Economic Resilience and Connectivity':
            return <SEDA dimensions={{ width, height }} />
        case 'Future of Societies and Healthcare':
            return <HealthExpenditureOfGDPDelta dimensions={{ width, height }} />
        case 'Prioritizing Learning and Work':
            return <UnemploymentAndAccessToElectricity dimensions={{ width, height }} />
        default: return <DefaultPlaceholder placeholderLocation='two' height={height} />

    }
}

export const ChartII = ({ width, height }: ChartDimensions) => {
    const selectedTheme = useContext(SummitThemeContext)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <FrameCorners
        showContentLines
        cornerLength={50}
        cornerWidth={3}
        style={{ width: width, height: height, }}
        animator={{ animate: false }}
        className='bg-cyan-700 bg-opacity-20'
    >
        {renderChartBasedOnTheme(selectedTheme, width, height - 10)}
    </FrameCorners>
}