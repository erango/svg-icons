import {parseString} from 'xml2js';

export function overrideFills(svgSource, color) {
    if(color === undefined || svgSource === undefined)
        return;

    let children = svgSource;
    if(children && 'g' in children) {
        let fill = children.g.fill;
        let attributes = children.$;
        if(fill && fill !== 'none')
            fill = color;
        if(attributes && attributes.fill !== undefined && attributes.fill !== 'none')
            attributes.fill = color;

        overrideFills(children.$$, color);
        overrideFills(children.g, color);
    }
    if(children && children.length) {
        for(let i=0; i<children.length; i++) {
            if(children[i].$.fill !== 'none')
                children[i].$.fill = color;
            overrideFills(children[i].$$, color);
        }
    }
}

export default function extractIcon(svgString, iconName, callback) {
    try {
        const name = iconName + '.svg';
        parseString(svgString[name].src, {explicitChildren: true}, callback);
    }
    catch(e) {
        callback(e, null);
    }
}
