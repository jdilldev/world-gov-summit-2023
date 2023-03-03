import { Map as Mapbox, MapRef, MapLayerMouseEvent } from "react-map-gl";
import { useCallback, useContext, useRef, useState } from "react";
import { useWindowSize } from "../app/hooks/hooks";
import { getDeltaIndicator } from "./Shared";
import { DEFAULT_REGION, SummitThemeContext, WORLD_SUMMIT_THEMES } from "../app/constants";
import { M49_subregion } from "../app/data/types";


const Map = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const [zoom, setZoom] = useState(0)
    const [windowSize,] = useWindowSize()
    const projection = windowSize < 825 ? 'mercator' : 'globe'
    const longitude = windowSize < 825 ? -30 : 15
    const latitude = windowSize < 825 ? 90 : 0
    const mapRef = useRef<MapRef>();
    const { selectedTheme, setSelectedTheme, setSelectedRegion } = useContext(SummitThemeContext)
    const absolutePositionTopAndLeft = 100
    const themeContainerWidth = 430
    const r = themeContainerWidth / 3.8

    const onSelectSubregion = useCallback(({ lng, lat }) => {
        mapRef.current?.flyTo({ center: [lng, lat], duration: 1000 });
        setZoom(2.4)
    }, []);

    return <div ref={mapContainer} className={'h-full w-full relative'}>
        {/* 
        // @ts-ignore */}
        <div className="flex flex-col gap-2 justify-center items-center font-equinox  z-10 fixed top-[12%] right-1/4 pointer-events-none">
            <p className='text-red-500 tracking-widest'>Unemployment</p>
            <div className='flex flex-col gap-2 justify-center items-center w-20 h-20 border-dashed rounded-full border-2 text-red-600 border-red-600 bg-red-900 bg-opacity-30'>
                {getDeltaIndicator(-.5)}
                <p className="justify-center items-center text-center text-sm">{' 17% since 2019'}</p>
            </div>
        </div>
        <div className="hidden md:inline z-10 fixed left-8 top-16">
            <p
                style={{ top: absolutePositionTopAndLeft - 10, left: absolutePositionTopAndLeft / 2, position: 'absolute' }}
                className="w-36 hidden md:inline font-equinox text-sm lowercase text-center">
                {selectedTheme}</p>
            <div>
                {WORLD_SUMMIT_THEMES.map((theme, index) => {
                    //http://jsfiddle.net/55ukqboa/1/
                    //https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
                    //theta is (360/n)/180 where n is the number of items that need to be in the circle
                    const theta = ((360 / WORLD_SUMMIT_THEMES.length) / 180) * index * Math.PI
                    const x = Math.round(r * (Math.cos(theta)))
                    const y = Math.round(r * (Math.sin(theta)))
                    const top = (absolutePositionTopAndLeft) - y
                    const left = (absolutePositionTopAndLeft) + x
                    return <>
                        <div className={`hidden md:inline absolute hover:scale-125 `} style={{ top, left }}>
                            <theme.icon
                                onClick={() => setSelectedTheme(theme.name)}
                                className={`w-10 h-10 stroke-2  hover:fill-[#56d3dcc8] ${theme.name === selectedTheme ? 'fill-[#56d3dcc8]' : 'fill-slate-300'}`} />
                        </div>
                        <div className=''>
                            <theme.icon
                                onClick={() => setSelectedTheme(theme.name)}
                                className={`bg-blue-600 w-fit h-8 stroke-2 md:hidden  hover:fill-[#56d3dcc8] ${theme.name === selectedTheme ? 'fill-[#56d3dcc8]' : 'fill-slate-300'}`} />
                        </div>
                    </>
                })}
            </div>
        </div>
        <Mapbox
            ref={mapRef}
            trackResize
            minZoom={1}
            maxZoom={2.5}
            // zoom={zoom}
            mapboxAccessToken='pk.eyJ1IjoiamRpbGxkZXYiLCJhIjoiY2xjbHR0MXNtOXE3ZTN2cGx1YWwxYmE4cyJ9.UKQMbbf2Q4revc3Nz9ws3g'
            initialViewState={{
                longitude,
                latitude,
                zoom: 1,
            }}
            interactiveLayerIds={['subregional-data']}
            projection={projection}
            attributionControl={false}
            style={{ position: 'absolute', width: '100%', height: '100%', }}
            mapStyle="mapbox://styles/jdilldev/clemtp805000901s45xextcln"
            onClick={(e: MapLayerMouseEvent) => {
                if (!e.features[0]) return
                const { properties } = e.features[0];

                const subregion = properties.subregionName
                setSelectedRegion(subregion as M49_subregion)

                onSelectSubregion(e.lngLat)
            }}
            //onZoom={(e) => { console.log(e) }}
            onDragEnd={(e) => {
                setSelectedRegion(undefined)
            }}
        />

    </div>
}

export default Map