import { ParallelCoordinates } from '@nivo/parallel-coordinates'
import { CHART_MARGINS, NIVO_THEME } from '../../app/constants/constants'
import { CategoricalData, ChartDimensions } from '../../app/data/types'

const ParallelCoordinatesChart = ({ data, dimensions: { width, height } }: { data: CategoricalData[], dimensions: ChartDimensions }) => (
    <ParallelCoordinates
        data={data}
        width={width - 10}
        height={height}
        theme={NIVO_THEME}
        margin={CHART_MARGINS}
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
