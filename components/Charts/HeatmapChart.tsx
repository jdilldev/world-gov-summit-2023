import { HeatMap } from '@nivo/heatmap'
import { NIVO_THEME } from '../../app/constants';
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
        margin={{ top: 0, right: 10, bottom: 0, left: 20 }}
        valueFormat=">-.2s"
        enableLabels={false}
        forceSquare={true}
        xInnerPadding={.2}
        yInnerPadding={.2}
        axisRight={null}
        axisTop={null}
        opacity={1}
        hoverTarget={'cell'}
        axisLeft={null}
        colors={{
            type: 'sequential',
            scheme: 'blues',
            divergeAt: 0.6,
        }}
        emptyColor="#555555"
        tooltip={({ cell: { value, data: { x } } }) => <ChartTooltip content={`As of 2019, ${x} are using ${value}% of their renewable water resources `} />}

        legends={[
            {
                anchor: 'bottom',
                translateX: 0,
                translateY: 10,
                length: 400,
                thickness: 8,
                direction: 'row',
                tickPosition: 'after',
                tickSize: 3,
                tickSpacing: 4,
                tickOverlap: false,
                tickFormat: '>-.2s',
                title: 'percentage',
                titleAlign: 'middle',
                titleOffset: -45
            }

        ]} />
)

export default HeatmapChart;