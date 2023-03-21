'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { WORLD_SUMMIT_THEMES } from "../app/constants/constants";
import { AggregatorType, CountryMetrics } from "../app/data/types";
import { replaceUnderscoreWithSpace } from "../utils";


const MetricSelect = ({ theme, grouping, metric }: { theme: string, grouping: AggregatorType, metric: CountryMetrics }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const region = searchParams.get('region')

    return <div className='fixed flex flex-col bottom-2 self-center items-center border-solid border-b-2 border-lime-500'>
        <span className='font-equinox text-sm text-lime-500'>Metric</span>
        <select
            className='text-sm bg-transparent'
            value={metric}
            onChange={(e) => {
                const pathnameWithUpdatedMetric = `${theme}/${grouping}/${e.target.value}${region ? '?region=' + region : ''}`;
                router.push(pathnameWithUpdatedMetric)
            }}
        >
            {WORLD_SUMMIT_THEMES.find(
                summit_theme =>
                    summit_theme.name === replaceUnderscoreWithSpace(theme))!.metrics.map(metric => <option key={metric} value={metric}>{metric}</option>)}
        </select>
    </div>
}

export default MetricSelect