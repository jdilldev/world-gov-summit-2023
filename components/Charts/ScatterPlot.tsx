import { ScatterPlot } from '@nivo/scatterplot'
import { NIVO_THEME } from '../../app/constants'
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
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{ type: 'linear', min: 0, max: 'auto' }}
        xFormat=">-.2f"
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        yFormat=">-.2f"
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'weight',
            legendPosition: 'middle',
            legendOffset: 46
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'size',
            legendPosition: 'middle',
            legendOffset: -60
        }}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 130,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 12,
                itemsSpacing: 5,
                itemDirection: 'left-to-right',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

export default ScatterPlotChart