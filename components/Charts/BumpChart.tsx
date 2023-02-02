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
        axisBottom={null}
        axisLeft={null}
        margin={{ top: 10, right: 40, bottom: 50, left: 30 }}
        axisRight={null}
        animate={false}
    />
)

export default BumpChart