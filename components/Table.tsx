import { memo, useCallback } from "react"
import { getData, retrieveData } from "../app/data/generateData"
import { AggregatorType, CategoricalData, CountryMetrics, LinearData, M49_subregion } from "../app/data/types"

const Table = ({ aggregator, metric, selectedRegion }: { aggregator: AggregatorType, metric: CountryMetrics, selectedRegion?: M49_subregion | undefined }) => {
    const getDataPoints = useCallback((agg: AggregatorType, m: CountryMetrics, region: M49_subregion | undefined) => {
        return getData(agg, m, region)
    }, []
    )

    const data = getDataPoints(aggregator, metric, selectedRegion)

    return <table className="table-fixed border-collapse w-full">
        <thead className="w-full">
            <tr>
                <th className="w-2/3">{aggregator}</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody className="text-sm">
            {data.map(({ id, value }) => <tr className={`${id === 'World' ? 'text-red-400 bg-white' : ''}`}>
                <td>{id}</td>
                <td>{value.toFixed(2)}</td>
            </tr>)}

        </tbody>
    </table>
}

export default memo(Table)