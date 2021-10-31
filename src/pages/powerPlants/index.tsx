import * as React from "react"
import * as ReactDOM from "react-dom"

import {PowerPlants} from "./PowerPlants";

document.getElementById("title").innerText = "Power Plants";

ReactDOM.render(<PowerPlants width={window.innerWidth} height={window.innerHeight}/>, document.getElementById("container"));
