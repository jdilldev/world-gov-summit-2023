import { Pie } from '@nivo/pie'
import { CHART_MARGINS, NIVO_THEME } from '../../app/constants/constants';
import { PercentileData } from '../../app/data/types'

const colors = ['#b3f5ffb9', '#00b1ccd9', '#047898e3']

const PieChart = ({ data, width, height, softMargins }: { softMargins?: boolean, data: PercentileData[], width: number, height: number }) => (
    <Pie
        width={width}
        height={height}
        theme={NIVO_THEME}
        data={data}
        valueFormat=" >-.2f"
        margin={CHART_MARGINS}
        innerRadius={0.6}
        padAngle={3}
        cornerRadius={1}
        enableArcLinkLabels={width > 245}
        activeOuterRadiusOffset={12}
        borderWidth={1}
        colors={colors}
        arcLinkLabelsTextColor="white"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={5}
        arcLinkLabelsStraightLength={6}
        arcLinkLabelsDiagonalLength={12}
        arcLabelsTextColor={'white'}
    />
)

export default PieChart;