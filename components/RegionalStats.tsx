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
            <div className='flex gap-4 xs:gap-1 flex-col justify-center items-center xs:p-2 xs:pt-8 p-12 lg:p-4'>
                <Continents className='w-14 h-14 fill-[#4e7988]' />
                {!isThemeSelected ? <p className='xs:text-xs text-sm md:text-lg font-equinox text-center '>Some chart information is provided at the regional level</p>
                    : <>
                        {<p className='hidden md:inline md:text-sm text-center'>Select "All Regions" to view updated data for all regions in the world.<br />Or, select a specific region to view data for all of the countries in that region. </p>}
                        <Dropdown placement='bottom'>
                            <Dropdown.Button
                                flat
                                className='text-cyan-100 font-equinox underline underline-offset-4 '
                            >regions</Dropdown.Button>
                            <Dropdown.Menu
                                className='p-1'
                                selectionMode="single"
                                aria-label="Regions Actions">
                                {allRegions.map((region, index) =>
                                    <Dropdown.Item
                                        withDivider={region === 'Northern Africa' || region === 'Northern America' || region === 'Central Asia' || region === 'Eastern Europe' || region === 'Australia and New Zealand'}
                                        className='text-sm hover:bg-[#4e788852] p-1'
                                        key={region}>{region}</Dropdown.Item>
                                )}


                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                }
            </div>
        </FrameHexagon>
    </div>
}