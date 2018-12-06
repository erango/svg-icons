# SVG-Icons

Package responsible for creating Icons component from all svg files used by the client.

The icons are used as followed:

    <Icon name="[icon_name]" {... aditional optional props}/>
    

Icon component receives the following props(as documented in demo section):

* name - Icons name will be the svg file name as saved in './assets'.
 
* className - CSS class name. Not all icons are the same, but generally changing the fill for a 'g' svgElement will do the trick.

* fill - Fill color. Accepts hex colors and html color names
 
* height - Icon height. Icon width will adjust proportionally.

* width - Icon width, if you feel the need to set it. Setting height only is better.
