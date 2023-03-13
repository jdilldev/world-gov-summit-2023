
import { useState, useEffect, useCallback, useContext, useRef, useMemo } from "react";
import { AstronautsAndSatellites } from "../components/Charts/Themes/ExploringtheFrontier";
import { UnemploymentBins } from "../components/Charts/Themes/PrioritizingLearningAndWork";
import Map from "../components/Map";
import Table from "../components/Table";
import ThemeSelector from "../components/ThemeSelector";
import { AGGREGATOR_TO_TITLE, DEFAULT_REGION, DEFAULT_THEME_PROMPT, SummitThemeContext, WORLD_SUMMIT_THEMES } from "./constants";
import { AggregatorType, CountryMetrics, M49_subregion } from "./data/types";
import { GET, get_metric } from "./api/routes";



const Home = async () => {
  const data = await get_metric({ metric: 'government_effectiveness', grouping: 'world' })
  console.log(data)

  return <div></div>

}

export default Home