import { CirclePacking } from '@nivo/circle-packing'
import { CHART_MARGINS, NIVO_THEME } from '../../app/constants'
import { ChartDimensions, HierarchicalData } from '../../app/data/types'
import { ChartTooltip, CustomTooltip } from '../Shared'

const colorsUnique = ['#b3f5ffb9', '#00b1ccd9', '#047898e3', 'green', 'red', 'purple', 'pink', 'yellow', 'gray', 'blue', 'orange', 'black', 'white', 'magenta']
const colors = ['#84daecda', '#ade8f4c6', '#90e1efcd', '#64bcceb9', '#00b4d8cb', '#0095c7c6', '#0076b6c9', '#375885d1', '#0975b4bb']
const CirclePackingChart = ({ data, hasColors, dimensions: { width, height } }: { hasColors?: boolean, data: HierarchicalData, dimensions: ChartDimensions }) => (
    <CirclePacking
        width={width}
        height={height}
        data={data}
        animate={false}
        theme={NIVO_THEME}
        valueFormat={value => `${Number(value)} `
        }
        margin={{ top: 0, left: 0, bottom: 0, right: 0 }}
        colors={colors}
        leavesOnly={true}
        colorBy={'id'}
        childColor={'red'}
        padding={10}
        enableLabels={true}
        labelsFilter={function (n) { return 2 === n.node.depth }}
        labelsSkipRadius={10}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}

        borderWidth={3}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'opacity',
                    1.3
                ]
            ]
        }}
        tooltip={({ id, formattedValue }) =>
            <ChartTooltip
                content={
                    <p className='font-equinox text-base lowercase'>
                        <span className='light-font-color'>{id}</span>
                        <br />
                        <span className='font-body'>{formattedValue + ' million deaths'}</span>
                    </p>}
            />}
    />
)

export default CirclePackingChart