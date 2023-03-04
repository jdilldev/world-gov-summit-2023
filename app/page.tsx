
import { useState, useEffect, useCallback, useContext, useRef, useMemo } from "react";
import { AstronautsAndSatellites } from "../components/Charts/Themes/ExploringtheFrontier";
import { UnemploymentBins } from "../components/Charts/Themes/PrioritizingLearningAndWork";
import Map from "../components/Map";
import Table from "../components/Table";
import ThemeSelector from "../components/ThemeSelector";
import { AGGREGATOR_TO_TITLE, DEFAULT_REGION, DEFAULT_THEME_PROMPT, SummitThemeContext, WORLD_SUMMIT_THEMES } from "./constants";
import { getWorldAvg } from "./data/generateData";
import { AggregatorType, CountryMetrics, M49_subregion } from "./data/types";
import { GET, GET_COMMENTS } from "./api/routes";


const yo = async () => {
  const r = await GET_COMMENTS()

  console.log(r)
}
const Home = () => {
  yo()

}

export default Home