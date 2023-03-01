'use client';

import { useState, useEffect, useCallback, useContext } from "react";
import { AstronautsAndSatellites } from "../components/Charts/Themes/ExploringtheFrontier";
import { UnemploymentBins } from "../components/Charts/Themes/PrioritizingLearningAndWork";
import Map from "../components/Map";
import ThemeSelector from "../components/ThemeSelector";
import { DEFAULT_THEME_PROMPT, SummitThemeContext, WORLD_SUMMIT_THEMES } from "./constants";




const Home = () => {
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEME_PROMPT)
  const [aggregator, setAggregator] = useState('global')
  return <SummitThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
    <div className="dashboard">
      <div className="mb-3 flex p-2 text-xs md:text-lg lg:text-xl font-agelast justify-start items-center dashboard-header bg-red border-solid border-b-[1px] border-[#ffffff2b]">
        <p>The Present Future Dashboard</p>
      </div>
      <div className="dashboard-left flex flex-col ml-3">
        <div className="dashboard-card h-1/2 flex flex-col">
          <p className="font-agelast tracking-widest">Themes</p>
          <div className="main">
            {WORLD_SUMMIT_THEMES.map((theme, index) => {
              //http://jsfiddle.net/55ukqboa/1/
              //https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
              const theta = (60 / 180) * index * Math.PI
              const rx = 120
              const ry = 120
              const x = Math.round(rx * (Math.cos(theta)))
              const y = Math.round(ry * (Math.sin(theta)))
              const top = (350 / 2) - y
              const left = (260 / 2) + x
              return <div className='circle absolute hover:scale-125' style={{ top, left }}>
                <theme.icon
                  onClick={() => setSelectedTheme(theme.name)}
                  className={`w-12 h-12  stroke-2  hover:fill-[#56d3dcc8] ${theme.name === selectedTheme ? 'fill-[#56d3dcc8]' : 'fill-slate-300'}`} />
              </div>
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