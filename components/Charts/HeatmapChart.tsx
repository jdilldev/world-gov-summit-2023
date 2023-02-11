import { HeatMap } from '@nivo/heatmap'
import { CHART_MARGINS, NIVO_THEME } from '../../app/constants';
import { ChartDimensions, LinearData } from '../../app/data/types'
import { ChartTooltip } from '../Shared';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const HeatmapChart = ({ data, dimensions: { width, height } }: { data: LinearData[], dimensions: ChartDimensions }) => (
    <HeatMap
        data={data}
        height={height}
        width={width}
        theme={NIVO_THEME}
        margin={{ ...CHART_MARGINS, left: 40, right: 30, }}
        valueFormat=">-.2s"
        enableLabels={false}
        forceSquare={true}
        xInnerPadding={.2}
        yInnerPadding={.2}
        axisRight={null}
        axisTop={null}
        opacity={.8}
        inactiveOpacity={.1}
        activeOpacity={1}
        hoverTarget={'cell'}
        axisLeft={null}
        colors={{
            type: 'sequential',
            colors: ['#2b5e72', '#c5eef2'],
            divergeAt: .6,
        }}
        emptyColor="#555555"
        tooltip={({ cell: { value, data: { x } } }) => <ChartTooltip content={`As of 2019, ${x} are using ${value}% of their renewable water resources `} />}
        legends={[
            {
                anchor: 'left',
                translateX: -40,
                translateY: 0,
                length: 60,
                thickness: 8,
                direction: 'column',
                tickPosition: 'after',
                tickSpacing: 4,
                ticks: 5,
                tickOverlap: false,
                tickFormat: '>-.2s',
                titleAlign: 'middle',
                titleOffset: 0
            }

        ]} />
)

export default HeatmapChart;