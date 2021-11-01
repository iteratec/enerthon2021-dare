import * as React from "react"
import * as ReactDOM from "react-dom"

import {MapView} from "./MapView";

document.getElementById("title").innerText = "Map View";

ReactDOM.render(<MapView/>, document.getElementById("map"));
