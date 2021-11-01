import * as React from "react";
import {useState, useEffect} from "react";
import * as d3 from "d3";

import {germanMap} from "./germanMap";
import {drawWindmill, createWindmillDefs} from "./drawWindmill";

import "./PowerPlants.scss";

interface PowerPlantsProps {
    width: number
    height: number
}

export const PowerPlants = ({width, height}: PowerPlantsProps) => {

    useEffect(() => {
        // kudos to: https://codepen.io/jorinde/pen/ObvRGd
        if(document.getElementById("#maproot") == null) {
            const svg = d3.select("#power-plants").append("svg");

            svg.attr("viewBox", [0.5, -30.5, width, height + 100].join(" "))
                .style("font", "10px sans-serif")
                .append("g")
                .attr("id", "maproot");

            createWindmillDefs(svg);

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
            });

        d3.select("#maproot")
            .append("g")
            .attr("id", "windmillroot");
        drawWindmill("windmill-1", "#windmillroot", 100, 100)
        drawWindmill("windmill-1", "#windmillroot", 500, 300)

    })

    return <div id="power-plants"></div>
}
