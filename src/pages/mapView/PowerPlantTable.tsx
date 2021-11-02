import * as React from 'react';

import "./powerPlantTable.scss";

interface PowerPlantTableProps {
    powerPlantData: {[key: string]: string}
}
export const PowerPlantTable = ({powerPlantData}: PowerPlantTableProps) => {

    return <div className="powerplant-table">
        {Object.keys(powerPlantData).map((attr, i) => <div key={i} className="powerplant-row">
            <div className="powerplant-row-header">{attr}:</div>
            <div className="powerplant-row-cell">{powerPlantData[attr]}</div>
        </div>)}
    </div>

}
