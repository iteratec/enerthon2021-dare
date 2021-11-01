import * as d3 from "d3";

import "./windmill.scss";

const createPole = (root: any) => {
    const pole = root.append("g")
        .attr("id", "pole")
        .attr("class", "pole")
        .attr("transform", `translate(419.000000, 437.000000)`);

    pole.append("polygon")
        .attr("points", "12.3348988 -5.68434189e-14 0 560.061 18.6584012 560.061 18.6598988 -5.68434189e-14");

    const poleG = pole.append("g");

    poleG.append("use")
        .attr("fill", "#F6F6F6")
        .attr("xlink:href", "#path-2");

    poleG.append("use")
        .attr("fill-opacity", "0.600000024")
        .attr("fill", "url(#linearGradient-1)")
        .attr("xlink:href", "#path-2");

    return pole;
}

const createWieken = (root: any) => {
    const wieken = root.append("g")
        .attr("id", "wieken")
        .attr("transform-origin", "428.8298034667969px 437.3442687988281px")
        .attr("class", "wieken");

    wieken.append("use")
        .attr("stroke", "#979797")
        .attr("maske", "url(#mask-4)")
        .attr("stroke-width", "2")
        .attr("fill", "#D8D8D8")
        .attr("opacity", "0")
        .attr("xlink:href", "#path-3");

    wieken.append("path")
        .attr("d", "M825.844538,324.073519 L434.904538,424.718519 C437.914538,436.408519 527.864538,423.338519 635.839538,395.548519 C743.779538,367.763519 828.864538,335.743519 825.844538,324.073519")
        .attr("transform", "translate(630.413523, 376.537022) rotate(-4.000000) translate(-630.413523, -376.537022)");

    const wiekenG1 = wieken.append("g")
        .attr("id", "wiekenG1")
        .attr("transform", "translate(629.069645, 371.623854) rotate(-4.000000) translate(-629.069645, -371.623854)");
    wiekenG1.append("use")
        .attr("fill", "#F6F6F6")
        .attr("xlink:href", "#path-5");
    wiekenG1.append("use")
        .attr("fill-opacity", "0.3")
        .attr("fill", "url(#linearGradient-1)")
        .attr("xlink:href", "#path-5");

    wieken.append("path")
        .attr("d", "M569.71572,580.264334 L178.77572,680.909334 C181.78572,692.599334 271.73572,679.529334 379.71072,651.739334 C487.65072,623.954334 572.73572,591.934334 569.71572,580.264334")
        .attr("transform", "translate(374.284705, 632.727837) rotate(122.000000) translate(-374.284705, -632.727837)");

    const wiekenG2 = wieken.append("g")
        .attr("id", "wiekenG2")
        .attr("transform", "translate(379.049453, 634.528505) rotate(122.000000) translate(-379.049453, -634.528505)");
    wiekenG2.append("use")
        .attr("fill", "#F6F6F6")
        .attr("xlink:href", "#path-6");
    wiekenG2.append("use")
        .attr("fill-opacity", "0.3")
        .attr("fill", "url(#linearGradient-1)")
        .attr("xlink:href", "#path-6");

    wieken.append("path")
        .attr("d", "M78.7560719,367.015731 C81.7660719,378.705731 171.716072,365.635731 279.691072,337.845731 C387.631072,310.060731 472.716072,278.040731 469.696072,266.370731 L78.7560719,367.015731 Z")
        .attr("transform", "translate(274.265057, 318.834234) rotate(230.000000) translate(-274.265057, -318.834234)");

    const wiekenG3 = wieken.append("g")
        .attr("id", "wiekenG3")
        .attr("transform", "translate(271.080131, 322.809342) rotate(230.000000) translate(-271.080131, -322.809342)");
    wiekenG3.append("use")
        .attr("fill", "#F6F6F6")
        .attr("xlink:href", "#path-7");
    wiekenG3.append("use")
        .attr("fill-opacity", "0.3")
        .attr("fill", "url(#linearGradient-1)")
        .attr("xlink:href", "#path-7");
}

const createAs = (root: any) => {

    const g = root.append("g")
        .attr("id", "as")
        .attr("class", "as");

    g.append("use")
        .attr("fill", "#FFFFFF")
        .attr("xlink:href", "#path-8");

    g.append("use")
        .attr("fill-opacity", "0.300000012")
        .attr("fill", "url(#linearGradient-1)")
        .attr("xlink:href", "#path-8")
}

export const drawWindmill = (id: string, parentSelector: string, x: number, y: number) => {
    const root = d3.selectAll(parentSelector).append("g").attr("id", id)
        .attr("class", "windmill")
        .attr("transform", `scale(0.2 0.2) translate(${x},${y})`);

    createPole(root);
    createWieken(root);
    createAs(root);

    root.append("path")
        .attr("d", "M435.987915,460 C422.755287,460 412,449.239295 412,435.987909 C412,422.760705 422.755287,412 435.987915,412 C449.208459,412 460,422.760705 460,435.987909 C460,449.239295 449.208459,460 435.987915,460")
        .attr("fill", "#FFFFFF")
}

export const createWindmillDefs = (svg: any) => {
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