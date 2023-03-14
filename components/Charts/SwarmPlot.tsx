import { ResponsiveSwarmPlot, SwarmPlot as Swarm } from '@nivo/swarmplot'
import { NIVO_THEME, CHART_MARGINS } from '../../app/constants/constants'
import { CategoricalData, ChartDimensions } from '../../app/data/types'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const SwarmPlot = ({ data, dimensions: { width, height } }: { data: CategoricalData[], dimensions: ChartDimensions }) => (
    <Swarm
        data={data}
        height={height}
        width={width}
        theme={NIVO_THEME}
        margin={{ ...CHART_MARGINS, left: 40, bottom: 55, }}
        groups={['group A', 'group B', 'group C']}
        value="price"
        valueFormat="$.2f"
        valueScale={{ type: 'linear', min: 0, max: 500, reverse: false }}
        size={{
            key: 'volume',
            values: [
                4,
                20
            ],
            sizes: [
                6,
                20
            ]
        }}
        forceStrength={4}
        simulationIterations={100}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ],
                [
                    'opacity',
                    0.5
                ]
            ]
        }}
        axisRight={null}
        axisTop={null}
        axisBottom={{
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'group if vertical, price if horizontal',
            legendPosition: 'middle',
            legendOffset: 46
        }}
        axisLeft={{
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'left',
            legendPosition: 'middle',
            legendOffset: -50
        }}
    />
)

export default SwarmPlot