import { FrameHexagon } from '@arwes/core';
import Continents from '../public/icons/continents.svg'

export const HexagonFrame = () => {
    return <div className='w-1/3 h-full lg:w-full lg:h-1/4'>
        <FrameHexagon hover palette='secondary' squareSize={60} lineWidth={3} animator={{ animate: false }} className='h-full w-full'>
            <div className='flex gap-4 flex-col justify-center items-center p-12 lg:p-4'>
                <Continents className='w-14 h-14 fill-[#4e7988]' />
                <p className='text-sm md:text-lg font-equinox text-center '>Select a subregion to view regionally specific data</p>
            </div>
        </FrameHexagon>
    </div>
}