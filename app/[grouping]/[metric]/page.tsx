
import React from 'react'
import { getAvg, getMinMax } from '../../api/routes';
import { CONTEXT_CATEGORY, WORLD_SUMMIT_THEMES } from '../../constants/constants';
import type { AggregatorType, CountryMetrics, M49_subregion } from '../../data/types'
import CountryAndRegionalComparissons from '../../../components/CountryAndRegionalComparissons';
import Table from "../../../components/Table";
import DeltaIndicator from '../../../components/DeltaIndicator';


const getDeltaData = async (metric: CountryMetrics, grouping: AggregatorType, region?: M49_subregion) =>
    region ? await getAvg({ metric, grouping, region }) : await getAvg({ metric, grouping: (grouping as 'world' | 'allRegions') })

const getMinMaxData = async (metric: CountryMetrics, grouping: AggregatorType, region?: M49_subregion) =>
    region ? await getMinMax({ metric, grouping, region }) : await getMinMax({ metric, grouping: (grouping as 'world' | 'allRegions') })

export default async function Page({ params, searchParams }: {
    params: { grouping: AggregatorType, metric: CountryMetrics },
    searchParams?: { region: string }
}) {
    const { grouping, metric } = params
    const region = searchParams && searchParams.region ? searchParams.region.replace(/_/g, ' ') : undefined

    console.log(region, grouping, metric)
    const deltaData = await getDeltaData(metric, grouping, region)
    const minMaxDataCountries = await getMinMaxData(metric, grouping, region)
    const minMaxDataRegions = await getMinMaxData(metric, 'allRegions', region)

    return metric ? <>
        <DeltaIndicator data={deltaData} metric={metric} grouping={grouping} region={region} />
        <div className="dashboard-right flex flex-col mr-3 h-full">
            <div className="hidden md:inline dashboard-card h-2/3 mb-3">
                <p className="font-agelast tracking-widest">Rank</p>
                <div className="flex flex-row flex-wrap justify-between items-center text-xs">
                    <Table data={[]} />
                </div>
            </div>
            <CountryAndRegionalComparissons data={{ countries: minMaxDataCountries, regions: minMaxDataRegions }} />
            <div className="dashboard-card hidden md:inline md:h-1/3 mb-4">
                <p className="font-agelast tracking-widest">{CONTEXT_CATEGORY}</p>
                <p className="font-body text-sm font-thin">TODO</p>
            </div>
        </div>
    </>
        : <></>

}

export async function generateStaticParams() {
    const staticParams: { grouping: AggregatorType, metric: CountryMetrics }[] = []
    const groupings = ["world", "multiRegions", "singleRegion"];

    //go thru each theme and add its metrics to an array
    const availableMetrics: CountryMetrics[] = WORLD_SUMMIT_THEMES.reduce((acc: CountryMetrics[], curr) => {
        acc.push(...curr.metrics)
        return acc
    }, [])

    //return that array as an obj {metric: <metric>}
    availableMetrics.forEach(metric => {
        for (const grouping in groupings) {
            staticParams.push({ grouping: (grouping as AggregatorType), metric })
        }
    })

    return staticParams
}
