'use client';

import { ReactNode, useState } from "react";
import Insights from "../components/Insights";
import { LIGHT_COLOR } from "./constants";

const Tabs = ({ tabs, children }: { tabs: string[], children: ReactNode }) => {

  return
}
const Home = () => {
  const baseClassName = 'basis-1/2 text-center border-b-2 md:border-b-0 hover:opacity-100 '
  const inactiveClassName = `${baseClassName} text-slate-400 border-slate-400 border-slate-400`
  const activeClassName = `${baseClassName} light-font-color md:border-2 light-border-color md:border-b-0 rounded-t-md`
  const tabs = ['Insights', 'Explore']

  const [active, setActive] = useState(tabs[0])
  return <div className='flex flex-col h-full'>
    <div className={`flex flex-row`}>
      {tabs.map(tab => <h1
        className={active === tab ? activeClassName : inactiveClassName}
        onClick={() => { setActive(tab) }}>
        {tab}
      </h1>)}
    </div>
    <div className='h-full overflow-scroll light-border-color md:border-2'>
      {active === 'Insights' ? <Insights /> : <p>hi</p>}
    </div>
  </div>
}

export default Home