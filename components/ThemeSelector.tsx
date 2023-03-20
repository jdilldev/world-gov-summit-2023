'use client'

import { memo } from "react"
import { DEFAULT_THEME_PROMPT, WORLD_SUMMIT_THEMES } from "../app/constants/constants"
import { replaceSpacesWithUnderscore, replaceUnderscoreWithSpace } from "../utils"
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export const CircularThemeSelector = memo(() => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    //TODO: look into why this weird hack is necessary; without it, I cant get global state values from zustand

    const absolutePositionTopAndLeft = 100
    const themeContainerWidth = 430
    const r = themeContainerWidth / 3.8


    const [_, theme, grouping, ___] = pathname!.split('/')
    const currentTheme = replaceUnderscoreWithSpace(theme) || DEFAULT_THEME_PROMPT
    const region = searchParams.get('region')

    return <div className="hidden md:inline z-10 fixed left-8 top-16">
        <p
            style={{ top: absolutePositionTopAndLeft - 10, left: absolutePositionTopAndLeft / 2, position: 'absolute' }}
            className={`w-36 hidden md:inline font-equinox text-sm lowercase text-center ${currentTheme === DEFAULT_THEME_PROMPT ? 'text-red-500' : ''}`}>
            {currentTheme}</p>
        <div>
            {WORLD_SUMMIT_THEMES.map((summitTheme, index) => {
                //http://jsfiddle.net/55ukqboa/1/
                //https://stackoverflow.com/questions/26599782/positioning-divs-in-a-circle-using-javascript
                //theta is (360/n)/180 where n is the number of items that need to be in the circle
                const theta = ((360 / WORLD_SUMMIT_THEMES.length) / 180) * index * Math.PI
                const x = Math.round(r * (Math.cos(theta)))
                const y = Math.round(r * (Math.sin(theta)))
                const top = (absolutePositionTopAndLeft) - y
                const left = (absolutePositionTopAndLeft) + x

                let route = `${summitTheme.name}/${grouping ?? 'world'}/${summitTheme.metrics[0]}${region ? '?region=' + region : ''}`
                route = replaceSpacesWithUnderscore(route)
                return <div key={summitTheme.name} className={`hidden md:inline absolute hover:scale-125 `} style={{ top, left }}>

                    <summitTheme.icon
                        onClick={() => router.push(route)}
                        className={`w-10 h-10 stroke-2  hover:fill-[#56d3dcc8] ${summitTheme.name === currentTheme ? 'fill-[#56d3dcc8]' : 'fill-slate-300'}`} />
                </div>

            })}
        </div>
    </div>
})

export const ThemeSelector = memo(() => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const [_, theme, grouping, ___] = pathname!.split('/')
    const currentTheme = replaceUnderscoreWithSpace(theme) || DEFAULT_THEME_PROMPT
    const region = searchParams.get('region')

    return <>
        <p className="md:hidden font-agelast tracking-widest text-xs md:text-base">Themes</p>
        <div className="flex flex-col justify-evenly items-center h-full">
            {WORLD_SUMMIT_THEMES.map((theme) => {
                let route = `${theme.name}/${grouping ?? 'world'}/${theme.metrics[0]}${region ? '?region=' + region : ''}`
                route = replaceSpacesWithUnderscore(route)

                return <theme.icon
                    key={theme.name}
                    onClick={() => router.push(route)}
                    className={`w-fit h-8 stroke-2 md:hidden  hover:fill-[#56d3dcc8] ${theme.name === currentTheme ? 'fill-[#56d3dcc8]' : 'fill-slate-300'}`} />

            })}
        </div>
    </>
},)

