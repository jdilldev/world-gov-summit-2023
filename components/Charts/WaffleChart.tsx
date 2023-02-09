import { Waffle, WaffleTooltipData } from '@nivo/waffle'
import { CHART_MARGINS } from '../../app/constants'
import { CategoricalData, ChartDimensions } from '../../app/data/types'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const WaffleChart = ({ data, dimensions: { width, height } }: { data: CategoricalData[], dimensions: ChartDimensions }) => (
    <Waffle
        width={width}
        height={height}
        data={data}
        total={174}
        rows={13}
        columns={14}
        //emptyColor='transparent'
        emptyOpacity={.3}
        margin={{ ...CHART_MARGINS, top: 15, bottom: 10, left: 5, right: 0 }}
        //colorBy={(d) => d.label === 'Decreased 3% or more' ? 'blue' : 'red'}
        //colors={['blue', 'red']}
        // @ts-ignore 
        colors={{ datum: 'color' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.3
                ]
            ]
        }}
        animate={true}
        motionStiffness={90}
        motionDamping={11}
        tooltip={({ id, label, color, value }: WaffleTooltipData) => <p>{id + ' ' + value}</p>}
    />
)

export default WaffleChart

