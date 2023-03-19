'use client'

import Link from "next/link"
import { memo, useRef } from "react"
import { MapRef } from "react-map-gl"
import { DEFAULT_THEME_PROMPT, WORLD_SUMMIT_THEMES } from "../app/constants/constants"
import { AggregatorType, CountryMetrics } from "../app/data/types"
import { useWindowSize } from "../app/hooks/hooks"
import { useGlobalStore } from "../lib/store"
import { replaceSpacesWithUnderscore } from "../utils"


export const CircularThemeSelector = memo(() => {
    const { metric, grouping, region, theme: selectedTheme, setTheme, setMetric } = useGlobalStore()
    //TODO: look into why this weird hack is necessary; without it, I cant get global state values from zustand

    const [windowSize,] = useWindowSize()
    const absolutePositionTopAndLeft = 100
    const themeContainerWidth = 430
    const r = themeContainerWidth / 3.8

    const changeTheme = (theme: {
        name: string;
        icon: any;
        metrics: CountryMetrics[];
    }) => {

        setTheme(theme.name)
        setMetric(theme.metrics[0])

    }

    return <div className="hidden md:inline z-10 fixed left-8 top-16">
        <p
            style={{ top: absolutePositionTopAndLeft - 10, left: absolutePositionTopAndLeft / 2, position: 'absolute' }}
            className={`w-36 hidden md:inline font-equinox text-sm lowercase text-center ${selectedTheme === DEFAULT_THEME_PROMPT ? 'text-red-500' : ''}`}>
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

                let route = `${theme.name}/${grouping}/${theme.metrics[0]}${region ? '?region=' + region : ''}`
                route = replaceSpacesWithUnderscore(route)
                return <div className={`hidden md:inline absolute hover:scale-125 `} style={{ top, left }}>
                    <Link key={theme.name} href={route}>
                        <theme.icon
                            onClick={() => changeTheme(theme)}
                            className={`w-10 h-10 stroke-2  hover:fill-[#56d3dcc8] ${theme.name === selectedTheme ? 'fill-[#56d3dcc8]' : 'fill-slate-300'}`} />
                    </Link>
                </div>

            })}
        </div>
    </div>
})

export const ThemeSelector = memo(() => {
    const { theme: selectedTheme, setTheme, setMetric, grouping, metric, region } = useGlobalStore()

    const changeTheme = (theme: {
        name: string;
        icon: any;
        metrics: CountryMetrics[];
    }) => {

        setTheme(theme.name)
        setMetric(theme.metrics[0])

    }

    return <>
        <p className="md:hidden font-agelast tracking-widest text-xs md:text-base">Themes</p>
        <div className="flex flex-col justify-evenly items-center h-full">
            {WORLD_SUMMIT_THEMES.map((theme, index) => {
                let route = `${theme.name}/${grouping}/${theme.metrics[0]}${region ? '?region=' + region : ''}`
                route = replaceSpacesWithUnderscore(route)

                return <Link key={theme.name} href={route}>
                    <theme.icon
                        onClick={() => changeTheme(theme)}
                        className={`w-fit h-8 stroke-2 md:hidden  hover:fill-[#56d3dcc8] ${theme.name === selectedTheme ? 'fill-[#56d3dcc8]' : 'fill-slate-300'}`} />
                </Link>
            })}
        </div>
    </>
},)

