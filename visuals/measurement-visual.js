function MeasurementVisual(obj, svgContainer) {
    this.Number = obj.Number
    this.Label = obj.Label
    this.ShowWarning = obj.ShowWarning
    this.Unit = obj.Unit
    this.Name = obj.Name
    Visual.call(this, obj, svgContainer)
}


MeasurementVisual.prototype = Object.create(Visual.prototype);
MeasurementVisual.prototype.constructor = MeasurementVisual;

MeasurementVisual.prototype.draw = function() {
    let group = this.svgContainer.append('g')
    let that = this

    let label = group.append('text')
                    .attr('x', this.AbsoluteLocation.X + this.AbsoluteSize.Width / 2)
                    .attr('y', this.AbsoluteLocation.Y + this.AbsoluteSize.Height * 3/4)
                    .attr('fill', 'orange')
                    .attr("font-family", "sans-serif")
                    .attr("font-size", this.AbsoluteSize.Height / 3 + "px")
                    .text(this.Label + ': ')

    let text = group.append('text')
                    .attr('x', this.AbsoluteLocation.X + this.AbsoluteSize.Width / 2)
                    .attr('y', this.AbsoluteLocation.Y + this.AbsoluteSize.Height  * 3/4)
                    .attr('fill', 'black')
                    .attr("font-family", "sans-serif")
                    .attr("font-size", this.AbsoluteSize.Height / 3 + "px")
                    .text(this.Number + this.Unit.toLowerCase())
                    .style('cursor', 'pointer')
                    .call(makeEditable, this.Id, this.Unit.toLowerCase());

    label.attr('x', label.attr('x') - text.node().getComputedTextLength() /2 - label.node().getComputedTextLength() /2)
    text.attr('x', text.attr('x') - text.node().getComputedTextLength() /2 + label.node().getComputedTextLength() /2 + 10)

    let line = group.append("line")
                    .attr("x1", this.AbsoluteLocation.X)
                    .attr("y1", this.AbsoluteLocation.Y + this.AbsoluteSize.Height)
                    .attr("x2", this.AbsoluteLocation.X + this.AbsoluteSize.Width)
                    .attr("y2", this.AbsoluteLocation.Y + this.AbsoluteSize.Height)
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");

    let leftMiniLine = group.append("line")
                            .attr("x1", this.AbsoluteLocation.X)
                            .attr("y1", this.AbsoluteLocation.Y + this.AbsoluteSize.Height - 5)
                            .attr("x2", this.AbsoluteLocation.X)
                            .attr("y2", this.AbsoluteLocation.Y + this.AbsoluteSize.Height + 5)
                            .attr("stroke-width", 2)
                            .attr("stroke", "black");

    let rightMiniLine = group.append("line")
                            .attr("x1", this.AbsoluteLocation.X + this.AbsoluteSize.Width)
                            .attr("y1", this.AbsoluteLocation.Y + this.AbsoluteSize.Height - 5)
                            .attr("x2", this.AbsoluteLocation.X + this.AbsoluteSize.Width)
                            .attr("y2", this.AbsoluteLocation.Y + this.AbsoluteSize.Height + 5)
                            .attr("stroke-width", 2)
                            .attr("stroke", "black");

    function makeEditable(d, id, unit)
    {
        d.on("mouseover", function() {
            d3.select(this).style("fill", "red");
        })
        .on("mouseout", function() {
            d3.select(this).style("fill", null);
        })
        .on("click", function(d) {
            console.log(this)
            d = this;
            var xy = this.getBBox();
            var el = d3.select(this);
            var p_el = d3.select(this.parentNode);
    
            var inp = p_el.append("foreignObject")
                .attr("x", xy.x)
                .attr("y", xy.y)
                .attr("width", 200)
                .attr("height", 25)
                .append("xhtml:form")
                    .append("input")
                        .attr("value", function() {
                            let that = this
                            if (this.setSelectionRange) {
                                setTimeout(function() {
                                    that.setSelectionRange(d3.select(d).text().length, d3.select(d).text().length);
                                    that.focus();
                                }, 0);
                            }
                            return parseFloat(d3.select(d).text())
                        })
                        .attr("style", "width: 200px;")
                        .attr("style", "height: 30px;")
                        .attr("style", "font-family: sans-serif")
                        .attr("style", "font-size: " + that.AbsoluteSize.Height / 3 + "px")
                        .on("keydown", function() {
                            if (!d3.event)
                                d3.event = window.event;
                            var e = d3.event;
                            if (e.keyCode == 13) {
                                e.preventDefault();
                                var txt = inp.node().value;
                                console.log('Id: ' + id + ' number: ' + txt)
                                el.text(txt + unit)
                                p_el.select("foreignObject").remove();
                            }
                            else if (e.keyCode == 27) {
                                e.preventDefault();
                                p_el.select("foreignObject").remove();
                            } else if((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 91 || e.keyCode > 105) && e.keyCode !== 8) {
                                e.preventDefault()
                            }
                        });
        });
    }
}