import { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../context/WeatherContext';

export let theme = {
    white: "#FFFFFF",
    blue: "#010326",
    grey: "#262626",
    black: "#000000",
    blackOpacity: "#00000090",
    yellow1: "#EBF227",
    yellow2: "#F2E422",
    yellow3: "#8C851C",
}

// export const ToggleTheme = () => {
//     const { classActive } = useContext(WeatherContext);
//     console.log(classActive)

//     if(classActive) {
//         theme = {
//             white: "#FFFFFF",
//             blue: "#010326",
//             grey: "#262626",
//             black: "#000000",
//             blackOpacity: "#00000090",
//             yellow1: "#EBF227",
//             yellow2: "#F2E422",
//             yellow3: "#8C851C",
//         }
//         console.log("classe ativa")
//         return theme;
//     } else {
//         theme = {
//             white: "#FFFFFF",
//             blue: "#010326",
//             grey: "#262626",
//             black: "#000000",
//             blackOpacity: "#00000090",
//             yellow1: "#000",
//             yellow2: "#F2E422",
//             yellow3: "#8C851C",
//         }
//         console.log("classe não ativa")
//         return theme;
//     }
// }

// let toggle = ToggleTheme();
// console.log(toggle)

