import { getWorldAvg, retrieveData } from "../../../app/data/generateData"
import { ChartDimensions, HierarchicalData } from "../../../app/data/types"
import { CustomTooltip, StatCard, StatCardCustom } from "../../Shared"
import GdpIcon from '../../../public/icons/gdp.svg'
import SpaceIcon from '../../../public/icons/solar-system.svg'
import AstronautIcon from '../../../public/icons/astronaut.svg'
import BitcoinIcon from '../../../public/icons/crypto.svg'
import { PRE_CONTENT_ICON_SIZE } from "../../../app/constants"
import { CirclePacking } from "@nivo/circle-packing"
import CirclePackingChart from "../CirclePackingChart"

export const CryptoStats = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    //https://www.investopedia.com/articles/forex/041515/countries-where-bitcoin-legal-illegal.asp
    const legal = 2
    const regulated = 9
    const banned = 9

    const StatLine = ({ stat, text, color }: { stat: string | number, text: string, color: string }) => (
        <p className={`flex flex-row gap-1 md:text-lg md:tracking-widest ${color}`}><span >{stat}</span>{text}</p>
    )
    const Content = () => (
        <div style={{ width, height }} className='flex flex-col h-full w-full font-equinox lowercase place-items-center justify-evenly'>
            <span className="absolute top-0 right-0 text-white">2022</span>
            <span className="absolute top-0 left-0">Crypto</span>
            <BitcoinIcon className={PRE_CONTENT_ICON_SIZE + ' fill-green-yellow-500'} />
            <div>
                <StatLine color='text-green-400' stat={legal} text={'Legal Tender'} />
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
    return <StatCard
        icon={<GdpIcon className={PRE_CONTENT_ICON_SIZE + ' fill-green-400'} />}
        metric="gdp growth"
        year="2018 to 2021"
        text={'Avg GDP Growth in 2021'}
        stat={<p className='flex flex-row items-center gap-1'>{worldGdpAvg_2021.toFixed(1) + ' %'}
            <CustomTooltip placement="bottom"
                text={
                    <p>Funding is a critical resource for exploring the unknown. Exploratory research and development will be more achievable for countries with growing GDPs. Surplus funds can be reallocated to new initiatives.
                    </p>}
            />
        </p>}
        delta={worldGdpAvg_2021 - worldGdpAvg_2018}
        dimensions={dimensions} />
}

export const SpaceAgencies = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    //2018 https://www.civitas-stl.com/civ1819/Government-space-agencies.pdf 
    // 72 countries involved, 14 launch ability

    const SplitSpaceStats = () => {
        return <div style={{ width: width - 20, height }} className='font-equinox w-full h-full flex flex-col items-center justify-center'>
            {/*             <p className="text-center font-dreamscape text-xs md:text-base lg:text-lg">Across the Globe</p>*/}
            <span className='absolute top-0 right-0 text-white'>2018</span>
            <span className='absolute top-0 left-0'>Space</span>
            <SpaceIcon className={PRE_CONTENT_ICON_SIZE + ' fill-[#78cce2]'} />
            <div className="flex flex-row w-full text-white justify-evenly">
                <p className="flex flex-col items-center"><span className='text-lg lg:text-2xl'>72</span><span className='text-xs md:text-sm lg:text-base text-center text-[#78cce2]'>Space Agencies</span></p>
                <div className="border-l-2 border-neutral-300 mt-2 -mb-1 lg:mb-2 mx-2" />
                <p className="flex flex-col items-center"><span className='text-lg lg:text-2xl'>14</span><span className='text-xs md:text-sm lg:text-base text-center text-[#78cce2]'>Launch Ability</span></p>
            </div>
            {/*             <p className='mt-3 text-cyan-100 text-center text-sm'>Worldwide as of 2018</p>
 */}        </div>

    }

    return <StatCardCustom content={<SplitSpaceStats />} dimensions={{ width, height }} />
}

export const AstronautsAndSatellites = ({ dimensions }: { dimensions: ChartDimensions }) => {
    //https://www.civitas-stl.com/civ1819/Government-space-agencies.pdf (2018)
    //31 astronauts
    return <StatCard
        icon={<AstronautIcon className={PRE_CONTENT_ICON_SIZE + ' fill-stone-400'} />}
        metric="Exploration"
        stat={'31'}
        year='2018'
        text={'Nations w/ Astronauts'}
        dimensions={dimensions} />
}

export const GII = ({ dimensions: { width, height } }: { dimensions: ChartDimensions }) => {
    const data = retrieveData({ metrics: ['gii'], aggregator: 'multiRegions' }, 'hierarchical') as HierarchicalData

    return <>TODO</>
}