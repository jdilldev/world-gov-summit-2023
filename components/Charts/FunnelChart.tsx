import { Funnel } from '@nivo/funnel'
import { NIVO_THEME } from '../../app/constants';
import { ChartDimensions, LinearData, PercentileData } from '../../app/data/types'
import { ChartTooltip } from '../Shared';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const FunnelChart = ({ data, dimensions: { width, height } }: { data: PercentileData[], dimensions: ChartDimensions }) => (
    <Funnel
        data={data}
        direction='horizontal'
        height={height}
        enableLabel={true}
        labelColor={'white'}
        enableBeforeSeparators={false}
        width={width}
        colors={['#29788e', '#78cce2', '#a5dfe4']}
        theme={NIVO_THEME}
        margin={{ top: 15, right: 20, bottom: 10, left: 20 }}
        valueFormat=">-.2s"
        borderOpacity={.4}
        borderWidth={20}
        fillOpacity={.8}
        currentPartSizeExtension={16}
        currentBorderWidth={20}
        motionConfig="wobbly"
    //tooltip={({ cell: { value, data: { x } } }) => <ChartTooltip content={`As of 2019, ${x} are using ${value}% of their renewable water resources `} />}
    />
)

export default FunnelChart;