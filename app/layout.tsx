import Map from "../components/Map";
import Table from "../components/Table";
import { CircularThemeSelector, ThemeSelector } from "../components/ThemeSelector";
import ChartIcon from '../public/icons/bar-chart.svg'
import MetricIcon from '../public/icons/hexagons.svg'
import BulbIcon from '../public/icons/026-learning.svg'
import './globals.css'
import { CHART_CATEGORY, METRIC_CATEGORY, CONTEXT_CATEGORY } from "./constants/constants";
import AggregatorSelect from "../components/AggregatorSelect";


const RootLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {


  return (
    <html lang="en">
      <head />
      <body className={`h-screen w-screen overflow-hidden bg-slate-900 text-[#9fd0dccc] font-body subpixel-antialiased`}>
        <div className="dashboard overflow-hidden">
          <div className="flex p-2 text-xs md:text-lg lg:text-xl font-agelast justify-start items-center dashboard-header bg-red border-solid border-b-[1px] border-[#ffffff2b]">
            <p>The Present Future Dashboard</p>
          </div>
          <div className='md:hidden'>
            <AggregatorSelect />
          </div>
          <div className="dashboard-left flex flex-col ml-2">
            <div className="md:bg-transparent md:border-none w-full dashboard-card h-1/2 mb-3">
              <ThemeSelector />
              <CircularThemeSelector />
            </div>
            <div className="dashboard-card h-1/2 w-full md:hidden">
              <div className='flex flex-col justify-around h-full md:hidden'>
                {[
                  { title: CHART_CATEGORY, icon: <ChartIcon /> },
                  { title: METRIC_CATEGORY, icon: <MetricIcon /> },
                  { title: CONTEXT_CATEGORY, icon: <BulbIcon /> }
                ].map(category => <div key={category.title} className="flex flex-col items-center gap-2 text-sm p-2 tracking-widest fill-[#9fd0dccc] hover:text-[#56d3dc] hover:fill-[#56d3dc]">
                  <p className='text-xs'>{category.title}</p>
                  <div className='w-8 '>{category.icon}
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
          <div className="dashboard-main flex flex-col">
            <Map />
            {children}

          </div>
        </div>
      </body>
    </html>
  )
}

export default RootLayout;
