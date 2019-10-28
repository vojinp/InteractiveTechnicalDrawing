function LegendVisual(obj, svgContainer) {
    this.Label = obj.Label
    this.Description = obj.Description
    Visual.call(this, obj, svgContainer)
}

LegendVisual.prototype = Object.create(Visual.prototype);
LegendVisual.prototype.constructor = LegendVisual;

LegendVisual.prototype.draw = function() {
    let group = this.svgContainer.append('g')

    let label = group.append('text')
                    .attr('x', this.AbsoluteLocation.X)
                    .attr('y', this.AbsoluteLocation.Y)
                    .attr('fill', 'orange')
                    .attr("font-family", "sans-serif")
                    .attr("font-size", this.AbsoluteSize.Height / 2 + "px")
                    .text(this.Label + ': ')

    let text = group.append('text')
                    .attr('x', this.AbsoluteLocation.X + label.node().getComputedTextLength() + 10)
                    .attr('y', this.AbsoluteLocation.Y)
                    .attr('fill', 'black')
                    .attr("font-family", "sans-serif")
                    .attr("font-size", this.AbsoluteSize.Height / 2 + "px")
                    .text(this.Description)
}