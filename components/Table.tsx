import { memo, useCallback } from "react"
import { getData, retrieveData } from "../app/data/generateData"
import { AggregatorType, CategoricalData, CountryMetrics, LinearData } from "../app/data/types"

const Table = ({ aggregator, metric }: { aggregator: AggregatorType, metric: CountryMetrics }) => {
    const getDataPoints = useCallback((agg: AggregatorType, m: CountryMetrics) => {
        return getData(agg, m)
    }, []
    )

    const data = getDataPoints(aggregator, metric)
    console.log(data)

    return <table className="table-fixed border-collapse w-full">
        <thead className="w-full">
            <tr>
                <th className="w-3/4">{aggregator}</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            {data.map(({ id, value }) => <tr>
                <td className="w-3/4">{id}</td>
                <td>{value.toFixed(2)}</td>
            </tr>)}

        </tbody>
    </table>
}

export default memo(Table)