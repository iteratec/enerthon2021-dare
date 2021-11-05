import * as React from "react";
import * as _ from "lodash";
import {Column, useTable} from "react-table";
import {activationDataPerDay} from "./activationData";
import {powerPlantData} from "./powerPlantData";
import dayjs from "dayjs";

import "./ActivationTable.scss";
import {PowerDownIcon, PowerUpIcon} from "../components/icons";

export interface ActivationTableDataRow {
    powerplant: string;
    isUp: boolean;
    isDown: boolean;
    rdRequirementId: number;
    provider: string;
}

export interface ActivationTableProps {
    day: Date;
    selectedRDIds: number[];
    activatedPowerplantsCallback: (powerplants: ActivationTableDataRow[]) => void;
}

const columns: Column<ActivationTableDataRow>[] = [
    {
        Header: 'Power plant',
        accessor: 'powerplant',
    },
    {
        Header: 'Provider',
        accessor: 'provider',
    },
    {
        Header: 'Direction',
        Cell: props => (
            <span>
                        {props.row.original.isUp && <PowerUpIcon/>}
                {props.row.original.isDown && <PowerDownIcon/>}
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
                        isDown: activation.type === "down",
                        rdRequirementId: activation.rdRequirementId,
                        provider: powerPlantData[activation.powerplant]["Anschlussnetzbetreiber"]
                    }];
                }
            }
        });

        return _.sortBy(result, "provider");
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
        props.activatedPowerplantsCallback(data);
    }, [data, props.activatedPowerplantsCallback]);

    return (
        <div className="activation-table-wrapper">
            <h4>Redispatch activations</h4>
            <table className="activation-table" {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup, idx) => {
                    return (
                        <tr {...headerGroup.getHeaderGroupProps()} className={`header-grp-level-${idx}`}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    );
                })}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}
                            className={props.selectedRDIds?.includes(row.original.rdRequirementId) ? 'highlighted' : ''}>
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