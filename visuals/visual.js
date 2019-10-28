function Visual(obj, svgContainer) {
    this.AbsoluteLocation = obj.AbsoluteLocation
    this.AbsoluteSize = obj.AbsoluteSize
	this.Type = obj.Type
	this.Id = obj.Id
	this.svgContainer = svgContainer
}

Visual.prototype.draw = function() {
}

Visual.prototype.handleMouseOver = function(group, selector) {  
	group.selectAll(selector).style("opacity", 0.8);

}

Visual.prototype.handleMouseOut = function(group, selector) {
	group.selectAll(selector).style("opacity", 0);

}

Visual.prototype.dragged = function() {
	// let lastPos = +d3.select(this).select('.frame').attr('x') + +d3.select(this).select('.frame').attr('width') + d3.event.dx
	// let firstPos = +d3.select(this).select('.frame').attr('x') + d3.event.dx

	// if (firstPos > 0 && lastPos < 1250) {
		d3.select(this).selectAll("*")
			.attr("x",  function() { return +d3.select(this).attr('x') + d3.event.dx;} )
		d3.select(this).selectAll("circle")
			.attr("cx",  function() { return +d3.select(this).attr('cx') + d3.event.dx;} )
	// }

}

Visual.prototype.resize = function() {
	d3.select(this).attr("x",  function() { return +d3.select(this).attr('x') + d3.event.dx;} )
	if (d3.select(this).attr('id') === 'left-resize-rect') {
		d3.select(this.parentNode).selectAll(".frame")
			.attr("x",  function() { return +d3.select(this).attr('x') + d3.event.dx;} )
		d3.select(this.parentNode).selectAll(".frame")
			.attr("width",  function() { return +d3.select(this).attr('width') - d3.event.dx;} )
	} else {
		d3.select(this.parentNode).selectAll(".frame")
			.attr("width",  function() { return +d3.select(this).attr('width') + d3.event.dx;} )
	}
}