import Map from "../components/Map";
import Table from "../components/Table";
import { ThemeSelector } from "../components/ThemeSelector";
import { AGGREGATOR_TO_TITLE, CHART_CATEGORY, CONTEXT_CATEGORY, DEFAULT_REGION, DEFAULT_THEME_PROMPT, METRIC_CATEGORY, WORLD_SUMMIT_THEMES } from "./constants/constants";
import { AggregatorType, CountryMetrics, M49_subregion } from "./data/types";
import { getAvg, getMetric, getMinMax, } from "./api/routes";
import { ChartTooltip } from "../components/Shared";
import ChartIcon from '../public/icons/solar-system.svg'
import MetricIcon from '../public/icons/hexagons.svg'
import BulbIcon from '../public/icons/026-learning.svg'
import CountryAndRegionalComparissons from "../components/CountryAndRegionalComparissons";
import DeltaIndicator from "../components/DeltaIndicator";
//import BulbIcon from '../public/icons/028-puzzle.svg'


const Home = async () => {
  const deltaData = await getAvg({ metric: 'CO2e_emissions_per_capita', grouping: 'world' })
  const minMax = await getMinMax({ metric: 'HDI', grouping: 'world' })

  return <div className="dashboard">
    <DeltaIndicator data={deltaData} />
    <div className="mb-3 flex p-2 text-xs md:text-lg lg:text-xl font-agelast justify-start items-center dashboard-header bg-red border-solid border-b-[1px] border-[#ffffff2b]">
      <p>The Present Future Dashboard</p>
    </div>
    <div className="dashboard-left flex flex-col ml-3 mb-4">
      <div className="md:bg-transparent md:border-none w-full dashboard-card h-1/2 mb-3">
        <ThemeSelector />
      </div>
      <div className="dashboard-card h-1/2 w-full">
        <div className='flex flex-col justify-around h-full md:hidden'>
          {[
            { title: CHART_CATEGORY, icon: <ChartIcon /> },
            { title: METRIC_CATEGORY, icon: <MetricIcon /> },
            { title: CONTEXT_CATEGORY, icon: <BulbIcon /> }
          ].map(category => <div className="flex flex-col items-center gap-2 text-sm p-2 tracking-[.15em] fill-[#9fd0dccc] hover:text-[#56d3dc] hover:fill-[#56d3dc]">
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
      <CountryAndRegionalComparissons data={minMax} />
    </div>
    <div className="dashboard-right flex flex-col mr-3 h-full">
      <div className="hidden md:inline dashboard-card h-2/3 mb-3">
        <p className="font-agelast tracking-widest">Rank</p>
        <div className="flex flex-row flex-wrap justify-between items-center text-xs">
          <Table data={[]} aggregator={"world"} />
        </div>
      </div>
      <div className="dashboard-card hidden md:inline md:h-1/3 mb-4">
        <p className="font-agelast tracking-widest">{CONTEXT_CATEGORY}</p>
        <p className="font-body text-sm font-thin">TODO</p>
      </div>
    </div>
  </div>

}

export default Home