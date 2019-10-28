function ProfileVisual(obj, svgContainer) {
    this.ProfileLength = obj.ProfileLength
    this.ProfileWidth = obj.ProfileWidth
    this.FlangeLength = obj.FlangeLength
    this.FlangeLengthWithoutEndplate = obj.FlangeLengthWithoutEndplate
    Visual.call(this, obj, svgContainer)
}

ProfileVisual.prototype = Object.create(Visual.prototype);
ProfileVisual.prototype.constructor = ProfileVisual;

ProfileVisual.prototype.draw = function() {
    let that = this
    let group = this.svgContainer.append('g')
                                    .on("mouseover", function() {that.handleMouseOver(group, '#add_module_button')})
                                    .on("mouseout", function() {that.handleMouseOut(group, '#add_module_button')});

    let rect = group.append("rect")
                    .attr("x", this.AbsoluteLocation.X)
                    .attr("y", this.AbsoluteLocation.Y)
                    .attr("width", this.AbsoluteSize.Width)
                    .attr("height", this.AbsoluteSize.Height)
                    .attr('fill', 'darkgray')
                    .attr('stroke', 'black')
                    .attr('stroke-width', 1);

    let addButton = group.append("text")
            .attr('id', 'add_module_button')
            .attr('x', this.AbsoluteLocation.X + this.AbsoluteSize.Width - 40)
            .attr('y', +this.AbsoluteLocation.Y + this.AbsoluteSize.Height/2 + 20)
            .attr('fill', 'green')
            .attr("font-family", "sans-serif")
            .attr("font-size", 50 + "px")
            .text('+')
            .style('cursor', 'pointer')
            .on('click', function() {
                new ModuleVisual({
                    "PositionInFragment": 323.0,
                    "TotalLength": 400.0,
                    "LightElementsLeft": 0,
                    "DistanceToLightLeft": 0.0,
                    "LightElementsRight": 1,
                    "DistanceToLightRight": 100.0,
                    "ModuleType": 4,
                    "IsContinuous": false,
                    "Text": "Eyeball (1x)",
                    "AbsoluteLocation": {
                      "X": 0.0,
                      "Y": 180.0
                    },
                    "AbsoluteSize": {
                      "Width": 400.0,
                      "Height": 78.0
                    },
                    "Type": "ModuleVisual"
                  }, that.svgContainer).draw()
            })
            .style("opacity", 0);
}