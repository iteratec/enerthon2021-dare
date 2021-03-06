import * as d3 from "d3";
import {CurveFactory} from "d3";

type DataObject = {[key: string]: any}

interface LineChartOptions {
    svgSelector: string;
    x: (x: DataObject) => number;
    y: (y: DataObject) => number;
    z: (y: DataObject) => string;
    title?: string;
    defined?: (d: any, i: number) => boolean;
    curve?: CurveFactory;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    width?: number;
    height?: number;
    xType?: typeof d3.scaleUtc;
    xDomain?: [number, number];
    xRange?: [number, number];
    yType?: typeof d3.scaleLinear;
    yDomain?: [number, number];
    yRange?: [number, number];
    yFormat?: string;
    yLabel?: string;
    zDomain?: d3.InternSet;
    color?: string;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    strokeWidth?: number;
    strokeOpacity?: number;
    mixBlendMode?: string;
}

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/multi-line-chart
export const LineChart = (data, {
    svgSelector,
    x, // given d in data, returns the (temporal) x-value
    y, // given d in data, returns the (quantitative) y-value
    z, // given d in data, returns the (categorical) z-value
    title, // given d in data, returns the title text
    defined, // for gaps in data
    curve = d3.curveLinear, // method of interpolation between points
    marginTop = 20, // top margin, in pixels
    marginRight = 30, // right margin, in pixels
    marginBottom = 30, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    width = 640, // outer width, in pixels
    height = 200, // outer height, in pixels
    xType = d3.scaleUtc, // type of x-scale
    xDomain, // [xmin, xmax]
    xRange = [marginLeft, width - marginRight], // [left, right]
    yType = d3.scaleLinear, // type of y-scale
    yDomain, // [ymin, ymax]
    yRange = [height - marginBottom, marginTop], // [bottom, top]
    yFormat, // a format specifier string for the y-axis
    yLabel, // a label for the y-axis
    zDomain, // array of z-values
    color = "currentColor", // stroke color of line
    strokeLinecap , // stroke line cap of line
    strokeLinejoin, // stroke line join of line
    strokeWidth = 1.5, // stroke width of line
    strokeOpacity, // stroke opacity of line
    mixBlendMode = "multiply", // blend mode of lines
}: LineChartOptions) => {
    // Compute values.
    const X = d3.map(data, x);
    const Y = d3.map(data, y);
    const Z = d3.map(data, z);
    const O = d3.map(data, d => d);
    if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
    const D = d3.map(data, defined);

    d3.select(`${svgSelector} svg`).remove();

    const svg = d3.select(svgSelector).append("svg");

    // Compute default domains, and unique the z-domain.
    if (xDomain === undefined) xDomain = d3.extent(X);
    if (yDomain === undefined) yDomain = [0, d3.max(Y)];
    if (zDomain === undefined) zDomain = new d3.InternSet(Z);

    // Omit any data not present in the z-domain.
    const I = d3.range(X.length).filter(i => zDomain.has(Z[i]));

    // Construct scales and axes.
    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);
    const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);

    // Compute titles.
    // @ts-ignore
    const T = title === undefined ? Z : title === null ? null : d3.map(data, title);

    // Construct a line generator.
    const line = d3.line()
        .defined(i => {
            // @ts-ignore
            return D[i]
        })
        .curve(curve)
        .x(i => {
            // @ts-ignore
            return xScale(X[i])
        })
        .y(i => {
            // @ts-ignore
            return yScale(Y[i])
        });

    svg.attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height].join(" "))
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .style("-webkit-tap-highlight-color", "transparent")
        .on("pointerenter", pointerentered)
        .on("pointermove", pointermoved)
        .on("pointerleave", pointerleft)
        .on("touchstart", event => event.preventDefault());

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));

    const path = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-linecap", strokeLinecap)
        .attr("stroke-linejoin", strokeLinejoin)
        .attr("stroke-width", strokeWidth)
        .attr("stroke-opacity", strokeOpacity)
        .selectAll("path")
        .data(d3.group(I, i => Z[i]))
        .join("path")
        .style("mix-blend-mode", mixBlendMode)
        .attr("d", ([, I]) => {
            // @ts-ignore
            return line(I)
        });

    const dot = svg.append("g")
        .attr("display", "none");

    dot.append("circle")
        .attr("r", 2.5);

    dot.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .attr("y", -8);

    function pointermoved(event) {
        const [xm, ym] = d3.pointer(event);
        const i = d3.least(I, i => Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym)); // closest point
        path.attr("stroke", ([z]) => Z[i] === z ? null : "#ddd").filter(([z]) => Z[i] === z).raise();
        dot.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i])})`);
        if (T) { // @ts-ignore
            dot.select("text").text(T[i]);
        }
        // @ts-ignore
        svg.property("value", O[i]).dispatch("input", {bubbles: true});
    }

    function pointerentered() {
        path.style("mix-blend-mode", null).attr("stroke", "#ddd");
        dot.attr("display", null);
    }

    function pointerleft() {
        path.style("mix-blend-mode", "multiply").attr("stroke", null);
        dot.attr("display", "none");
        // @ts-ignore
        svg.node().value = null;
        // @ts-ignore
        svg.dispatch("input", {bubbles: true});
    }

    return Object.assign(svg.node(), {value: null});
}
