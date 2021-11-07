import * as React from "react";

import "./RedispatchesAndActivations.scss";
import {RDRequirementsTable} from "./RDRequirementsTable";
import {ActivationTable, ActivationTableDataRow} from "./ActivationTable";

export interface RedispatchesAndActivationsProps {
    day: Date;
    activatedPowerplantsCallback: (powerplants: ActivationTableDataRow[]) => void;
}

export const RedispatchesAndActivations: React.FC<RedispatchesAndActivationsProps> = (props) => {
    const [selectedRdIds, setSelectedRdIds] = React.useState<number[]>([])
    return (
        <div className="rd-activations">
            <RDRequirementsTable day={props.day} onRdSelectionChange={setSelectedRdIds} />
            <ActivationTable day={props.day} selectedRDIds={selectedRdIds} activatedPowerplantsCallback={props.activatedPowerplantsCallback} />
        </div>
    );
};