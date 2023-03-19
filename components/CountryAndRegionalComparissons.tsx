'use client';

import { DEFAULT_THEME_PROMPT } from "../app/constants/constants";
import { useGlobalStore } from "../lib/store"


const MinMaxBox = ({ type, name, val }: { type: 'country' | 'region', name: string, val: number }) => <div className="bottom-item relative text-white">
    <p className='text-lime-400 absolute top-0 text-xs'>{type}</p>
    {/** 0 is a valid value */}
    <p className="font-equinox lowercase mt-3 text-center text-xs md:text-sm">{`${name && !isNaN(val) ? name + ' : ' + val : 'No data'}`}</p>
</div>

const CountryAndRegionalComparissons = ({ data }: { data: { countries: any, regions: any } }) => {
    const { theme, metric, grouping } = useGlobalStore()
    if (theme === DEFAULT_THEME_PROMPT) return <></>


    const isThemeSelected = (theme !== DEFAULT_THEME_PROMPT)
    const isSingleRegionGrouping = (grouping === 'singleRegion')


    // get data for most recent year if available
    const { min: minC, max: maxC } = data.countries.length ? data.countries.at(0) : { min: 'No Data', max: 'No Data' }
    const { country: minCountry, v: minValC } = minC
    const { country: maxCountry, v: maxValC } = maxC

    const { min: minR, max: maxR } = data.regions.at(0)
    const { region: minRegion, v: minValR } = minR
    const { region: maxRegion, v: maxValR } = maxR

    return <div className="fixed -translate-x-1/3 left-1/2 bottom-0 w-2/3 md:left-[40%] md:fixed md:w-[60%] md:place-self-center flex flex-col justify-center gap-y-4 items-center p-4">
        {!isThemeSelected && <p className="text-center font-nebula text-red-500">Please Select a Theme</p>}
        <div className="flex flex-col w-full lg:max-w-[70%]">
            <p className={`font-equinox text-xs lowercase text-cyan-500 ${isSingleRegionGrouping ? 'text-center' : 'text-left'}`}>Best Performing</p>
            <div className="flex flex-row w-full justify-center">
                <MinMaxBox type="country" name={maxCountry} val={maxValC} />
                {!isSingleRegionGrouping && <MinMaxBox type="region" name={maxRegion} val={maxValR} />}
            </div>
            <p className={`font-equinox text-xs lowercase text-rose-400 ${isSingleRegionGrouping ? 'text-center' : 'text-left'}`}>Worst Performing</p>
            <div className="flex flex-row justify-center">
                <MinMaxBox type="country" name={minCountry} val={minValC} />
                {!isSingleRegionGrouping && <MinMaxBox type="region" name={minRegion} val={minValR} />}
            </div>
        </div>
    </div>
}


export default CountryAndRegionalComparissons
