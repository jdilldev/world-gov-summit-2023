
import { Bar } from '@nivo/bar'
import { HeatMap } from '@nivo/heatmap'
import { RadialBar } from '@nivo/radial-bar'
import { NIVO_THEME } from '../../app/constants'
import { ChartDimensions, CountryMetrics, LinearData } from '../../app/data/types'




const GaugeChart = ({ avg, text, percentage, dimensions: { width, height } }: { avg: number, text: string, percentage: boolean, dimensions: ChartDimensions }) => {
    const data = [
        {
            "id": "gauge",
            "data": [
                {
                    "x": "any",
                    "y": avg
                },
                {
                    "x": "avg",
                    "y": 2
                },
                {
                    "x": "ogre",
                    "y": 100 - avg - 2
                },

            ]
        }
    ]

    return <div className='flex flex-col items-center'>
        <RadialBar
            width={width}
            height={height - 40}
            data={data}
            animate={false}
            maxValue={100}
            theme={NIVO_THEME}
            valueFormat=" >-.2f"
            colors={['#50c5d7e6', '#b2f54de0',]}
            startAngle={-90}
            endAngle={90}
            padding={0}
            tooltip={() => null}
            innerRadius={.8}
            cornerRadius={0}
            margin={{ top: 0, right: 30, bottom: 0, left: 25 }}
            enableTracks={false}
            enableRadialGrid={false}
            enableCircularGrid={false}
            radialAxisStart={null}
            circularAxisOuter={{ tickSize: 8, tickPadding: 10, tickRotation: 0 }}
        />
        <p className={`flex flex-col items-center top-16 absolute text-white font-medium text-center text-2xl whitespace-prewrap`}>{avg.toFixed(1)}{percentage ? '%' : ''}<span className='text-sm font-thin'>{text}</span></p>
    </div>
}

export default GaugeChart
