import * as React from "react";

import "./Icons.scss";
import {SVG} from "../SVG";


export interface IconProps {
    className?: string;
}

export const PowerUpIcon: React.FC<IconProps> = (props) =>
    (<SVG name="arrow-top-right-bold-outline" className={`power-up-icon ${props.className ? props.className : ''}`}/>);

export const PowerDownIcon: React.FC<IconProps> = (props) =>
    (<SVG name="arrow-down-right-bold-outline" className={`power-down-icon ${props.className ? props.className : ''}`}/>);