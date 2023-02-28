'use client';

import { useState, useEffect, useCallback, useContext } from "react";
import Insights from "../components/Insights";
import Map from "../components/Map";
import ThemeSelector from "../components/ThemeSelector";
import { DEFAULT_THEME_PROMPT, SummitThemeContext } from "./constants";


const Home = () => {
  /* The commented out lines are only if we want to enable a tabbed view-- indefinitely on pause
    const baseClassName = 'basis-1/2 text-center border-b-2 hover:opacity-100 md:border-b-0'
    const inactiveClassName = `${baseClassName} text-slate-300 border-slate-300`
    const activeClassName = `${baseClassName} default-font-color md:border-2 border-[#9fd0dcb1;] rounded-t-md`
    const tabs = ['Global Insights', 'Explore']
    const [active, setActive] = useState(tabs[0]) */

  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEME_PROMPT)

  return <SummitThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
    <div className="dashboard">
      <div className="flex p-2 font-agelast justify-start items-center dashboard-header bg-red border-solid border-b-[1px] border-[#ffffff2b]">
        <p>The Present Future Dashboard</p>
      </div>
      <div className="dashboard-left flex flex-col">
        <div className="dashboard-card h-1/2">
          hola mami
        </div>
        <div className="dashboard-card h-1/2">
          hola mami
        </div>
      </div>
      <div className="dashboard-main flex flex-col">
        <Map />
        <div className="flex justify-center gap-y-4 items-center w-full p-4 flex-wrap">
          <div className="bottom-item bg-orange-300">hi</div>
          <div className="bottom-item flex w-1/2 bg-orange-400">hi</div>
          <div className="bottom-item flex w-1/2 bg-orange-500">hi</div>
          <div className="bottom-item flex w-1/2 bg-orange-600">hi</div>
        </div>
      </div>
      <div className="dashboard-right flex flex-col">
        <div className="dashboard-card h-1/3">
          hola mami
        </div>
        <div className="dashboard-card h-1/3">
          hola mami
        </div>
        <div className="dashboard-card h-1/3">
          hola mami
        </div>
      </div>
    </div>
  </SummitThemeContext.Provider>
}

export default Home