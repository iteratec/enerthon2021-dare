import React from 'react';

import {withTooltip} from '@visx/tooltip';
import {WithTooltipProvidedProps} from '@visx/tooltip/lib/enhancers/withTooltip';
import {AnimatedAxis, AnimatedGrid, AreaSeries, buildChartTheme, Tooltip, XYChart} from "@visx/xychart";
import CustomChartBackground from "../../mapView/CustomChartBackground";

type TooltipData = ChartData;

// accessors
const getDate = (d: ChartDatum) => d.date;
const getValue = (d: ChartDatum) => d.value;

export type ChartDatum = {
    value: number,
    date: string
}

export type ChartData = {
    linename: string,
    linecolor: string,
    linedata: ChartDatum[]
}

export type AreaProps = {
    chartData: ChartData[]
    width: number;
    height: number;
};

const customTheme = buildChartTheme({
    colors: [], backgroundColor: "#fff", gridColor: "#adb5bd", gridColorDark: "#adb5bd", tickLength: 0
});

export default withTooltip<AreaProps, TooltipData>(
    ({
         chartData,
         width,
         height,
     }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
        if (width < 10) return null;

        return (
            <XYChart
                theme={customTheme}
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

                <>
                    {chartData.map(lineData =>
                        <AreaSeries
                            key={lineData.linename}
                            dataKey={lineData.linename}
                            data={lineData.linedata}
                            stroke={lineData.linecolor}
                            fill={lineData.linecolor}
                            xAccessor={(d) => getDate(d)}
                            yAccessor={(d) => getValue(d)}
                            fillOpacity={0.2}
                        />)}
                </>
                <AnimatedAxis
                    key="x-axis"
                    orientation="bottom"
                    numTicks={12}
                    animationTrajectory="center"
                />
                <AnimatedAxis
                    key="y-axis"
                    label="Output (MW)"
                    orientation="right"
                    numTicks={4}
                    animationTrajectory="center"
                />
                <Tooltip<ChartDatum>
                    showHorizontalCrosshair={true}
                    showVerticalCrosshair={true}
                    snapTooltipToDatumX={false}
                    snapTooltipToDatumY={false}
                    showDatumGlyph={false}
                    showSeriesGlyphs={true}
                    renderTooltip={({tooltipData, colorScale}) => (
                        <>
                            {(tooltipData?.nearestDatum?.datum &&
                                tooltipData?.nearestDatum?.datum.date) ||
                            'No date'}
                            <br/>
                            <br/>
                            {(
                                (Object.keys(tooltipData?.datumByKey ?? {})).filter((linename) => linename) as string[]
                            ).map((linename) => {
                                const lineValues = chartData.find((data) => data.linename === linename)
                                const value = lineValues?.linedata.find((d) => d.date === tooltipData?.nearestDatum?.datum.date)?.value;

                                return (
                                    <div key={linename}>
                                        <em
                                            style={{
                                                color: lineValues.linecolor,
                                                textDecoration:
                                                    tooltipData?.nearestDatum?.key === linename ? 'underline' : undefined,
                                            }}
                                        >
                                            {linename}
                                        </em>{' '}
                                        {value == null || Number.isNaN(value)
                                            ? '–'
                                            : `${value.toFixed(2)} MW`}
                                    </div>
                                );
                            })}
                        </>
                    )}
                />
            </XYChart>
        );
    },
);
