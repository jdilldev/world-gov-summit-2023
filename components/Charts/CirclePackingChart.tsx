import { CirclePacking } from '@nivo/circle-packing'
import { NIVO_THEME } from '../../app/constants'
import { ChartDimensions, HierarchicalData } from '../../app/data/types'

const colors = ['#b3f5ffb9', '#00b1ccd9', '#047898e3']

const CirclePackingChart = ({ data, hasColors, dimensions: { width, height } }: { hasColors?: boolean, data: HierarchicalData, dimensions: ChartDimensions }) => (
    <CirclePacking
        width={width}
        height={height}
        data={data}
        animate={false}
        theme={NIVO_THEME}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        colors={hasColors ? colors : { scheme: 'yellow_green_blue' }}
        colorBy={'id'}
        childColor={{
            from: 'inherit',
            modifiers: [
                [
                    'brighter',
                    0.4
                ]
            ]
        }}
        padding={4}
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
        borderWidth={1}
        borderColor={'black'}

    />
)

export default CirclePackingChart