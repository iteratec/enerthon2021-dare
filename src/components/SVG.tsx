import React from "react";

export interface SVGProps {
    name: string;
    className?: string;
}
export const SVG: React.FC<SVGProps> = (props) => {
    const [svg, setSvg] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isErrored, setIsErrored] = React.useState(false);

    React.useEffect(() => {
        fetch(`img/${props.name}.svg`)
            .then(res => res.text())
            .then(setSvg)
            .catch(setIsErrored)
            .then(() => setIsLoaded(true))
    }, [props.name]);

    return (
        <div
            className={`svgInline svgInline--${isLoaded ? 'loaded' : 'loading'} ${isErrored ? 'svgInline--errored' : ''} ${props.name} ${props.className ? props.className : ''}`}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}