import { CirclePacking } from '@nivo/circle-packing'
import { NIVO_THEME } from '../../app/constants'
import { ChartDimensions, HierarchicalData } from '../../app/data/types'
const CirclePackingChart = ({ data, dimensions: { width, height } }: { data: HierarchicalData, dimensions: ChartDimensions }) => (
    <CirclePacking
        width={width}
        height={height}
        data={data}
        animate={false}
        theme={NIVO_THEME}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        colors={{ scheme: 'yellow_green_blue' }}
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