'use client';

import { useState, useEffect, useCallback, useContext, useRef } from "react";
import { AstronautsAndSatellites } from "../components/Charts/Themes/ExploringtheFrontier";
import { UnemploymentBins } from "../components/Charts/Themes/PrioritizingLearningAndWork";
import Map from "../components/Map";
import ThemeSelector from "../components/ThemeSelector";
import { DEFAULT_THEME_PROMPT, SummitThemeContext, WORLD_SUMMIT_THEMES } from "./constants";




const Home = () => {
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEME_PROMPT)
  const [aggregator, setAggregator] = useState('global')
  const themeRef = useRef<HTMLDivElement>(null)
  const [themeContainerWidth, setThemeContainerWidth] = useState(0)
  const [themeContainerHeight, setThemeContainerHeight] = useState(0)

  const r = themeContainerWidth > 420 ? themeContainerWidth / 3.2 : themeContainerWidth / 2.7
  useEffect(() => {
    const updateThemeContainer = () => {
      if (themeRef.current)
        setThemeContainerWidth(themeRef.current.clientWidth)
      setThemeContainerHeight(themeRef.current.clientHeight)
    }
    updateThemeContainer()
    window.addEventListener("resize", updateThemeContainer);

    return () => window.removeEventListener("resize", updateThemeContainer);
  }, [])

  return <SummitThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
    <div className="dashboard">
      <div className="mb-3 flex p-2 text-xs md:text-lg lg:text-xl font-agelast justify-start items-center dashboard-header bg-red border-solid border-b-[1px] border-[#ffffff2b]">
        <p>The Present Future Dashboard</p>
      </div>
      <div className="dashboard-left flex flex-col ml-3">
        <div ref={themeRef} className="dashboard-card h-1/2">
          <p className="font-agelast tracking-widest">Themes</p>
          <div className="theme-container md:relative">
            <div className='theme-text-center'>
              <p
                className="font-equinox text-sm lg:text-base lowercase text-center w-2/3"
              >{selectedTheme}</p>
            </div>
            {WORLD_SUMMIT_THEMES.map((theme, index) => {
              //http://jsfiddle.net/55ukqboa/1/
              //https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
              //theta is (360/n)/180 where n is the number of items that need to be in the circle
              const theta = ((360 / WORLD_SUMMIT_THEMES.length) / 180) * index * Math.PI
              const x = Math.round(r * (Math.cos(theta)))
              const y = Math.round(r * (Math.sin(theta)))
              const top = (themeContainerHeight * .45) - y
              const left = ((themeContainerWidth - 60) / 2) + x
              return <>
                <div className={`hidden md:inline absolute hover:scale-125 `} style={{ top, left }}>
                  <theme.icon
                    onClick={() => setSelectedTheme(theme.name)}
                    className={`w-10 h-10 lg:w-12 lg:h-12  stroke-2  hover:fill-[#56d3dcc8] ${theme.name === selectedTheme ? 'fill-[#56d3dcc8]' : 'fill-slate-300'}`} />
                </div>
                <div className="md:hidden">
                  <theme.icon
                    onClick={() => setSelectedTheme(theme.name)}
                    className={`w-10 h-10 lg:w-12 lg:h-12  stroke-2  hover:fill-[#56d3dcc8] ${theme.name === selectedTheme ? 'fill-[#56d3dcc8]' : 'fill-slate-300'}`} />
                </div>
              </>
            })}
          </div>
        </div>
        <div className="dashboard-card h-1/2">
          {/*           <UnemploymentBins dimensions={{ width: 300, height: 400 }} />
 */}        </div>
      </div>
      <div className="dashboard-main flex flex-col">
        <Map />
        <div className="flex justify-center gap-y-4 items-center w-full p-4 flex-wrap">
          <div className="bottom-item">hi</div>
          <div className="bottom-item ">hi</div>
          <div className="bottom-item">hi</div>
          <div className="bottom-item">hi</div>
        </div>
      </div>
      <div className="dashboard-right flex flex-col mr-3">
        <div className="dashboard-card h-2/3 flex flex-col">
          <p className="font-agelast tracking-widest">Ranking</p>
          <div className="flex flex-col gap-1 justify-between h-full font-equinox text-sm">
            <div className=''>
              <p>{aggregator}</p>
              <p className='text-center font-body font-light'>Metric</p>
            </div>
            <div className='flex flex-row gap-3 justify-center items-center'>
              {['global', 'regions', 'specific region'].map(option =>
                <div
                  className={`rounded-full w-2 h-2 hover:bg-teal-500  ${aggregator === option ? 'bg-white' : 'bg-[#26bbdd59]'}`}
                  onClick={() => setAggregator(option)}
                />)}
            </div>
          </div>
        </div>
        <div className="dashboard-card h-1/3">
          <p className="font-agelast tracking-widest">Insight</p>
        </div>
      </div>
    </div>
  </SummitThemeContext.Provider>
}

export default Home