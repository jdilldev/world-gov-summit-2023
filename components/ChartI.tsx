import { FrameCorners } from '@arwes/core';
import { useContext } from 'react';
import { DefaultPlaceholder } from './Shared';
import { GovernmentStabilityRadar } from './Charts/Themes/AcceleratingGov';
import { ShareOfElectricityFromRenewables } from './Charts/Themes/GlobalCityDesign';
import { SummitThemeContext } from '../app/constants';


const renderChartBasedOnTheme = (selectedTheme: string, width: number, height: number) => {
    switch (selectedTheme) {
        case 'Accelerating Development and Governance':
            return <GovernmentStabilityRadar width={width} height={height} />
        case 'Global City Design and Sustainability':
            return <ShareOfElectricityFromRenewables dimensions={{ width, height }} />
        case 'Exploring the Frontiers':
            return
        case 'Governing Economic Resilience and Connectivity':
            return
        case 'Future of Societies and Healthcare':
            return
        case 'Prioritizing Learning and Work':
            return
        default: return <DefaultPlaceholder placeholderLocation='one' height={height} />

    }
}

export const ChartI = ({ width, height }: { width: number, height: number }) => {
    const selectedTheme = useContext(SummitThemeContext)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <FrameCorners
        showContentLines
        cornerLength={50}
        cornerWidth={3}
        animator={{ animate: false }}
        style={{ width: width, height: height }}
        className='bg-cyan-700 bg-opacity-20'
    >
        {renderChartBasedOnTheme(selectedTheme, width, height)}
    </FrameCorners>
}
