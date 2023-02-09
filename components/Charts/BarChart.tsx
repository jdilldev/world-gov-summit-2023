import { Bar } from '@nivo/bar'
import { CHART_MARGINS, NIVO_THEME } from '../../app/constants'
import { CategoricalData, ChartDimensions } from '../../app/data/types'


const BarChart = ({ data, index, keys, dimensions: { width, height } }: { data: CategoricalData[], index: string, keys: string[], dimensions: ChartDimensions }) => (
    <Bar
        data={data}
        height={height}
        width={width}
        theme={NIVO_THEME}
        keys={keys}
        layout='horizontal'
        indexBy={index}
        margin={{ ...CHART_MARGINS, top: 0, bottom: 5, left: 80 }}
        padding={0.3}
        colors={['#78cde2b5']}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={50}
        labelSkipHeight={50}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        role="application"
        barAriaLabel={function (e) { return e.formattedValue + " in country: " + e.indexValue }}
    />
)

export default BarChart