import React, {useMemo, useCallback} from 'react';

import {scaleTime, scaleLinear} from '@visx/scale';
import {withTooltip} from '@visx/tooltip';
import {WithTooltipProvidedProps} from '@visx/tooltip/lib/enhancers/withTooltip';
import {localPoint} from '@visx/event';
import {max, extent, bisector} from 'd3-array';
import {timeFormat} from 'd3-time-format';
import {redispatchChartTheme} from "../../mapView/redispatchChartTheme";
import {AnimatedAxis, AnimatedGrid, AnimatedLineSeries, Tooltip, XYChart} from "@visx/xychart";
import CustomChartBackground from "../../mapView/CustomChartBackground";
import {LineDatum} from "../../mapView/RedispatchChart";
import dayjs from "dayjs";

type TooltipData = ChartData;

// util
const formatDate = timeFormat("%H:%M");

// accessors
const getDate = (d: ChartDatum) => d.date;
const getValue = (d: ChartDatum) => d.value;
const bisectDate = bisector<ChartDatum, Date>((d) => new Date(d.date)).left;

export type ChartDatum = {
    value: number,
    date: string
}

export type ChartData = {
    linename: string,
    linedata: ChartDatum[]
}

export type AreaProps = {
    chartData: ChartData[]
    width: number;
    height: number;
};

export default withTooltip<AreaProps, TooltipData>(
    ({
         chartData,
         width,
         height,
     }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
        if (width < 10) return null;

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

                {chartData.map(lineData =>
                    <AnimatedLineSeries
                        key={lineData.linename}
                        dataKey={lineData.linename}
                        data={lineData.linedata}
                        xAccessor={(d) => getDate(d)}
                        yAccessor={(d) => getValue(d)}/>)}

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
                                                color: colorScale?.(linename),
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
