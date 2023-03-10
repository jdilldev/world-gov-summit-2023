import { FrameHexagon } from '@arwes/core';
import Continents from '../public/icons/continents.svg'
import { M49_subregions } from '../app/data/types';
import { Dropdown } from "@nextui-org/react";

const allRegions = ['All Regions', ...M49_subregions]
export const HexagonFrame = ({ isThemeSelected }: { isThemeSelected: boolean }) => {
    return <div className='lg:w-full h-full'>
        {/* 
        // @ts-ignore */}
        <FrameHexagon hover palette='secondary' squareSize={60} lineWidth={3} animator={{ animate: false }} className='h-full w-full'>
            <div className='flex xs:gap-1 flex-col justify-center items-center xs:p-2'>
                <Continents className='mt-8  md:mt-0 w-14 h-14 fill-[#4e7988]' />
                {!isThemeSelected ? <p>You can view information in a regional lens</p>
                    :
                    <Dropdown placement='bottom'>
                        <Dropdown.Button
                            light
                            placeholder='Select Region'
                            css={{ color: '#78cde2b1', fontFamily: 'equinox', textTransform: 'lowercase' }}
                        >{'Region'}</Dropdown.Button>
                        <Dropdown.Menu
                            className='p-1'
                            selectionMode="single"
                            aria-label="Regions Actions">
                            {allRegions.map((region) =>
                                <Dropdown.Item
                                    withDivider={region === 'Northern Africa' || region === 'Northern America' || region === 'Central Asia' || region === 'Eastern Europe' || region === 'Australia and New Zealand'}
                                    className='text-sm hover:bg-[#4e788852] p-1'
                                    key={region}>{region}</Dropdown.Item>
                            )}


                        </Dropdown.Menu>
                    </Dropdown>
                }
            </div>
        </FrameHexagon>
    </div>
}