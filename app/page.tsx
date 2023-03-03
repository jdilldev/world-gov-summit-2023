'use client';

import { useState, useEffect, useCallback, useContext, useRef, useMemo } from "react";
import { AstronautsAndSatellites } from "../components/Charts/Themes/ExploringtheFrontier";
import { UnemploymentBins } from "../components/Charts/Themes/PrioritizingLearningAndWork";
import Map from "../components/Map";
import Table from "../components/Table";
import ThemeSelector from "../components/ThemeSelector";
import { DEFAULT_REGION, DEFAULT_THEME_PROMPT, SummitThemeContext, WORLD_SUMMIT_THEMES } from "./constants";
import { getWorldAvg } from "./data/generateData";
import { AggregatorType, M49_subregion } from "./data/types";


const aggregatorToTitle = {
  'world': 'Global',
  'multiRegions': 'All Regions',
  'singleRegion': 'Region'
}

const Home = () => {
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEME_PROMPT)
  const [selectedRegion, setSelectedRegion] = useState<M49_subregion>(undefined)
  const [aggregator, setAggregator] = useState<AggregatorType>('world')

  useEffect(() => {
    console.log(selectedRegion)
    if (selectedRegion !== undefined)
      setAggregator('singleRegion')
    else
      setAggregator('world')
  }, [selectedRegion])

  return <SummitThemeContext.Provider value={{ selectedTheme, setSelectedTheme, selectedRegion, setSelectedRegion }}>
    <div className="dashboard">
      <div className="mb-3 flex p-2 text-xs md:text-lg lg:text-xl font-agelast justify-start items-center dashboard-header bg-red border-solid border-b-[1px] border-[#ffffff2b]">
        <p>The Present Future Dashboard</p>
      </div>
      <div className="dashboard-left flex flex-col ml-3 mb-4">
        <div className="md:bg-transparent md:border-none dashboard-card h-1/2 w-fit md:w-full">
          <p className="md:hidden font-agelast tracking-widest text-xs md:text-base">Themes</p>
          <div className="flex flex-col justify-evenly items-center h-full">
            {WORLD_SUMMIT_THEMES.map((theme, index) => {
              return <div className=''>
                <theme.icon
                  onClick={() => setSelectedTheme(theme.name)}
                  className={`w-fit h-8 stroke-2 md:hidden  hover:fill-[#56d3dcc8] ${theme.name === selectedTheme ? 'fill-[#56d3dcc8]' : 'fill-slate-300'}`} />
              </div>
            })}
          </div>
        </div>
        <div className="dashboard-card h-1/2 w-full">
          <div className='flex flex-col justify-around h-full md:hidden'>
            <p>Chart</p>
            <p>Metric</p>
            <p>Insight</p>
          </div>
          <div className='hidden md:flex md:h-full w:h-full opacity-80'>
            <UnemploymentBins />
          </div>
        </div>
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
      <div className="dashboard-right flex flex-col mr-3 h-full">
        <div className="hidden md:inline dashboard-card h-2/3">
          <p className="font-agelast tracking-widest">Rank</p>
          <p>{aggregatorToTitle[aggregator]}</p>
          <div className="flex flex-row justify-between items-center text-xs">
            <p className='font-body'>Metric</p>
            <p className='text-cyan-300'>World Avg: {getWorldAvg('2021_unemployment').toFixed(2)}</p>
          </div>
          <div className='flex flex-col h-[28rem] overflow-scroll'>
            <Table aggregator={aggregator} metric={"2021_unemployment"} selectedRegion={selectedRegion} />
          </div>
          <div className='flex flex-row gap-3 pt-2 justify-center items-center'>
            {(['world', 'multiRegions', 'singleRegion']).map(option =>
              <div
                className={`rounded-full w-2 h-2 hover:bg-teal-500  ${aggregator === option ? 'bg-white' : 'bg-[#26bbdd59]'}`}
                onClick={() => setAggregator(option as AggregatorType)}
              />)}
          </div>
        </div>
        <div className="dashboard-card hidden md:inline md:h-1/3">
          <p className="font-agelast tracking-widest">Insight</p>
        </div>
      </div>
    </div>
  </SummitThemeContext.Provider >
}

export default Home