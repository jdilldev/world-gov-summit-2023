import { Bump } from '@nivo/bump'
import { NIVO_THEME } from '../../app/constants'
import { ChartDimensions, LinearData } from '../../app/data/types'

const BumpChart = ({ data, dimensions: { width, height } }: { data: LinearData[], dimensions: ChartDimensions }) => (
    <Bump
        data={data}
        width={width}
        height={height}
        theme={NIVO_THEME}
        colors={{ scheme: 'blues' }}
        lineWidth={1}
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
        axisBottom={null}
        axisLeft={{
            tickSize: 1,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'ranking',
            legendPosition: 'middle',
            legendOffset: -40,
            tickValues: [0, 50],
            ticksPosition: 'before'
        }}
        margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
        axisRight={null}
        animate={false}
    />
)

export default BumpChart