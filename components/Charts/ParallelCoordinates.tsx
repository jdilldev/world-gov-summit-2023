import { ParallelCoordinates } from '@nivo/parallel-coordinates'
import { NIVO_THEME } from '../../app/constants'
import { CategoricalData, ChartDimensions } from '../../app/data/types'

const ParallelCoordinatesChart = ({ data, dimensions: { width, height } }: { data: CategoricalData[], dimensions: ChartDimensions }) => (
    <ParallelCoordinates
        data={data}
        width={width - 10}
        height={height}
        theme={NIVO_THEME}
        margin={{ top: 10, right: 40, bottom: 10, left: 30 }}
        layout='horizontal'
        variables={[
            {
                key: 'Integrity Score',
                type: 'linear',
                min: 0,
                max: 20,
                ticksPosition: 'before',
                legend: 'integrity',
                legendPosition: 'start',
                legendOffset: 10
            },
            {
                key: 'HDI',
                type: 'linear',
                min: 0,
                max: 10,
                ticksPosition: 'before',
                legend: 'hdi',
                legendPosition: 'start',
                legendOffset: 10
            },

        ]}
    />
)

export default ParallelCoordinatesChart
