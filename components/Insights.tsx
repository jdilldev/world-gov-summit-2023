'use client';
import React, { useState, useEffect, useMemo, useCallback, useContext, } from 'react'
import { ParentSize } from '@visx/responsive';
import { StatBoxes } from '../components/StatBoxes';
import { HexagonFrame as RegionalInfo } from '../components/RegionalStats';


import { DEFAULT_THEME_PROMPT, SummitThemeContext } from '../app/constants';
import { renderChartBasedOnTheme } from './ChartII';
import Map from './Map';
import { useWindowSize } from '../app/hooks/hooks';
import ThemeSelector from './ThemeSelector';


const Insights = () => {
    const isDesktop = useWindowSize() === 'DESKTOP'
    const [shouldRender, setShouldRender] = useState(false)
    const { selectedTheme } = useContext(SummitThemeContext)
    const isThemeSelected = selectedTheme === DEFAULT_THEME_PROMPT


    useEffect(() => {
        setShouldRender(true)
    }, [])

    return !shouldRender ? <p>loading</p> :
        !isDesktop ? <div className='insights-layout'>
            <div className='theme-selector w-[88%] md:w-[83%]'>
                <ThemeSelector />
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
                    <ThemeSelector />
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
                    <div className='map h-2/3'><Map /></div>
                </div>
            </div>

}

export default Insights
