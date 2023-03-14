import { useState, useEffect, useCallback, useContext, useRef, useMemo } from "react";
import { AstronautsAndSatellites } from "../components/Charts/Themes/ExploringtheFrontier";
import { UnemploymentBins } from "../components/Charts/Themes/PrioritizingLearningAndWork";
import Map from "../components/Map";
import Table from "../components/Table";
import ThemeSelector from "../components/ThemeSelector";
import { AGGREGATOR_TO_TITLE, DEFAULT_REGION, DEFAULT_THEME_PROMPT, SummitThemeContext, WORLD_SUMMIT_THEMES } from "./constants";
import { AggregatorType, CountryMetrics, M49_subregion } from "./data/types";
import { getWorldAvg, getMetric, getMinAndMaxCountries, } from "./api/routes";



const Home = async () => {
  const t = await getMinAndMaxCountries('electricity_from_renewables')

  console.log(t)
  return <div className="dashboard">
    <div className="mb-3 flex p-2 text-xs md:text-lg lg:text-xl font-agelast justify-start items-center dashboard-header bg-red border-solid border-b-[1px] border-[#ffffff2b]">
      <p>The Present Future Dashboard</p>
    </div>
    <div className="dashboard-left flex flex-col ml-3 mb-4">
      <div className="md:bg-transparent md:border-none dashboard-card h-1/2 w-fit md:w-full">
        <p className="md:hidden font-agelast tracking-widest text-xs md:text-base">Themes</p>

      </div>
      <div className="dashboard-card h-1/2 w-full">
        <div className='flex flex-col justify-around h-full md:hidden'>
          <p>Chart</p>
          <p>Metric</p>
          <p>Insight</p>
        </div>
        <div className='hidden md:flex md:h-full w:h-full opacity-80'>
        </div>
      </div>
    </div>
    <div className="dashboard-main flex flex-col">
      <Map />
      <div className="flex justify-center gap-y-4 items-center w-full p-4 flex-wrap">
        <div className="bottom-item">Max Country</div>
        <div className="bottom-item ">Min Country</div>
        <div className="bottom-item">Max Region</div>
        <div className="bottom-item">Min Region</div>
      </div>
    </div>
    <div className="dashboard-right flex flex-col mr-3 h-full">
      <div className="hidden md:inline dashboard-card h-2/3">
        <p className="font-agelast tracking-widest">Rank</p>

        <div className="flex flex-row flex-wrap justify-between items-center text-xs">

        </div>


      </div>
      <div className="dashboard-card hidden md:inline md:h-1/3">
        <p className="font-agelast tracking-widest">Insight</p>
      </div>
    </div>
  </div>

}

export default Home