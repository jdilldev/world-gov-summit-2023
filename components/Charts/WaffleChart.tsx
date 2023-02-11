import { CellComponentProps } from '@nivo/heatmap'
import { Waffle, WaffleDatum, WaffleTooltipData } from '@nivo/waffle'
import { CHART_MARGINS } from '../../app/constants'
import { CategoricalData, ChartDimensions } from '../../app/data/types'
import SquareIcon from '../../public/icons/pattern.svg'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const CustomCell = ({
    position,
    size,
    x,
    y,
    color,
    fill,
    opacity,
    borderWidth,
    borderColor,
    data,
    onHover,
    onLeave,
    onClick,
}: any) => (
    < circle
        r={size / 2}
        cx={x + size / 2}
        cy={y + size / 2}
        fill={fill || color}
        strokeWidth={borderWidth}
        stroke={borderColor}
        opacity={opacity}
        onMouseEnter={onHover}
        onMouseMove={onHover}
        onMouseLeave={onLeave}
        onClick={event => {
            onClick({ position, color, x, y, data }, event)

        }}
    />
)

const WaffleChart = ({ rawData, data, dimensions: { width, height } }: { rawData: CategoricalData[], data: CategoricalData[], dimensions: ChartDimensions }) => (
    <Waffle
        width={width}
        height={height}
        data={data}
        total={171}
        rows={13}
        columns={14}
        cellComponent={CustomCell}
        fillDirection='top'
        //emptyColor='transparent'
        emptyOpacity={0}
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
        tooltip={({ id, label, color, value }: WaffleTooltipData) => {
            //  console.log(rawData)
            const actualVal = rawData.find(datum => datum.id == id)?.value
            return <p>{id + ' ' + Number(actualVal).toFixed(1) + '%'}</p>
        }}
    />
)

export default WaffleChart

