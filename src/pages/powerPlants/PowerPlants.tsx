import * as React from "react";
import {useState, useEffect} from "react";
import * as d3 from "d3";

import {germanMap} from "./germanMap";

import "./PowerPlants.scss";

interface PowerPlantsProps {
    width: number
    height: number
}

export const PowerPlants = ({width, height}: PowerPlantsProps) => {

    const showMap = () => {
        const svg = d3.select("#power-plants").append("svg")
            .attr("viewBox", [0.5, -30.5, width, height + 30].join(" "))
            .style("font", "10px sans-serif");

        svg
            .append("g")
            .data(germanMap)
            .join("path")
            .attr("id", d => d.id)
            .attr("class", "state")
            .attr("d", d => d.path)
    }

    return <div id="power-plants"></div>
}
