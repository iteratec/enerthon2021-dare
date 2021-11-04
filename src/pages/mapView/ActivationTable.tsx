import * as React from "react";
import {Column, useTable} from "react-table";
import {activationDataPerDay} from "./activationData";
import dayjs from "dayjs";

import "./ActivationTable.scss";

export interface ActivationTableProps {
    day: Date;
    activatedPowerplantsCallback?: (powerplants: {powerplant: string}[]) => void
}

interface ActivationTableDataRow {
    powerplant: string;
}

const columns: Column<ActivationTableDataRow>[] = [
    {
        Header: 'Name',
        accessor: 'powerplant',
    }
];

const activatedPowerPlants = (day: Date): {powerplant: string}[] => {
    const currentDayString = dayjs(day).format("YYYY-MM-DD");

    const dailyActivations = activationDataPerDay[currentDayString];
    if (!dailyActivations) {
        return [];
    }

    const activations = Object.entries(dailyActivations).reduce<ActivationTableDataRow[]>((acc, [, activations]) => {
        let result: ActivationTableDataRow[] = acc;
        activations?.forEach((activation) => {
            if (activation && !result.find((existing) => existing.powerplant === activation.powerplant)) {
                result = [...result, {powerplant: activation.powerplant}];
            }
        });

        return result;
    }, []);

    return activations;
}

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
        const app = activatedPowerPlants(props.day);
        props.activatedPowerplantsCallback(app);
    }, [props.day])

    return (
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
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
};