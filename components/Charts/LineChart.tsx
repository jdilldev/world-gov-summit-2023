import { Line, Point, Serie } from '@nivo/line'
import { CHART_MARGINS, NIVO_THEME } from '../../app/constants'
import { ChartDimensions, LinearData } from '../../app/data/types'
import { ChartTooltip } from '../Shared';


const LineChart = ({ data, tooltipContent, dimensions: { width, height }, max, min }: { data: LinearData[], tooltipContent: ({ p }: { p: Point }) => string, dimensions: ChartDimensions, max?: number, min?: number }) => (
    <Line
        width={width}
        height={height}
        data={data}
        theme={NIVO_THEME}
        lineWidth={2}
        enableSlices={false}
        colors={{ scheme: 'yellow_green_blue' }}
        margin={{ ...CHART_MARGINS, left: 70 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: min ? min : 'auto',
            max: max ? max : 'auto',
            stacked: false,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        gridXValues={['a', 'b']}
        axisBottom={null}
        axisLeft={{
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'count',
            tickValues: 5,
            legendOffset: -50,
            legendPosition: 'middle'
        }}
        pointSize={5}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        xFormat={(x) => (x as string).split('_')[0]}
        tooltip={({ point }) => {
            const content = tooltipContent({ p: point })
            return <ChartTooltip content={content} />
        }}
    />
)

export default LineChart;