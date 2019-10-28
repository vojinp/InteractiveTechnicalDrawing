function LedLineVisual(obj, svgContainer) {
    this.Text = obj.Text
    Visual.call(this, obj, svgContainer)
}

LedLineVisual.prototype = Object.create(Visual.prototype);
LedLineVisual.prototype.constructor = LedLineVisual;

LedLineVisual.prototype.draw = function() {
    let that = this
    let group = this.svgContainer.append('g')
        .on("mouseover", function() {that.handleMouseOver(group, '#x_button')})
        .on("mouseout", function() {that.handleMouseOut(group, '#x_button')});

    let rect = group.append("rect")
        .attr('class', 'frame')
        .attr("x", this.AbsoluteLocation.X)
        .attr("y", this.AbsoluteLocation.Y)
        .attr("width", this.AbsoluteSize.Width)
        .attr("height", this.AbsoluteSize.Height)
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);

    let resizeRectRight = group.append("rect")
        .attr('id', 'right-resize-rect')
        .attr('class', 'resize-rect')
        .attr("x", this.AbsoluteLocation.X + this.AbsoluteSize.Width - 2.5)
        .attr("y", this.AbsoluteLocation.Y)
        .attr("width", 5)
        .attr("height", this.AbsoluteSize.Height)
        .attr('fill', 'black')
        .attr('opacity', 0)
        .attr("cursor", "ew-resize")
        .call(d3.drag()
            .on("drag", this.resize ))

    let resizeRectLeft = group.append("rect")
        .attr('id', 'left-resize-rect')
        .attr('class', 'resize-rect')
        .attr("x", this.AbsoluteLocation.X - 2.5)
        .attr("y", this.AbsoluteLocation.Y)
        .attr("width", 5)
        .attr("height", this.AbsoluteSize.Height)
        .attr('fill', 'black')
        .attr('opacity', 0)
        .attr("cursor", "ew-resize")
        .call(d3.drag()
            .on("drag", this.resize))

    let text = group.append('text')
        .attr('x', this.AbsoluteLocation.X + this.AbsoluteSize.Width / 2)
        .attr('y', this.AbsoluteLocation.Y + this.AbsoluteSize.Height / 2 + 5)
        .attr('fill', 'black')
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .text(this.Text)

    text.attr('x', text.attr('x') - text.node().getComputedTextLength() /2)

    group.append("text")
        .attr('id', 'x_button')
        .attr('x', +rect.attr('x') + +rect.attr('width') - 25)
        .attr('y', +rect.attr('y') + 25)
        .attr('fill', 'red')
        .attr("font-family", "sans-serif")
        .attr("font-size", 25 + "px")
        .text('x')
        .style('cursor', 'pointer')
        .on('click', function() {group.remove()})
        .style("opacity", 0);

    group.call(d3.drag()
        .on("drag", this.dragged))
}