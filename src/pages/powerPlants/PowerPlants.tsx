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

    useEffect(() => {
        if(document.getElementById("#maproot") == null) {
            const svg = d3.select("#power-plants").append("svg");

            svg.attr("viewBox", [0.5, -30.5, width, height + 100].join(" "))
                .style("font", "10px sans-serif")
                .append("g")
                .attr("id", "maproot");

            const defs = svg.append("defs");

            const linearGradient = defs.append("linearGradient")
                .attr("id", "linearGradient-1")
                .attr("x1", "50%")
                .attr("y1", "0%")
                .attr("x2", "69.9174638%")
                .attr("y2", "130.77405%");

            linearGradient.append("stop")
                .attr("stop-color", "#FFFFFF")
                .attr("stop-opacity", "0.5")
                .attr("offset", "0%");

            linearGradient.append("stop")
                .attr("stop-color", "#000000")
                .attr("stop-opacity", "0.5")
                .attr("offset", "100%");

            defs.append("polygon")
                .attr("id", "path-2")
                .attr("points", "19.0581604 -3.98605853e-13 19.0581604 560.061 37.2463295 560.061 26.5631604 -5.1159077e-13");

            defs.append("rect")
                .attr("id", "path-3")
                .attr("x", "0")
                .attr("y", "0")
                .attr("width", "871")
                .attr("height", "871");

            defs.append("mask")
                .attr("id", "mask-4")
                .attr("maskContentUnits", "userSpaceOnUse")
                .attr("maskUnits", "objectBoundingBox")
                .attr("x", "0")
                .attr("y", "0")
                .attr("width", "871")
                .attr("height", "871")
                .attr("fill", "white")
                .append("use")
                .attr("xlink:href", "#path-3");

            defs.append("path")
                .attr("id", "path-5")
                .attr("d", "M623.655752,352.597412 C515.710752,380.387412 430.630752,412.407412 433.635752,424.092412 L824.580752,323.447412 C821.580752,311.742412 731.620752,324.802412 623.655752,352.597412");

            defs.append("path")
                .attr("id", "path-6")
                .attr("d", "M373.63556,615.502064 C265.69056,643.292064 180.61056,675.312064 183.61556,686.997064 L574.56056,586.352064 C571.56056,574.647064 481.60056,587.707064 373.63556,615.502064");

            defs.append("path")
                .attr("id", "path-7")
                .attr("d", "M265.666238,303.7829 C157.721238,331.5729 72.6412376,363.5929 75.6462376,375.2779 L466.591238,274.6329 C463.591238,262.9279 373.631238,275.9879 265.666238,303.7829");

            defs.append("path")
                .attr("id", "path-8")
                .attr("d", "M470.835,435.405 C470.835,454.95 454.98,470.825 435.43,470.825 C415.865,470.825 400,454.95 400,435.405 C400,415.845 415.865,400 435.43,400 C454.98,400 470.835,415.845 470.835,435.405");
        }

        d3.select("#maproot")
            .selectAll("path.state")
            .data(germanMap)
            .join("path")
            .attr("id", d => d.id)
            .attr("class", "state")
            .attr("d", d => d.path)
            .on("mouseover", function () {
                d3.select(this).classed("active", true)
            })
            .on("mouseout", function () {
                d3.select(this).classed("active", false)
            })
    })

    return <div id="power-plants"></div>
}
