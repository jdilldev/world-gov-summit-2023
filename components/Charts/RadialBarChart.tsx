import { RadialBar } from '@nivo/radial-bar'
import { ParentSize } from '@visx/responsive'
import { NIVO_THEME } from '../../app/constants'
import { LinearData } from '../../app/data/types'

const RadialBarChart = ({ data, width, height, relevantMetric }: { data: LinearData[], width: number, height: number, relevantMetric: string }) => {

    return <RadialBar
        maxValue={100}
        enableTracks={true}
        tracksColor='#052f42d5' //005066
        width={width}
        height={height}
        data={data}
        valueFormat=">-.2f"
        innerRadius={0.05}
        padding={0.45}
        cornerRadius={0}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        radialAxisStart={width < 150 ? null : { tickSize: 0, tickPadding: 8, tickRotation: 0 }}
        circularAxisOuter={null}
        enableRadialGrid={false}
        theme={NIVO_THEME}
        borderWidth={2}
        borderColor={({ groupId }) => groupId === relevantMetric ? '#a0e5ec' : 'transparent'}
        colors={({ groupId }) => groupId === relevantMetric ? '#1ddaec' : '#52b4cc9e'}
        tooltip={({ bar }) => <div className='absolute right-0 min-w-[100px] text-xs text-center text-white p-2 bg-[#073956] rounded-sm opacity-90'><p className='z-40'> Countries spent an average {bar.value.toFixed(1)}% of their GDP on {bar.groupId} </p></div>}
    />
}

export default RadialBarChart
