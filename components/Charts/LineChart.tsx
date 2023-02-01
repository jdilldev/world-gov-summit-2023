import { Line, Serie } from '@nivo/line'
import { NIVO_THEME } from '../../app/constants'
import { ChartDimensions, LinearData } from '../../app/data/types'
import { ChartTooltip } from '../Shared';


const LineChart = ({ data, dimensions: { width, height }, max, min }: { data: LinearData[], dimensions: ChartDimensions, max?: number, min?: number }) => (
    <Line
        width={width}
        height={height}
        data={data}
        theme={NIVO_THEME}
        lineWidth={2}
        enableSlices={false}
        colors={{ scheme: 'yellow_green_blue' }}
        margin={{ top: 10, right: 20, bottom: 30, left: 30 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: min ? min : 0,
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
            //legend: 'count',
            tickValues: [0, 20, 40, 60,],
            legendOffset: 0,
            legendPosition: 'middle'
        }}
        pointSize={5}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        xFormat={(x) => (x as string).split('_')[0]}
        tooltip={({ point: { serieId, data: { xFormatted, yFormatted } } }) => <ChartTooltip content={`In ${xFormatted}, ${yFormatted} of ${serieId}'s energy was renewable`} />}
    />
)

export default LineChart;