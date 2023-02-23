import { useState, useContext, useEffect } from "react"
import { SummitThemeContext, DEFAULT_THEME_PROMPT, WORLD_SUMMIT_THEMES } from "../app/constants"
import { useWindowSize } from "../app/hooks/hooks"

const ThemeSelector = () => {
    const [shouldRender, setShouldRender] = useState(false)
    const windowSize = useWindowSize()
    const { selectedTheme, setSelectedTheme } = useContext(SummitThemeContext)

    const isThemeSelected = selectedTheme !== DEFAULT_THEME_PROMPT


    return windowSize !== 'DESKTOP' ?
        <>
            <p className='whitespace-nowrap tracking-[.2em] md:tracking-[.7em] text-slate-300 text-base md:text-xl uppercase font-equinox'>{`The Present Future | 2023`}</p>
            <div className='tracking-[.5em] xs:text-sm text-xl white uppercase font-dreamscape text-[#72a4b5]'>
                <p className={`${isThemeSelected ? 'tracking-normal xs:text-xs text-sm md:text-lg md:tracking-widest md:lowercase font-body md:font-agelast text-center' : ''}`}>{selectedTheme}
                    {!isThemeSelected && <span className='text-sm normal-case font-thin tracking-normal font-body'>{'(Click to select)'}</span>}
                </p>
            </div>
            <div className='flex pb-1 md:pb-2 no-wrap justify-evenly w-full gap-4'>
                {WORLD_SUMMIT_THEMES.map(worldSummitTheme => <worldSummitTheme.icon
                    onClick={() => setSelectedTheme(worldSummitTheme.name)}
                    className={`w-[50px] h-[55px]  stroke-2 fill-slate-400 hover:fill-[#3297b3a8] ${worldSummitTheme.name === selectedTheme ? 'fill-[#3297b3a8]' : ''}`} />
                )}
            </div>
        </> : <> <p className='tracking-[.7em] text-slate-300 text-2xl uppercase font-equinox'>{`The Present Future | 2023`}</p>
            <div className='tracking-[.5em] text-xl white uppercase font-dreamscape text-[#72a4b5]'>
                <p className={`tracking-normal text-2xl font-dreamscape text-center' : ''}`}>{'Themes'}
                    {!isThemeSelected && <span className='text-sm normal-case font-thin tracking-normal font-body'>{' (Click to select)'}</span>}
                </p>
            </div>
            <div className='flex flex-wrap w-full gap-x-16 gap-y-4 justify-center items-center'>
                {WORLD_SUMMIT_THEMES.map(worldSummitTheme => <div className='h-8'>
                    <div className={`w-fit ${worldSummitTheme.name === selectedTheme ? 'box text-[#3297b3a8]' : 'text-slate-500'}`}
                        onClick={() => setSelectedTheme(worldSummitTheme.name)}>
                        <p className={`text-md lowercase whitespace-nowrap font-equinox hover:text-[#3297b3a8] ${worldSummitTheme.name === selectedTheme ? 'uppercase tracking-widest ' : ''}`}>{worldSummitTheme.name}</p>
                    </div>
                </div>
                )}
            </div>
        </>
}

export default ThemeSelector