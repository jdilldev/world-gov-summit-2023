import PieChartIcon from '../public/icons/pie-chart.svg';
import LineChartIcon from '../public/icons/line-chart.svg';
import InfoIcon from '../public/icons/magnifier.svg';
import { getWorldAvg } from '../app/data/generateData';
import RadialBarChart from './Charts/RadialBarChart';
import { ChartDimensions, TooltipPlacement } from '../app/data/types';
import NeutralIndicator from '../public/icons/neutral.svg'
import IncreaseIndicator from '../public/icons/up-triangle.svg'
import DecreaseIndicator from '../public/icons/down-triangle.svg'
import { ReactNode } from 'react';
import { Tooltip } from '@nextui-org/react';

type DefaultPlaceholderProps = {
    height: number;
    placeholderLocation: 'one' | 'two'
}

export const ButtonGroup = ({ values, className, controlValue, onChange }: { values: string[], className?: string, controlValue: string, onChange: (value: string) => void }) => {
    return <div className={`flex flex-row gap-1 rounded-lg border-2 border-solid border-[#b8ff4d] w-fit ${className}`}>
        {values.map(value => <div
            key={value}
            onClick={() => {
                const lowerCaseValue = value.toLowerCase()
                onChange(lowerCaseValue)
            }}
            className={`opacity-80 hover:opacity-100 px-3 font-body ${controlValue === value.toLowerCase() ? 'bg-[#b8ff4d] text-[black] border-none' : 'text-[#b8ff4d]'}`}>
            {value}
        </div>)}
    </div>
}

export const DefaultPlaceholder = ({ height, placeholderLocation }: DefaultPlaceholderProps) => {
    const chartIconClassName = 'w-16 h-16 md:w-28 md:h-28'
    return <div style={{ height: height }} className='flex flex-col gap-4 justify-center items-center'>
        {placeholderLocation === 'one' ? <PieChartIcon className={chartIconClassName} /> : <LineChartIcon className={chartIconClassName} />}
        <p className='font-agelast uppercase tracking-widest text-xl md:text-2xl'>Select a theme</p>
    </div>
}

export const GdpPercentagesRadialBarChart = ({ dimensions: { width, height }, relevantMetric }: { dimensions: ChartDimensions, relevantMetric: string }) => {
    const governanceGDP = getWorldAvg('government_gdp')
    const healtcareGDP = getWorldAvg('2019_health_gdp')
    const educationGDP = getWorldAvg('2021_education_gdp')
    const militaryGDP = getWorldAvg('military_gdp')
    const data = [
        { id: 'Military', data: [{ x: '', y: militaryGDP }] },
        { id: 'Healthcare', data: [{ x: '', y: healtcareGDP }] },
        { id: 'Education', data: [{ x: '', y: educationGDP }] },
        { id: 'Government', data: [{ x: '% of GDP', y: governanceGDP }] },
    ]

    return <RadialBarChart relevantMetric={relevantMetric} width={width} height={height} data={data} />
}
const getDeltaIndicator = (delta: number) => {

    const indicatorClass = 'w-2 h-2 md:w-4 md:h-4 lg:w-4 lg:h-4 '
    if (Math.abs(delta).toFixed(1) === '0.0') {
        return <NeutralIndicator className={indicatorClass + 'fill-[gold]'} />
    } else if (delta > 0) {
        return <IncreaseIndicator className={indicatorClass + 'fill-green-400'} />
    } else if (delta < 0) {
        return <DecreaseIndicator className={indicatorClass + 'fill-red-400'} />
    }
}

type StatCardProps = {
    stat: string | ReactNode,
    dimensions: ChartDimensions
    text?: string,
    preContent?: ReactNode,
    secondaryText?: string,
    delta?: number
}

export const StatCard = ({ stat, text, preContent, secondaryText, delta, dimensions: { width, height } }: StatCardProps) => {
    return <div style={{ width: width - 5, height, }} className={`div flex flex-col w-full md:place-content-center md:items-center justify-evenly lg:justify-around text-white`}>
        {preContent && preContent}
        <span className='text-bae font-equinox md:text-2xl lg:text-3xl mb-2 lowercase tracking-widest underline underline-offset-8 decoration-2 decoration-solid decoration-[#78cce2]'>{stat}</span>
        {text && <span className='text-xs md:text-sm lg:text-base lg:tracking-normal font-nebula md:whitespace-nowrap'>{text}</span>}
        {delta &&
            <p className='flex flex-row items-center gap-1 md:gap-2 m-0'>
                <span>{getDeltaIndicator(delta)}</span>
                <p className='text-xs md:text-base lg:text-xl text-center'>
                    <span className='font-equinox'>{delta.toFixed(1)}</span>
                    <span className='font-body text-[.75em] md:text-xs'>{'%  '}</span>
                    <span className='md:font-equinox md:lowercase'>{secondaryText}</span>
                </p>
            </p>}
        {!delta && secondaryText && <span className='text-xs text-center font-nebula'>{secondaryText}</span>}
    </div>
}

export const StatCardCustom = ({ content, dimensions: { width, height } }: { content: ReactNode, dimensions: ChartDimensions }) => {
    return <div style={{ width: width - 5, height, }}>{content}</div>
}

export const CustomTooltip = ({ text, placement, fill }: { text: string | ReactNode, placement?: TooltipPlacement, fill?: string }) =>
    <Tooltip content={<div className='max-w-xs text-center'>{text}</div>} trigger="click" placement={placement ? placement : 'top'}>
        <InfoIcon className='h-3 w-3 fill-[#1088a7bd]' />
    </Tooltip>

export const ChartTooltip = ({ content }: { content: string }) => <div className='text-xs text-center text-white p-2 bg-[#073956] rounded-sm opacity-90'>{content}</div>
