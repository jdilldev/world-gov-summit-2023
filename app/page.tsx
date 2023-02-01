'use client'
import React, { useState, useEffect, useRef, useContext, createContext } from 'react'
import { Text, Container, Button } from '@nextui-org/react';
import { FrameCorners, FrameHexagon } from '@arwes/core';
import Map, { GeolocateControl } from "react-map-gl";
import { ParentSize } from '@visx/responsive';
import { StatBoxes } from '../components/StatBoxes';
import { HexagonFrame as RegionalInfo } from '../components/RegionalStats';
import { useDesktop } from './hooks/hooks';

// assets
import Economy from '../public/icons/global-economy.svg'
import SustainableWorld from '../public/icons/global-sustainability.svg'
import Health from '../public/icons/global-health.svg'
import Education from '../public/icons/global-education.svg'
import Exploring from '../public/icons/global-connectivity.svg'
import Development from '../public/icons/009-overpopulation.svg'
import { ButtonGroup } from '../components/Shared';
import { ChartI } from '../components/ChartI';
import { ChartII } from '../components/ChartII';
import { DEFAULT_THEME_PROMPT, SummitThemeContext } from './constants';

const bag2 = 'https://api.mapbox.com/styles/v1/jdilldev/clcmbx409004c14qrslh0z9la/static/[-94.0749,-64.3648,117.0407,75.2404]/1150x1100?access_token=pk.eyJ1IjoiamRpbGxkZXYiLCJhIjoiY2xjbHR0MXNtOXE3ZTN2cGx1YWwxYmE4cyJ9.UKQMbbf2Q4revc3Nz9ws3g'

const worldSummitThemes: { name: string, icon: any }[] = [
  { name: 'Accelerating Development and Governance', icon: Development },
  { name: 'Global City Design and Sustainability', icon: SustainableWorld },
  { name: 'Exploring the Frontiers', icon: Exploring },
  { name: 'Governing Economic Resilience and Connectivity', icon: Economy },
  { name: 'Future of Societies and Healthcare', icon: Health },
  { name: 'Prioritizing Learning and Work', icon: Education }
]


