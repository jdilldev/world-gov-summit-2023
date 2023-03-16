'use client';

import { DEFAULT_THEME_PROMPT } from "../app/constants/constants";
import { useGlobalStore } from "../lib/store"


const MinMaxBox = ({ type, name, val }: { type: 'country' | 'region', name: string, val: number }) => <div className="bottom-item relative">
    <p className='text-lime-400 absolute top-0 text-xs'>{type}</p>
    <p className="font-equinox lowercase mt-3 text-center text-xs md:text-sm">{`${name && val ? name + ' : ' + val : ''}`}</p>
</div>

const CountryAndRegionalComparissons = ({ data }: { data: any[] }) => {
    const { theme, metric, grouping } = useGlobalStore()
    const isThemeSelected = (theme !== DEFAULT_THEME_PROMPT)
    const isSingleRegionGrouping = (grouping === 'singleRegion')

    const { year, min, max } = data.at(0)
    const { country: minCountry, v: minVal } = min
    const { country: maxCountry, v: maxVal } = max

    return <div className="flex flex-col justify-center gap-y-4 items-center w-full p-4">
        {!isThemeSelected && <p className="text-center font-nebula text-red-500">Please Select a Theme</p>}
        <div className="flex flex-col w-full lg:max-w-[70%]">
            <p className={`font-equinox text-xs lowercase text-cyan-500 ${isSingleRegionGrouping ? 'text-center' : 'text-left'}`}>Best Performing</p>
            <div className="flex flex-row w-full justify-center">
                <MinMaxBox type="country" name={maxCountry} val={maxVal} />
                {!isSingleRegionGrouping && <MinMaxBox type="region" name='' val={max} />}
            </div>
            <p className="font-equinox text-xs lowercase text-rose-300">Worst Performing</p>
            <div className="flex flex-row justify-center">
                <MinMaxBox type="country" name={minCountry} val={minVal} />
                {!isSingleRegionGrouping && <MinMaxBox type="region" name='' val={5} />}
            </div>
        </div>
    </div>
}


export default CountryAndRegionalComparissons
