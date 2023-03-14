'use client';

import { useGlobalStore } from "../lib/store"


const MinMaxBox = ({ type, name, val }: { type: 'country' | 'region', name: string, val: number }) => <div className="bottom-item relative">
    <p className='text-lime-400 absolute top-0 text-xs'>{type}</p>
    <p className="font-equinox lowercase mt-3 text-center text-xs md:text-sm">{`${name && val ? name + ' : ' + val : ''}`}</p>
</div>

const CountryAndRegionalComparissons = () => {
    const { metric } = useGlobalStore()

    return <div className="flex justify-center gap-y-4 items-center w-full p-4 flex-wrap">
        <div className="flex flex-col w-full lg:max-w-[70%]">
            <p className="font-equinox text-xs lowercase text-cyan-500">Best Performing</p>
            <div className="flex flex-row">
                <MinMaxBox type="country" name={''} val={5} />
                <MinMaxBox type="region" name='' val={10} />
            </div>
            <p className="font-equinox text-xs lowercase text-rose-300">Worst Performing</p>
            <div className="flex flex-row">
                <MinMaxBox type="country" name='' val={5} />
                <MinMaxBox type="region" name='' val={5} />
            </div>
        </div>
    </div>
}


export default CountryAndRegionalComparissons
