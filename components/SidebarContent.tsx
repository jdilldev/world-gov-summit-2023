import { AggregatorType, CountryMetrics } from '../app/data/types'
import CloseButton from '../public/icons/bacteria.svg'

type SidebarContentType = {
    theme: string,
    metric: CountryMetrics,
    grouping: AggregatorType,
    data: any[]
}

const SidebarContent = ({ theme, metric, grouping, data }: SidebarContentType) => {
    return <div className='p-2 fixed left-32 bottom-40 flex flex-col rounded-md md:hidden min-h-[15rem] min-w-[13rem] bg-cyan-700'>
        <div className='flex flex-row w-full justify-between items-start'>
            <p className='font-agelast'>Chart</p>
            <CloseButton className='w-4 h-4 hover:opacity-50' />
        </div>
        <p>content</p>
    </div>
}

export default SidebarContent