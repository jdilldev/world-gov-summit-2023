'use client';

import { ReactNode, useState } from "react";
import Explore from "../components/Explore";
import Insights from "../components/Insights";

const Tabs = ({ tabs, children }: { tabs: string[], children: ReactNode }) => {

  return
}
const Home = () => {
  const baseClassName = 'basis-1/2 text-center border-b-2 hover:opacity-100 md:border-b-0'
  const inactiveClassName = `${baseClassName} text-slate-300 border-slate-300`
  const activeClassName = `${baseClassName} default-font-color md:border-2 border-[#9fd0dcb1;] rounded-t-md`
  const tabs = ['Insights', 'Explore']

  const [active, setActive] = useState(tabs[0])
  return <div className='flex flex-col h-full '>
    <div className={`flex flex-row`}>
      {tabs.map(tab => <h1
        className={active === tab ? activeClassName : inactiveClassName}
        onClick={() => { setActive(tab) }}>
        {tab}
      </h1>)}
    </div>
    <div className='h-full overflow-scroll md:border-solid md:border-[#9fd0dcb1]  md:border-2'>
      {active === 'Insights' ? <Insights /> : <Explore />}
    </div>
  </div>
}

export default Home