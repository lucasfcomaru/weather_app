// import { useContext } from "react";
// import { WeatherContext } from "../context/WeatherContext";

import { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../context/WeatherContext';



export const theme = {
    white: "#FFFFFF",
    blue: "#010326",
    grey: "#262626",
    black: "#000000",
    blackOpacity: "#00000090",
    yellow1: "#EBF227",
    yellow2: "#F2E422",
    yellow3: "#8C851C",
}

// export const toggleTheme = () => {
//     const { classActive } = useContext(WeatherContext);
//     console.log(classActive)

//     if(classActive) {
//         const theme = {
//             white: "#FFFFFF",
//             blue: "#010326",
//             grey: "#262626",
//             black: "#000000",
//             blackOpacity: "#00000090",
//             yellow1: "#EBF227",
//             yellow2: "#F2E422",
//             yellow3: "#8C851C",
//         }
//         return theme;
//     } else {
//         const theme = {
//             white: "#FFFFFF",
//             blue: "#010326",
//             grey: "#262626",
//             black: "#000000",
//             blackOpacity: "#00000090",
//             yellow1: "#EBF227",
//             yellow2: "#F2E422",
//             yellow3: "#8C851C",
//         }
//         return theme;
//     }
// }