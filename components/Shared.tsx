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

export const H1 = ({ text }: { text: string }) => <h1 className='font-equinox text-lg'></h1>

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

    const indicatorClass = 'w-2 h-2 lg:w-3 lg:h-3 '
    if (Math.abs(delta).toFixed(1) === '0.0') {
        return <NeutralIndicator className={indicatorClass + 'fill-[#fcd706]'} />
    } else if (delta > 0) {
        return <IncreaseIndicator className={indicatorClass + 'fill-green-400'} />
    } else if (delta < 0) {
        return <DecreaseIndicator className={indicatorClass + 'fill-red-400'} />
    }
}

type StatCardProps = {
    stat: string | ReactNode,
    dimensions: ChartDimensions
    percentage?: boolean;
    year?: string;
    icon?: ReactNode;
    text?: string,
    metric?: string;
    delta?: number;
    topCountry?: { country: string, value: number };
    bottomCountry?: { country: string, value: number };
}

export const StatCard = ({ stat, text, icon, metric, year, delta, percentage = true, topCountry, bottomCountry, dimensions: { width, height } }: StatCardProps) => {
    return <div style={{ width: width, height, }} className={`pr-2 flex flex-col justify-between w-full h-full font-equinox lowercase items-center lg:justify-center default-font-color`}>
        <div className='flex flex-row w-full basis-1/4'>
            {metric && <p className='w-full text-xs md:text-sm tracking-widest lowercase default-font-color'>{metric}</p>}
            {<div className='flex flex-col w-full'>
                {delta &&
                    <p className='self-end flex flex-row items-center gap-1 text-white text-sm font-equinox lowercase'>
                        <span>{getDeltaIndicator(delta)}</span>
                        <span>{delta.toFixed(1)} {percentage ? '%' : ''}</span>
                    </p>}
                <p className={`${delta ? '-mt-1' : 'mt-0'} text-xs md:text-sm text-end text-white`}>{year}</p>
            </div>}
        </div>
        <div className='flex flex-col items-center basis-3/4 gap-2 justify-between lg:justify-center'>
            {icon}
            {/*         <p className='font-body text-sm text-center text-white'>In 2018 31 Nations had astronatus. lorem ipsuin is a thing to write i am just ritng text</p>*/}
            <span className='mb-1.5 -mt-2 text-base md:text-xl lg:text-xl tracking-widest light-font-color underline underline-offset-4 decoration-2 decoration-solid decoration-[#78cce2]'>{stat}</span>
            <p className='-mt-2 md:font-nebula text-stone-200 text-center text-xs md:text-sm  md:whitespace-normal'>{text}</p>
            <div className='flex flex-row flex-wrap -ml-3 gap-1 justify-center '>
                {topCountry && <p className='-mt-1 text-xs md:text-sm text-cyan-200'>{`${topCountry.country}: ${topCountry.value}`}</p>}
                {bottomCountry && <p className='-mt-1 text-xs md:text-sm text-rose-400'>{`${bottomCountry.country}: ${bottomCountry.value}`}</p>}
            </div>
        </div>
    </div >
}

export const StatCardCustom = ({ content, dimensions: { width, height } }: { content: ReactNode, dimensions: ChartDimensions }) => {
    return <div style={{ width: width - 5, height, }}>{content}</div>
}

export const CustomTooltip = ({ text, placement, fill }: { text: string | ReactNode, placement?: TooltipPlacement, fill?: string }) =>
    <Tooltip content={<div className='min-w-[150px] max-w-[300px] text-center'>{text}</div>} trigger="click" placement={placement ? placement : 'top'}>
        <InfoIcon className='h-3 w-3 fill-[#1088a7bd]' />
    </Tooltip>

export const ChartTooltip = ({ content }: { content: string | ReactNode }) => <div className='z-100  text-xs font-body text-center text-white p-2 bg-[#0d5680] rounded-sm'>{content}</div>
