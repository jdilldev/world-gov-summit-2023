'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { DEFAULT_THEME_PROMPT } from "../app/constants/constants"
import { replaceUnderscoreWithSpace } from "../utils"

const AggregatorSelect = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [_, theme, grouping, metric] = pathname!.split('/')
    const region = replaceUnderscoreWithSpace(searchParams.get('region') || '')

    return !theme ? <p className="font-equinox lowercase z-10 fixed right-2 top-12 text-red-500">{DEFAULT_THEME_PROMPT}</p> : <select
        onChange={(e) => router.push(`/${theme}/${e.target.value}/${metric}`)}
        className="z-10 fixed right-2 top-12 md:inline text-sm text-teal-400 md:text-pink-500 bg-transparent w-fit whitespace-pre-wrap"
        placeholder="Select Grouping"
        value={grouping}>
        <option value='world'>Worldwide</option>
        <option value='allRegions'>By Region</option>
        {grouping === 'singleRegion' && <option value='singleRegion'>{region}</option>}
    </select>
}

export default AggregatorSelect