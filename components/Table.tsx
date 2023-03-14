import { memo } from "react"
import { AGGREGATOR_TO_TABLE_HEADING } from "../app/constants/constants"
import { AggregatorType } from "../app/data/types"


const Table = ({ data, aggregator }: { data: any[], aggregator: AggregatorType }) => {

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
                {/*  {data.filter(({ id }) => id !== '').map(({ id, value }) => {
                    console.log(data)
                    return <tr className={`${id === 'World' ? 'text-red-400 bg-white' : ''}`}>
                        <td>{value}</td>
                        <td>{value}</td>
                    </tr>
                })}
 */}
            </tbody>
        </table>
}

export default memo(Table)