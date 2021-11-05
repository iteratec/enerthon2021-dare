import * as React from "react";
import {Column, useTable} from "react-table";
import {activationDataPerDay} from "./activationData";
import dayjs from "dayjs";

import "./ActivationTable.scss";
import {SVG} from "../components/SVG";

export interface ActivationTableProps {
    day: Date;
    activatedPowerplantsCallback: (powerplants: string[]) => void;
}

interface ActivationTableDataRow {
    powerplant: string;
    isUp: boolean;
    isDown: boolean;
}

const columns: Column<ActivationTableDataRow>[] = [
    {
        Header: 'Name',
        accessor: 'powerplant',
    },
    {
        Header: 'Direction',
        Cell: props => (
            <span>
                {props.row.original.isUp && <SVG name="arrow-top-right-bold-outline" className="activation-icon-up" />}
                {props.row.original.isDown && <SVG name="arrow-down-right-bold-outline" className="activation-icon-down" />}
            </span>
        )
    }
];

const activatedPowerPlants = (day: Date): ActivationTableDataRow[] => {
    const currentDayString = dayjs(day).format("YYYY-MM-DD");

    const dailyActivations = activationDataPerDay[currentDayString];
    if (!dailyActivations) {
        return [];
    }

    return Object.entries(dailyActivations).reduce<ActivationTableDataRow[]>((acc, [, activations]) => {
        let result: ActivationTableDataRow[] = acc;
        activations?.forEach((activation) => {
            if (activation) {
                const existingActivationEntry = result.find((existing) => existing.powerplant === activation.powerplant);

                if (existingActivationEntry) {
                    if (!existingActivationEntry.isUp && activation.type === "up") {
                        existingActivationEntry.isUp = true;
                    }

                    if (!existingActivationEntry.isDown && activation.type === "down") {
                        existingActivationEntry.isDown = true;
                    }
                } else {
                    result = [...result, {
                        powerplant: activation.powerplant,
                        isUp: activation.type === "up",
                        isDown: activation.type === "down"
                    }];
                }
            }
        });

        return result;
    }, []);
};

export const ActivationTable: React.FC<ActivationTableProps> = (props) => {
    const data = React.useMemo<ActivationTableDataRow[]>(() => {
        return activatedPowerPlants(props.day);
    }, [props.day]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data
    });

    React.useEffect(() => {
        props.activatedPowerplantsCallback(data.map((activation) => activation.powerplant));
    }, [data]);

    return (
        <div className="activation-table-wrapper">
            <h3>Activations on {dayjs(props.day).format("MMMM D, YYYY")}</h3>
            <table className="activation-table" {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};