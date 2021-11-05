import * as React from "react";
import {Column, useTable} from "react-table";
import dayjs from "dayjs";

import "./RDRequirementsTable.scss";
import {PowerDownIcon, PowerUpIcon} from "../components/icons";
import {redispatchData} from "./redispatchData";

export interface RDRequirementsTableProps {
    day: Date;
    onRdSelectionChange: (rdIds: number[]) => void;
}

interface RDRequirementTableDataRow {
    id: number;
    resource: string;
    name: string;
    direction: "up" | "down";
}

const columns: Column<RDRequirementTableDataRow>[] = [
    {
        Header: 'Resource',
        accessor: 'resource',
    },
    {
        Header: 'Provider',
        accessor: 'name',
    },
    {
        Header: 'Direction',
        Cell: props => (
            <span>
                {props.row.original.direction === 'up' ? <PowerUpIcon/> : <PowerDownIcon/>}
            </span>
        )
    }
];

const collectRedispatchRequirements = (day: Date): RDRequirementTableDataRow[] => {
    const currentDayString = dayjs(day).format("YYYY-MM-DD");

    return redispatchData
        .filter((rdData) => rdData.date === currentDayString)
        .sort((a, b) => a.rdid - b.rdid)
        .sort((a, b) => a.resourceObject.localeCompare(b.resourceObject))
        .map((rd) => ({id: rd.rdid, direction: rd.direction, resource: rd.resourceObject, name: rd.nbName}));
};

export const RDRequirementsTable: React.FC<RDRequirementsTableProps> = (props) => {
    const data = React.useMemo<RDRequirementTableDataRow[]>(() => {
        return collectRedispatchRequirements(props.day);
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

    return (
        <div className="rd-requirements-table-wrapper">
            <h4>Redispatch requirements</h4>
            <table className="rd-requirements-table" {...getTableProps()}>
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
                        <tr {...row.getRowProps()} onMouseEnter={() => props.onRdSelectionChange([row.original.id])} onMouseLeave={() => props.onRdSelectionChange([])}>
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