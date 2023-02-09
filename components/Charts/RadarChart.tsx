'use client';

import { Radar } from '@nivo/radar'
import { CategoricalData, ChartDimensions, CountryMetrics } from '../../app/data/types'
import { CHART_MARGINS, NIVO_THEME } from '../../app/constants'
import { GridLabelComponent } from '@nivo/radar'
import { ChartTooltip } from '../Shared';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const RadarChart = ({ data, indexBy, keys, dimensions: { width, height } }: { data: { [key: string]: string | number }[], indexBy: string, keys: string[], dimensions: ChartDimensions }) => {
    return <Radar
        width={width}
        height={height}
        data={data}
        keys={keys}
        gridLevels={6}
        enableDots={true}
        indexBy={indexBy}
        valueFormat=">-.2f"
        margin={CHART_MARGINS}
        borderColor={'#78cce2'}
        borderWidth={2}
        gridLabelOffset={10}
        //dotSize={3}
        dotColor={{ theme: 'background' }}
        // dotBorderWidth={1}
        colors={['#48bde7']}
        fillOpacity={.6}
        blendMode="screen"
        motionConfig="stiff"
        gridShape='linear'
        //layers={['layers', 'grid', 'legends']}
        // gridLabel={() => width > 150 ? undefined : <p>o</p>}
        sliceTooltip={({ data, index }) => <ChartTooltip content={`${index} -${data[0]['formattedValue']}`} />}

    />
}

export default RadarChart
