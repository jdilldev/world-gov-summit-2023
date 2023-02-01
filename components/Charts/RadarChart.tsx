import { Radar } from '@nivo/radar'
import { CategoricalData, ChartDimensions, CountryMetrics } from '../../app/data/types'
import { NIVO_THEME } from '../../app/constants'
import { useDesktop } from '../../app/hooks/hooks'
import { GridLabelComponent } from '@nivo/radar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const RadarChart = ({ data, indexBy, keys, dimensions: { width, height } }: { data: { [key: string]: string | number }[], indexBy: string, keys: string[], dimensions: ChartDimensions }) => {
    const isDesktop = useDesktop()
    return <Radar
        width={width}
        height={height}
        data={data}
        keys={keys}
        gridLevels={6}
        enableDots={true}
        indexBy={indexBy}
        valueFormat=">-.2f"
        margin={{ top: 20, right: 20, bottom: 30, left: 20 }}
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
        theme={NIVO_THEME}
        //layers={['layers', 'grid', 'legends']}
        gridLabel={width < 350 ? () => <p>gu</p> : undefined}
    />
}

export default RadarChart
