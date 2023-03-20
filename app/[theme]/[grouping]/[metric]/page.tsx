
import React from 'react'
import { getAvg, getMetric, getMinMax } from '../../../api/routes';
import { WORLD_SUMMIT_THEMES } from '../../../constants/constants';
import type { AggregatorType, CountryMetrics, M49_subregion, RouteParams } from '../../../data/types'
import CountryAndRegionalComparissons from '../../../../components/CountryAndRegionalComparissons';
import DeltaIndicator from '../../../../components/DeltaIndicator';
import { replaceUnderscoreWithSpace } from '../../../../utils';
import TableAndMetric from '../../../../components/TableAndMetric';
import SidebarContent from '../../../../components/SidebarContent';

const getDeltaData = async (metric: CountryMetrics, grouping: AggregatorType, region?: M49_subregion) =>
    region ? await getAvg({ metric, grouping, region }) : await getAvg({ metric, grouping: (grouping as 'world' | 'allRegions') })

const getMinMaxData = async (metric: CountryMetrics, grouping: AggregatorType, region?: M49_subregion) =>
    region ? await getMinMax({ metric, grouping, region }) : await getMinMax({ metric, grouping: (grouping as 'world' | 'allRegions') })

const getTableData = async (metric: CountryMetrics, grouping: AggregatorType, region?: M49_subregion) =>
    region ? await getMetric({ metric, grouping, region }) : await getMetric({ metric, grouping: (grouping as 'world' | 'allRegions') })

const getWorldAvg = async (metric: CountryMetrics) => getAvg({ metric, grouping: 'world' })

export default async function Page({ params, searchParams }: {
    params: { theme: string, grouping: AggregatorType, metric: CountryMetrics },
    searchParams?: { region: string }
}) {
    const { theme, grouping, metric } = params
    const region = grouping === 'singleRegion' ? searchParams && searchParams.region ? replaceUnderscoreWithSpace(searchParams.region) : 'Northern America' : undefined

    const deltaData = await getDeltaData(metric, grouping, region)
    const minMaxDataCountries = await getMinMaxData(metric, grouping, region)
    const minMaxDataRegions = await getMinMaxData(metric, 'allRegions', region)
    const tableData = await getTableData(metric, grouping, region)
    const worldAvg = await getWorldAvg(metric)

    return <>
        <DeltaIndicator data={deltaData} metric={metric} grouping={grouping} region={region} />
        <CountryAndRegionalComparissons data={{ countries: minMaxDataCountries, regions: minMaxDataRegions }} grouping={grouping} theme={theme} />
        <TableAndMetric data={tableData} theme={theme} metric={metric} globalAvg={worldAvg} grouping={grouping} />
        <div>
            <SidebarContent theme={theme} metric={metric} grouping={grouping} data={tableData} />
        </div>
    </>


}

export function generateStaticParams() {
    const groupings = ["world", "allRegions", "singleRegion"];

    //go thru each theme and add its metrics to an array
    const staticParams: RouteParams[] = WORLD_SUMMIT_THEMES.reduce((acc: RouteParams[], curr) => {
        for (const metric of curr.metrics) {
            for (const grouping of groupings) {
                acc.push({
                    theme: curr.name.replace(/ /g, '_'),
                    grouping: (grouping as AggregatorType),
                    metric
                })
            }
        }

        return acc
    }, [])


    return staticParams
}
