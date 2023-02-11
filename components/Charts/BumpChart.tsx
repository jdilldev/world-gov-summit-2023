import { Bump } from '@nivo/bump'
import { CHART_MARGINS, NIVO_THEME } from '../../app/constants'
import { ChartDimensions, LinearData } from '../../app/data/types'
import { ChartTooltip } from '../Shared'

const BumpChart = ({ data, dimensions: { width, height } }: { data: LinearData[], dimensions: ChartDimensions }) => (
    <Bump
        data={data}
        width={width}
        height={height}
        theme={NIVO_THEME}
        margin={{ ...CHART_MARGINS, left: 40, bottom: 55 }}
        colors={{ scheme: 'blues' }}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={2}
        activePointSize={8}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
        endLabel={false}
        enableGridX={false}
        enableGridY={false}
        axisTop={null}
        axisBottom={{
            tickValues: 2,
            renderTick: ({ value }) => <span>{value}</span>
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'ranking',
            legendPosition: 'middle',
            legendOffset: -40,
        }}
        axisRight={null}
        animate={false}
        tooltip={({ serie: { data: { data, id } } }) => {
            console.log(data)
            return <ChartTooltip content={<p>
                {id}
                <br />
                ({data[0].x.split('_')[0]}) {(data[0].y).toFixed(3)}
                <br />
                ({data[1].x.split('_')[0]}) {(data[1].y).toFixed(3)}
            </p>} />
        }}
    />
)

export default BumpChart