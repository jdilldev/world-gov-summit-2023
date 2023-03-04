import { memo, useCallback } from "react"
import { AGGREGATOR_TO_TABLE_HEADING, AGGREGATOR_TO_TITLE } from "../app/constants"
import { getData, retrieveData } from "../app/data/generateData"
import { AggregatorType, CategoricalData, CountryMetrics, LinearData, M49_subregion } from "../app/data/types"

const Table = ({ aggregator, metric, selectedRegion }: { aggregator: AggregatorType, metric: CountryMetrics, selectedRegion?: M49_subregion }) => {
    const getDataPoints = useCallback((agg: AggregatorType, m: CountryMetrics, region: M49_subregion | undefined) => {
        return getData(agg, m, region)
    }, []
    )

    const data = getDataPoints(aggregator, metric, selectedRegion)

    return !data || data.length === 0
        ? <p>Info message</p>
        : <table className="table-fixed border-collapse w-full">
            <thead className="w-full">
                <tr>
                    <th className="w-[70%]">{AGGREGATOR_TO_TABLE_HEADING[aggregator]}</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody className="text-sm">
                {data.filter(({ id }) => id !== '').map(({ id, value }) => <tr className={`${id === 'World' ? 'text-red-400 bg-white' : ''}`}>
                    <td>{id}</td>
                    <td>{value.toFixed(2)}</td>
                </tr>)}
            </tbody>
        </table>
}

export default memo(Table)