import React from 'react';
import PropTypes from 'prop-types';
import extractIcon from './svgRebuilder';

import svg from 'dir-loader!./icon.config.js';

const DEFAULT_DIMENSIONS = {height: 40, width: 40};

class Icon extends React.Component{
    constructor(props) {
        super(props);
        this.iconName = null;
        this.buildSvg = this.buildSvg.bind(this);
    }

    buildSvg(error, result) {
        if(error) {
            this.state = {svgElement: <div style={{height: this.props.height || DEFAULT_DIMENSIONS.height, width: this.props.width || DEFAULT_DIMENSIONS.width}} />};
            return;
        }

        let svgSrc = result.svg;
        const innerXml = svg[this.iconName + '.svg'];
        const finalXml = innerXml.src.match(/<svg[\s\S]*?>([\s\S]*?)<\/svg>/);
        const viewBox = svgSrc.$.viewBox;
        const coordinates = viewBox.split(' ');
        const height = coordinates[3] - coordinates[1];

        const el = <svg viewBox={viewBox} height={this.props.height || height} dangerouslySetInnerHTML={{__html: finalXml[1]}} />;
        this.setState({svgElement: el});
    }

    componentWillMount() {
        const {name, defaultName} = this.props;
        this.iconName = Object.keys(svg).includes(name + '.svg') ? name : defaultName;

        extractIcon(svg, this.iconName, this.buildSvg);
    }

    render() {
        const {svgElement} = this.state;
        const {defaultName, ...restOfProps} = this.props;

        return <svgElement.type {...svgElement.props} {...restOfProps}/>;
    }
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    defaultName: PropTypes.string, // Used in case there is no icon named 'name'
    style: PropTypes.object, // Used in case there is no icon named 'name'
    fill: PropTypes.string, // Used in case there is no icon named 'name'
    height: PropTypes.number,
    width: PropTypes.number,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default Icon;
