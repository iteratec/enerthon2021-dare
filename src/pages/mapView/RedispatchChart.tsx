import React from 'react';
import {AnimatedAxis, AnimatedGrid, AnimatedLineSeries, Tooltip, XYChart} from "@visx/xychart";

import CustomChartBackground from './CustomChartBackground';
import {redispatchChartTheme} from "./redispatchChartTheme";

export interface LineDatum {
    q: any;
    hour: any;
    [key: string]: any;
}

export interface RedispatchChartData {
    linenames: string[];
    linedata: LineDatum[];
}

interface DispatchChartProps {
    width: number;
    height: number;
    chartData?: RedispatchChartData;
    yTitle: string;
}

export function RedispatchChart({height, width, chartData, yTitle}: DispatchChartProps) {

    return (
        <XYChart
            theme={redispatchChartTheme}
            xScale={{type: "band", paddingInner: 0.3}}
            yScale={{type: "linear"}}
            height={Math.min(400, height)}
            width={width}
            captureEvents={true}
        >
            <CustomChartBackground/>
            <AnimatedGrid
                key={"grid-${center}"} // force animate on update
                rows={false}
                columns={false}
                animationTrajectory="center"
                numTicks={4}
            />

            {chartData.linenames.map(linename =>
                <AnimatedLineSeries
                    key={linename}
                    dataKey={linename}
                    data={chartData.linedata}
                    xAccessor={(agg) => agg.hour}
                    yAccessor={(agg) => agg[linename]}/>)}

            <AnimatedAxis
                key="x-axis"
                orientation="bottom"
                numTicks={4}
                animationTrajectory="center"
            />
            <AnimatedAxis
                key="y-axis"
                label={yTitle}
                orientation="right"
                numTicks={4}
                animationTrajectory="center"
            />
            <Tooltip<LineDatum>
                showHorizontalCrosshair={true}
                showVerticalCrosshair={true}
                snapTooltipToDatumX={false}
                snapTooltipToDatumY={false}
                showDatumGlyph={false}
                showSeriesGlyphs={true}
                renderTooltip={({tooltipData, colorScale}) => (
                    <>
                        {(tooltipData?.nearestDatum?.datum &&
                            tooltipData?.nearestDatum?.datum.hour) ||
                        'No hour'}
                        <br/>
                        <br/>
                        {(
                            (Object.keys(tooltipData?.datumByKey ?? {})).filter((linename) => linename) as string[]
                        ).map((linename) => {
                            const request = tooltipData?.nearestDatum?.datum && tooltipData?.nearestDatum?.datum[linename];

                            return (
                                <div key={linename}>
                                    <em
                                        style={{
                                            color: colorScale?.(linename),
                                            textDecoration:
                                                tooltipData?.nearestDatum?.key === linename ? 'underline' : undefined,
                                        }}
                                    >
                                        {linename}
                                    </em>{' '}
                                    {request == null || Number.isNaN(request)
                                        ? '–'
                                        : `${request} MW`}
                                </div>
                            );
                        })}
                    </>
                )}
            />
        </XYChart>
    );
}