const Home = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const chartContainer = useRef<HTMLDivElement | null>(null);

  //const map = useRef<Map | null>(null);
  const isDesktop = useDesktop()
  const [mapHeight, setMapHeight] = useState(0)
  const [chart2height, setchartheight] = useState(0)
  const [mapProjection, setMapProjection] = useState<'mercator' | 'globe'>(isDesktop ? 'mercator' : 'globe')
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEME_PROMPT)

  const isThemeSelected = selectedTheme !== DEFAULT_THEME_PROMPT

  useEffect(() => {
    if (mapContainer.current) {
      setMapHeight(mapContainer.current.clientHeight)
    }

    if (chartContainer.current) {
      setchartheight(chartContainer.current.clientHeight)
    }
  });

  return (
    <SummitThemeContext.Provider value={selectedTheme}>
      <div className='h-[120vh] lg:h-screen lg:pb-4 flex flex-col w-full gap-3'>
        <div className='h-48 flex justify-center'>
          <div style={{ backgroundImage: `url(${'bag2'})` }} className='flex flex-col pt-2 px-1 border-solid border-l-4 border-r-4 border-b-4  border-[#0c354e] backdrop-blur-lg gap-3 fixed top-0 z-10 w-[87%] md:w-[90%] items-center lg:w-full lg:gap-1 lg:border-none'>
            <p className='tracking-[.3em] md:tracking-[.7em] text-slate-300 text-md md:text-2xl lg:text-3xl uppercase font-equinox'>{`The Present Future`}</p>
            <p className='tracking-[.5em] text-xl white uppercase font-dreamscape text-[#72a4b5]'>
              <p className={`${isThemeSelected ? 'tracking-normal text-sm md:tracking-widest md:text-xl font-body lg:font-dreamscape text-center' : ''}`}>{isDesktop ? 'Themes' : selectedTheme}
                {!isThemeSelected && <span className='text-sm normal-case font-thin tracking-normal font-body'>{'(Click to select)'}</span>}
              </p>
            </p>
            <div className='flex pb-1 md:pb-2 no-wrap justify-evenly w-full gap-4 md:gap-6 lg:flex-wrap lg:justify-evenly lg:gap-4 2xl:gap-18'>
              {worldSummitThemes.map(worldSummitTheme => isDesktop ? <div
                className={`hidden lg:h-8 lg:inline  ${worldSummitTheme.name === selectedTheme ? 'box text-[#3297b3a8]' : 'text-slate-500'}`}
                onClick={() => setSelectedTheme(worldSummitTheme.name)}>
                <p className={`text-md lowercase min-w-fit max-w-full whitespace-nowrap font-equinox hover:text-[#3297b3a8] ${worldSummitTheme.name === selectedTheme ? 'uppercase tracking-widest ' : ''}`}>{worldSummitTheme.name}</p>
              </div> : <worldSummitTheme.icon
                onClick={() => setSelectedTheme(worldSummitTheme.name)}
                className={`w-[40px] h-[50px] md:w-[70px] md:h-[70px] stroke-2 fill-slate-400 hover:fill-[#3297b3a8] ${worldSummitTheme.name === selectedTheme ? 'fill-[#3297b3a8]' : ''}`} />
              )}
            </div>
          </div>
        </div>
        <div className='h-full'>
          <div className='flex gap-3 lg:flex lg:flex-row h-full'>
            <div className='flex flex-col gap-3 lg:flex lg:flex-row w-full h-full'>
              {!isDesktop && <StatBoxes />}
              <div className='flex flex-wrap flex-row gap-3 md:justify-between h-1/3 lg:h-full w-full lg:flex-nowrap lg:flex-col lg:w-1/3'>
                {isDesktop && <RegionalInfo />}
                <div className='flex flex-row gap-3 w-full h-full lg:h-3/4'>
                  {!isDesktop && <RegionalInfo />}
                  <div className='w-2/3 lg:w-full'>
                    <ParentSize debounceTime={10}>{({ width, height }) =>
                      <ChartII width={width - 1} height={height - 10} />
                    }
                    </ParentSize>
                  </div>
                </div>
              </div>
              <div className='gap-3 flex flex-col h-1/2 lg:h-full lg:w-2/3'>
                {isDesktop && <StatBoxes />}
                <div className='h-3/4 lg:h-3/5'>
                  <div ref={mapContainer} className={`border-solid border-3 border-cyan-500  h-full w-full`}>
                    <FrameCorners
                      showContentLines
                      className='h-full w-full flex bg-center bg-cover'
                      animator={{ animate: false }}
                      contentLineWidth={3}
                      cornerWidth={3}
                      cornerLength={50}
                    // style={{ backgroundImage: `url(${bag2})` }}
                    >
                      <ButtonGroup className='absolute top-0 right-0 z-10 font-normal' values={['Mercator', 'Globe']} controlValue={mapProjection} onChange={(value: string) => setMapProjection(value as 'mercator' | 'globe')} />
                      {/*    <Map
                        // trackResize
                        minZoom={1}
                        maxZoom={2.5}
                        mapboxAccessToken='pk.eyJ1IjoiamRpbGxkZXYiLCJhIjoiY2xjbHR0MXNtOXE3ZTN2cGx1YWwxYmE4cyJ9.UKQMbbf2Q4revc3Nz9ws3g'
                        initialViewState={{
                          longitude: 15,
                          latitude: 0,
                          zoom: 1,
                        }}
                        pitch={mapProjection === 'mercator' ? 30 : 0}
                        projection={mapProjection}
                        attributionControl={false}
                        style={{ width: '100%', height: mapHeight - 20 + 'px' }}
                        mapStyle="mapbox://styles/jdilldev/cld37ljym000801o0ygnt71yu"
                        onRender={(event) => {
                          if (mapContainer.current)
                            setMapHeight(mapContainer.current.clientHeight)

                          return event.target.resize()
                        }}
                      /> */}
                    </FrameCorners>
                  </div>
                </div>
                <div className='h-1/4 lg:h-1/5'>
                  <FrameHexagon hover inverted palette='secondary' squareSize={40} lineWidth={3} animator={{ animate: false }} className='h-full w-full text-base md:text-lg' >
                    <p className='text-sm md:text-base white text-center mb-2'>Feel free to toggle the orientation of the map.</p>
                    <p className='text-sm md:text-base text-center px-4'>If you zoom into the map, you can see country locations. However, please note data and charts only display information at the global or subregional level.</p>
                  </FrameHexagon>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </SummitThemeContext.Provider >
  )
}

export default Home