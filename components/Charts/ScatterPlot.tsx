import { ScatterPlot } from '@nivo/scatterplot'
import { CHART_MARGINS, NIVO_THEME } from '../../app/constants'
import { ChartDimensions, LinearData } from '../../app/data/types'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const ScatterPlotChart = ({ data, dimensions: { width, height } }: { data: LinearData[], dimensions: ChartDimensions }) => (
    <ScatterPlot
        data={data}
        height={height}
        width={width}
        theme={NIVO_THEME}
        colors={['#39b8c7',]}
        margin={{ ...CHART_MARGINS, left: 50, bottom: 45 }}
        xScale={{ type: 'linear', min: 0, max: 'auto' }}
        xFormat=">-.2f"
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        yFormat=">-.2f"
        blendMode="hard-light"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '% of Electricity from Renewables',
            legendPosition: 'middle',
            legendOffset: 35
        }}
        axisLeft={{
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'CO2e Emissions p/ Capita',
            legendPosition: 'start',
            legendOffset: -35,
        }}
    />
)

export default ScatterPlotChart