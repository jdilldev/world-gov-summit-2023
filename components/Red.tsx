import { AggregatorType, CountryMetrics } from "../app/data/types"
import CountryAndRegionalComparissons from "./CountryAndRegionalComparissons"

type ComparissonDataType = {
    metric: CountryMetrics,
    grouping: AggregatorType
}

const Red = async ({ metric, grouping }: ComparissonDataType) => {


    return <CountryAndRegionalComparissons data={[]} />
}

export default Red