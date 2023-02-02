import { FrameHexagon } from '@arwes/core';
import Continents from '../public/icons/continents.svg'
import { Dropdown } from "@nextui-org/react";
import { M49_subregions } from '../app/data/types';

export const HexagonFrame = ({ isThemeSelected }: { isThemeSelected: boolean }) => {
    return <div className='w-1/3 h-full lg:mt-3 lg:w-full lg:h-1/4'>
        <FrameHexagon hover palette='secondary' squareSize={60} lineWidth={3} animator={{ animate: false }} className='h-full w-full'>
            <div className='flex gap-4 flex-col justify-center items-center p-12 lg:p-4'>
                <Continents className='w-14 h-14 fill-[#4e7988]' />
                {!isThemeSelected ? <p className='text-sm md:text-lg font-equinox text-center '>Some chart information is provided at the reegional level</p>
                    : <>
                        <p className='md:text-sm font-equinox text-center'>Consider how differently these metrics would be at the regional level</p>
                    </>
                }
            </div>
        </FrameHexagon>
    </div>
}