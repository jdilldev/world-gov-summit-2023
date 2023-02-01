import { getWorldAvg } from "../../../app/data/generateData"
import { ChartDimensions } from "../../../app/data/types"
import { StatCard, StatCardCustom } from "../../Shared"
import GdpIcon from '../../../public/icons/gdp.svg'
import SpaceIcon from '../../../public/icons/solar-system.svg'
import AstronautIcon from '../../../public/icons/astronaut.svg'
import BitcoinIcon from '../../../public/icons/crypto.svg'
import { PRE_CONTENT_ICON_SIZE } from "../../../app/constants"

export const CryptoStats = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    //https://www.investopedia.com/articles/forex/041515/countries-where-bitcoin-legal-illegal.asp
    const legal = 2
    const regulated = 9
    const banned = 9

    const StatLine = ({ stat, text, color }: { stat: string | number, text: string, color: string }) => (
        <p className={`flex flex-row gap-1 md:text-lg md:tracking-widest ${color}`}><span >{stat}</span>{text}</p>
    )
    const Content = () => (
        <div style={{ width, height }} className='flex flex-col h-full w-full place-items-center justify-evenly'>
            <BitcoinIcon className={PRE_CONTENT_ICON_SIZE + ' fill-green-yellow-500'} />
            <div className='capitalize md:font-equinox md:lowercase'>
                <StatLine color='text-green-400' stat={legal} text={'Legal'} />
                <StatLine color='text-yellow-400' stat={regulated} text={'Regulated'} />
                <StatLine color='text-red-400' stat={banned} text={'Banned'} />
            </div>

        </div>
    )
    return <StatCardCustom content={<Content />} dimensions={{ width, height }} />
}

export const GDPStats = ({ dimensions }: { dimensions: ChartDimensions }) => {
    const worldGdpAvg_2021 = getWorldAvg('2021_economic_growth')
    const worldGdpAvg_2018 = getWorldAvg('2018_economic_growth')
    return <StatCard preContent={<GdpIcon className={PRE_CONTENT_ICON_SIZE + ' fill-green-400'} />} stat={worldGdpAvg_2021.toFixed(1) + ' %'} secondaryText={'GDP Growth'} delta={worldGdpAvg_2021 - worldGdpAvg_2018} dimensions={dimensions} />
}

export const SpaceAgencies = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    //2018 https://www.civitas-stl.com/civ1819/Government-space-agencies.pdf 
    // 72 countries involved, 14 launch ability

    const SplitSpaceStats = () => {
        return <div style={{ width: width - 20, height }} className='w-full flex flex-col place-items-center'>
            {/*             <p className="text-center font-dreamscape text-xs md:text-base lg:text-lg">Across the Globe</p>*/}
            <SpaceIcon className={PRE_CONTENT_ICON_SIZE + ' fill-[#78cce2]'} />
            <div className="flex flex-row w-full text-white justify-evenly">
                <p className="flex flex-col items-center font-equinox"><span className='text-lg lg:text-2xl'>72</span><span className='text-xs md:text-sm lg:text-base text-center text-[#78cce2]'>Space Agencies</span></p>
                <div className="border-l-2 border-neutral-300 mt-2 -mb-1 lg:mb-2 mx-2" />
                <p className="flex flex-col items-center font-equinox"><span className='text-lg lg:text-2xl'>14</span><span className='text-xs md:text-sm lg:text-base text-center text-[#78cce2]'>Launch Ability</span></p>
            </div>
        </div>

    }

    return <StatCardCustom content={<SplitSpaceStats />} dimensions={{ width, height }} />
}

export const AstronautsAndSatellites = ({ dimensions }: { dimensions: ChartDimensions }) => {
    //https://www.civitas-stl.com/civ1819/Government-space-agencies.pdf (2018)
    //31 astronauts
    return <StatCard
        preContent={<AstronautIcon className={PRE_CONTENT_ICON_SIZE + ' fill-stone-400'} />}
        stat={'31 Nations'}
        text={'Have Astronauts'}
        dimensions={dimensions} />
}