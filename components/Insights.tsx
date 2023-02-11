'use client';
import React, { useState, useEffect, useRef, useContext, createContext, useLayoutEffect } from 'react'
import { FrameCorners, FrameHexagon } from '@arwes/core';
import { ParentSize } from '@visx/responsive';
import { StatBoxes } from '../components/StatBoxes';
import { HexagonFrame as RegionalInfo } from '../components/RegionalStats';
import { useDesktop } from '../app/hooks/hooks';
import Map from './Map'

// assets
import Economy from '../public/icons/global-economy.svg'
import SustainableWorld from '../public/icons/global-sustainability.svg'
import Health from '../public/icons/global-health.svg'
import Education from '../public/icons/global-education.svg'
import Exploring from '../public/icons/global-connectivity.svg'
import Development from '../public/icons/009-overpopulation.svg'
import { ButtonGroup } from '../components/Shared';
import SummitLogo from '../public/WGS-summit-logo.svg'
import { DEFAULT_THEME_PROMPT, SummitThemeContext } from '../app/constants';
import { renderChartBasedOnTheme } from './ChartII';

const bag2 = 'https://api.mapbox.com/styles/v1/jdilldev/clcmbx409004c14qrslh0z9la/static/[-94.0749,-64.3648,117.0407,75.2404]/1150x1100?access_token=pk.eyJ1IjoiamRpbGxkZXYiLCJhIjoiY2xjbHR0MXNtOXE3ZTN2cGx1YWwxYmE4cyJ9.UKQMbbf2Q4revc3Nz9ws3g'

const worldSummitThemes: { name: string, icon: any }[] = [
    { name: 'Accelerating Development and Governance', icon: Development },
    { name: 'Global City Design and Sustainability', icon: SustainableWorld },
    { name: 'Exploring the Frontiers', icon: Exploring },
    { name: 'Governing Economic Resilience and Connectivity', icon: Economy },
    { name: 'Future of Societies and Healthcare', icon: Health },
    { name: 'Prioritizing Learning and Work', icon: Education }
]



const Insights = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const chartContainer = useRef<HTMLDivElement | null>(null);

    //const map = useRef<Map | null>(null);
    const [shouldRender, setShouldRender] = useState(false)
    const [isDesktop, setDesktop] = useState(false)
    const [mapHeight, setMapHeight] = useState(0)
    const [chart2height, setchartheight] = useState(0)
    const [mapProjection, setMapProjection] = useState<'mercator' | 'globe'>('mercator')
    const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEME_PROMPT)

    const isThemeSelected = selectedTheme !== DEFAULT_THEME_PROMPT

    useEffect(() => {
        if (mapContainer.current) {
            setMapHeight(mapContainer.current.clientHeight)
        }

        if (chartContainer.current) {
            setchartheight(chartContainer.current.clientHeight)
        }
    });

    useEffect(() => {
        const checkIsDesktop = () => {
            setDesktop(window.innerWidth >= 1240)
        }

        checkIsDesktop()
        setShouldRender(true)
        window.addEventListener("resize", checkIsDesktop);
        return () => window.removeEventListener("resize", checkIsDesktop);
    }, [])

    const ThemeSelectorSection = () => {
        return !isDesktop ?
            <>
                <p className='whitespace-nowrap tracking-[.2em] md:tracking-[.7em] text-slate-300 text-base md:text-xl uppercase font-equinox'>{`The Present Future | 2023`}</p>
                <div className='tracking-[.5em] xs:text-sm text-xl white uppercase font-dreamscape text-[#72a4b5]'>
                    <p className={`${isThemeSelected ? 'tracking-normal xs:text-xs text-sm md:text-lg md:tracking-widest md:lowercase font-body md:font-agelast text-center' : ''}`}>{selectedTheme}
                        {!isThemeSelected && <span className='text-sm normal-case font-thin tracking-normal font-body'>{'(Click to select)'}</span>}
                    </p>
                </div>
                <div className='flex pb-1 md:pb-2 no-wrap justify-evenly w-full gap-4'>
                    {worldSummitThemes.map(worldSummitTheme => <worldSummitTheme.icon
                        onClick={() => setSelectedTheme(worldSummitTheme.name)}
                        className={`w-[50px] h-[55px]  stroke-2 fill-slate-400 hover:fill-[#3297b3a8] ${worldSummitTheme.name === selectedTheme ? 'fill-[#3297b3a8]' : ''}`} />
                    )}
                </div>
            </> : <> <p className='tracking-[.7em] text-slate-300 text-2xl uppercase font-equinox'>{`The Present Future | 2023`}</p>
                <div className='tracking-[.5em] text-xl white uppercase font-dreamscape text-[#72a4b5]'>
                    <p className={`tracking-normal text-2xl font-dreamscape text-center' : ''}`}>{'Themes'}
                        {!isThemeSelected && <span className='text-sm normal-case font-thin tracking-normal font-body'>{' (Click to select)'}</span>}
                    </p>
                </div>
                <div className='flex flex-wrap w-full gap-x-16 gap-y-4 justify-center items-center'>
                    {worldSummitThemes.map(worldSummitTheme => <div className='h-8'>
                        <div className={`w-fit ${worldSummitTheme.name === selectedTheme ? 'box text-[#3297b3a8]' : 'text-slate-500'}`}
                            onClick={() => setSelectedTheme(worldSummitTheme.name)}>
                            <p className={`text-md lowercase whitespace-nowrap font-equinox hover:text-[#3297b3a8] ${worldSummitTheme.name === selectedTheme ? 'uppercase tracking-widest ' : ''}`}>{worldSummitTheme.name}</p>
                        </div>
                    </div>
                    )}
                </div>
            </>
    }

    return (
        <SummitThemeContext.Provider value={selectedTheme}>
            {shouldRender ? !isDesktop ? <div className='insights-layout'>
                <div className='theme-selector w-[88%] md:w-[83%]'>
                    {<ThemeSelectorSection />}
                </div>
                <div className='stat-boxes'><StatBoxes /></div>
                <div className='regional-selector-and-chart'>
                    <div className='w-1/3 md:w-1/4'>
                        <RegionalInfo isThemeSelected={isThemeSelected} />
                    </div>
                    <div className='w-2/3 md:w-3/4'>
                        <ParentSize debounceTime={10}>{({ width, height }) =>
                            renderChartBasedOnTheme(selectedTheme, { width, height })
                        }</ParentSize>
                    </div>
                </div>
                <div className='main map'><Map /></div>
            </div> :
                <div className='insights-layout-lg'>
                    <div className='theme-selector-lg'>
                        {<ThemeSelectorSection />}
                    </div>
                    <div className="left">
                        <div className='h-1/5'>
                            <RegionalInfo isThemeSelected={isThemeSelected} />
                        </div>
                        <div className='h-4/5'>
                            <ParentSize debounceTime={10}>{({ width, height }) =>
                                renderChartBasedOnTheme(selectedTheme, { width, height })
                            }</ParentSize>
                        </div>

                    </div>
                    <div className='main-lg'>
                        <div className='h-1/3'><StatBoxes /></div>
                        <div className='map h-2/3'>Map</div>
                    </div>
                </div> : <p>loading</p>}
        </SummitThemeContext.Provider >
    )
}

export default Insights
