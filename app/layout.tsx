import Map from "../components/Map";
import Table from "../components/Table";
import { CircularThemeSelector, ThemeSelector } from "../components/ThemeSelector";
import ChartIcon from '../public/icons/solar-system.svg'
import MetricIcon from '../public/icons/hexagons.svg'
import BulbIcon from '../public/icons/026-learning.svg'
import './globals.css'
import { CHART_CATEGORY, METRIC_CATEGORY, CONTEXT_CATEGORY } from "./constants/constants";


const RootLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {


  return (
    <html lang="en">
      <head />
      <body className={`h-screen w-screen overflow-hidden bg-slate-900 text-[#9fd0dccc] font-body subpixel-antialiased`}>
        <div className="dashboard">
          <div className="mb-3 flex p-2 text-xs md:text-lg lg:text-xl font-agelast justify-start items-center dashboard-header bg-red border-solid border-b-[1px] border-[#ffffff2b]">
            <p>The Present Future Dashboard</p>
          </div>
          <div className="dashboard-left flex flex-col ml-3 mb-4">
            <div className="md:bg-transparent md:border-none w-full dashboard-card h-1/2 mb-3">
              <ThemeSelector />
              <CircularThemeSelector />
            </div>
            <div className="dashboard-card h-1/2 w-full">
              <div className='flex flex-col justify-around h-full md:hidden'>
                {[
                  { title: CHART_CATEGORY, icon: <ChartIcon /> },
                  { title: METRIC_CATEGORY, icon: <MetricIcon /> },
                  { title: CONTEXT_CATEGORY, icon: <BulbIcon /> }
                ].map(category => <div key={category.title} className="flex flex-col items-center gap-2 text-sm p-2 tracking-[.15em] fill-[#9fd0dccc] hover:text-[#56d3dc] hover:fill-[#56d3dc]">
                  <p>{category.title}</p>
                  <div className='w-12 '>{category.icon}
                  </div>
                </div>
                )}
              </div>
              <div className='hidden md:flex md:h-full w:h-full opacity-80'>
                <p>{CHART_CATEGORY}</p>
              </div>
            </div>
          </div>
          <div className="dashboard-main flex flex-col">
            <Map />
          </div>
          <div className="dashboard-right flex flex-col mr-3 h-full">
            <div className="hidden md:inline dashboard-card h-2/3 mb-3">
              <p className="font-agelast tracking-widest">Rank</p>
              <div className="flex flex-row flex-wrap justify-between items-center text-xs">
                <Table data={[]} />
              </div>
            </div>
            <div className="dashboard-card hidden md:inline md:h-1/3 mb-4">
              <p className="font-agelast tracking-widest">{CONTEXT_CATEGORY}</p>
              <p className="font-body text-sm font-thin">TODO</p>
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}

export default RootLayout;
