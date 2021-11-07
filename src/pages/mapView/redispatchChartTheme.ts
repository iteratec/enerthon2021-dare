import {XYChartTheme} from "@visx/xychart";

export const redispatchChartTheme: XYChartTheme = {
    "backgroundColor": "#fff",
    "colors": ["#0b7285", "#66d9e8", "#fcc419", "#ff8787", "#9c36b5", "#cc5de8", "#a61e4d"],
    "htmlLabel": {
        "color": "#212529",
        "fontFamily": "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
        "fontWeight": 700,
        "fontSize": 12,
        "textAnchor": "middle",
        "pointerEvents": "none",
        "letterSpacing": 0.4
    },
    "svgLabelSmall": {
        "fontFamily": "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
        "fontWeight": 200,
        "fontSize": 11,
        "textAnchor": "middle",
        "pointerEvents": "none",
        "letterSpacing": 0.4,
        "fill": "#495057",
        "stroke": "none"
    },
    "svgLabelBig": {
        "fontFamily": "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
        "fontWeight": 700,
        "fontSize": 12,
        "textAnchor": "middle",
        "pointerEvents": "none",
        "letterSpacing": 0.4,
        "fill": "#212529",
        "stroke": "none"
    },
    "gridStyles": {"stroke": "#adb5bd", "strokeWidth": 1},
    "axisStyles": {
        "x": {
            "top": {
                "axisLabel": {
                    "fontFamily": "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                    "fontWeight": 700,
                    "fontSize": 12,
                    "textAnchor": "middle",
                    "pointerEvents": "none",
                    "letterSpacing": 0.4,
                    "fill": "#212529",
                    "stroke": "none",
                    "dy": "-0.25em"
                },
                "axisLine": {"stroke": "#212529", "strokeWidth": 2},
                "tickLabel": {
                    "fontFamily": "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                    "fontWeight": 200,
                    "fontSize": 11,
                    "textAnchor": "middle",
                    "pointerEvents": "none",
                    "letterSpacing": 0.4,
                    "fill": "#495057",
                    "stroke": "none",
                    "dy": "-0.25em"
                },
                "tickLength": 4,
                "tickLine": {"strokeWidth": 1, "stroke": "#adb5bd"}
            },
            "bottom": {
                "axisLabel": {
                    "fontFamily": "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                    "fontWeight": 700,
                    "fontSize": 12,
                    "textAnchor": "middle",
                    "pointerEvents": "none",
                    "letterSpacing": 0.4,
                    "fill": "#212529",
                    "stroke": "none",
                    "dy": "-0.25em"
                },
                "axisLine": {"stroke": "#212529", "strokeWidth": 2},
                "tickLabel": {
                    "fontFamily": "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                    "fontWeight": 200,
                    "fontSize": 11,
                    "textAnchor": "middle",
                    "pointerEvents": "none",
                    "letterSpacing": 0.4,
                    "fill": "#495057",
                    "stroke": "none",
                    "dy": "0.125em"
                },
                "tickLength": 4,
                "tickLine": {"strokeWidth": 1, "stroke": "#adb5bd"}
            }
        }, "y": {
            "left": {
                "axisLabel": {
                    "fontFamily": "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                    "fontWeight": 700,
                    "fontSize": 12,
                    "textAnchor": "middle",
                    "pointerEvents": "none",
                    "letterSpacing": 0.4,
                    "fill": "#212529",
                    "stroke": "none",
                    "dx": "-1.25em"
                },
                "axisLine": {"stroke": "#adb5bd", "strokeWidth": 1},
                "tickLabel": {
                    "fontFamily": "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                    "fontWeight": 200,
                    "fontSize": 11,
                    "textAnchor": "end",
                    "pointerEvents": "none",
                    "letterSpacing": 0.4,
                    "fill": "#495057",
                    "stroke": "none",
                    "dx": "-0.25em",
                    "dy": "0.25em"
                },
                "tickLength": 4,
                "tickLine": {"strokeWidth": 1, "stroke": "#adb5bd"}
            },
            "right": {
                "axisLabel": {
                    "fontFamily": "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                    "fontWeight": 700,
                    "fontSize": 12,
                    "textAnchor": "middle",
                    "pointerEvents": "none",
                    "letterSpacing": 0.4,
                    "fill": "#212529",
                    "stroke": "none",
                    "dx": "1.25em"
                },
                "axisLine": {"stroke": "#adb5bd", "strokeWidth": 1},
                "tickLabel": {
                    "fontFamily": "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                    "fontWeight": 200,
                    "fontSize": 11,
                    "textAnchor": "start",
                    "pointerEvents": "none",
                    "letterSpacing": 0.4,
                    "fill": "#495057",
                    "stroke": "none",
                    "dx": "0.25em",
                    "dy": "0.25em"
                },
                "tickLength": 4,
                "tickLine": {"strokeWidth": 1, "stroke": "#adb5bd"}
            }
        }
    }
}