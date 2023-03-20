'use client'

import { Map as Mapbox, MapRef, MapLayerMouseEvent } from "react-map-gl";
import { useCallback, useContext, useRef, useState } from "react";
import { useWindowSize } from "../app/hooks/hooks";
import { useRouter } from "next/navigation";
import { replaceSpacesWithUnderscore } from "../utils";
import { usePathname } from "next/navigation";
import 'mapbox-gl/dist/mapbox-gl.css'


const Map = () => {
    const router = useRouter();
    const pathname = usePathname()
    const [zoom, setZoom] = useState(0)
    const [windowSize,] = useWindowSize()
    const projection = windowSize < 825 ? 'mercator' : 'globe'
    const longitude = windowSize < 825 ? -30 : 15
    const latitude = windowSize < 825 ? 90 : 0

    const [_, theme, __, metric] = pathname!.split('/')

    return <div className={'h-full w-full relative md:ml-20 md:h-[90%]'}>
        <p>{theme}</p>
    </div>
}

export default Map