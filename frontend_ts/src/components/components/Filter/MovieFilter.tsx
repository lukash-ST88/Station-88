import MyInput from "../../UI/MyInput/MyInput"
import MySelect from "../../UI/MySelect/MySelect"
import React, { useState } from "react"
import ReactSlider from 'react-slider'





interface FilterProps {
    sort: string,
    setSort(arg: string): void,
    search: string,
    setSearch(arg: string): void,
    releaseYears: number[],
    setReleaseYears(arg: number[]): void
    defaultYeras: number[],
}

const MovieFilter = (props: FilterProps) => {
    return (
        <>
            <div className="lg:m-2 flex lg:block">
                <MyInput 
                    value={props.search} 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.setSearch(event.target.value)}
                />
                <MySelect
                    value={props.sort}
                    onChange={(selectedSort) => {
                        props.setSort(selectedSort);
                    }}
                    defaultValue="Сортировка"
                    options={[
                        { value: "-release_date", name: "по дате - новые"},
                        { value: "-year", name: "по году - новые"},
                        { value: "year", name: "по году - старые" },
                        { value: "release_date", name: "по дате - старые" }
                    ]} 
                />
            </div>
            <div className="lg:mt-4 lg:ml-5 mx-2 lg:mx-0">
                <div className="m-2 flex justify-center items-center text-gray-500 text-xl">Год</div>
                <ReactSlider
                        className="w-full h-2 bg-gray-500 cursor-pointer flex items-center justify-center"
                        trackClassName="bg-st88-secondary"
                        defaultValue={props.releaseYears}
                        min={props.defaultYeras[0]}
                        max={props.defaultYeras[1]}
                        step={1}
                        onAfterChange={(newReleaseYears) => props.setReleaseYears(newReleaseYears)}
                        renderThumb={(props, state) => (
                            <div {...props} className="p-1 bg-st88-secondary border-2 rounded flex items-center justify-center text-white text-xs font-bold focus:ring-white focus:outline-none focus:ring-2">
                                {state.valueNow}
                            </div>
                        )}
                        renderTrack={(props, state) => {
                            const trackColor = state.index === 1 ? 'bg-st88-secondary border-2' : 'bg-gray-500';
                            return (
                              <div 
                                {...props} 
                                className={`h-2 ${trackColor}`}
                              />
                            );
                          }}
                    />
            </div>
            
        </>
    )
}

export default MovieFilter;