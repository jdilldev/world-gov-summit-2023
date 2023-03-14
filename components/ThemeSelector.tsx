'use client'

import { memo } from "react"
import { WORLD_SUMMIT_THEMES } from "../app/constants/constants"
import { useGlobalStore } from "../lib/store"

const ThemeSelector = memo(() => {
    console.log('Theme Selector')

    const { theme: selectedTheme, setTheme } = useGlobalStore()

    return <>
        <p className="md:hidden font-agelast tracking-widest text-xs md:text-base">Themes</p>
        <div className="flex flex-col justify-evenly items-center h-full">
            {WORLD_SUMMIT_THEMES.map((theme, index) => {
                return <div key={theme.name} className=''>
                    <theme.icon
                        onClick={() => setTheme(theme.name)}
                        className={`w-fit h-8 stroke-2 md:hidden  hover:fill-[#56d3dcc8] ${theme.name === selectedTheme ? 'fill-[#56d3dcc8]' : 'fill-slate-300'}`} />
                </div>
            })}
        </div>
    </>
},)

export default ThemeSelector