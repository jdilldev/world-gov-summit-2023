'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { DEFAULT_THEME_PROMPT } from "../app/constants/constants"
import { replaceUnderscoreWithSpace } from "../utils"

const AggregatorSelect = () => {
    const router = useRouter()
    const pathname = usePathname()

    const searchParams = useSearchParams()
    const region = searchParams.get('region')

    const [_, theme, grouping, metric] = pathname!.split('/')

    return !theme ? <p className="md:hidden font-equinox w-full text-center lowercase z-10 fixed right-2 top-14 text-red-500">{DEFAULT_THEME_PROMPT}</p>
        : <select
            onChange={(e) => router.push(`/${theme}/${e.target.value}/${metric}${region ? '?region=' + region : ''}`)}
            className="z-10 w-full fixed right-2 top-12 md:static md:text-sm text-teal-500 md:-ml-1 md:text-pink-500 bg-transparent whitespace-pre-wrap"
            placeholder="Select Grouping"
            value={grouping}>
            <option value='world'>Worldwide</option>
            <option value='allRegions'>By Region</option>
            {region && grouping === 'singleRegion' && <option value='singleRegion'>{replaceUnderscoreWithSpace(region)}</option>}
        </select>
}

export default AggregatorSelect