import { Bullet } from '@nivo/bullet'
import { NIVO_THEME } from '../../app/constants'

type BulletData = {
    id: string,
    ranges: number[],
    measures: number[],
    markers: number[]
}

export const measureColors = ['#b2f54dca', 'transparent', '#8837faea']
export const rangeColors = ['#0e5f76b4']
export const markerColors = ['#ffb84ddf']

const BulletChart = ({ data, width, height }: { data: BulletData[], width: number, height: number }) => (
    <Bullet
        width={width}
        height={height - 10}
        data={data}
        margin={{ top: 10, right: 40, bottom: 90, left: 90 }}
        spacing={height < 250 ? 30 : 65}
        markerSize={1}
        measureSize={.2}
        //measureBorderColor={'#0ff0f8e0'}
        //titleRotation={-29}
        rangeBorderWidth={3}
        rangeBorderColor={'#37a2a5cc'}
        //rangeBorderWidth={2}
        titleAlign="start"
        titleOffsetX={-90}
        theme={NIVO_THEME}
        rangeColors={rangeColors}
        measureColors={measureColors}
        markerColors={markerColors}
    // tooltip={() => <p>hi</p>}
    />
)

export default BulletChart