function ModuleVisual(obj, svgContainer) {
    this.PositionInFragment = obj.PositionInFragment
    this.TotalLength = obj.TotalLength
    this.LightElementsLeft = obj.LightElementsLeft
    this.DistanceToLightLeft = obj.DistanceToLightLeft
    this.LightElementsRight = obj.LightElementsRight
    this.DistanceToLightRight = obj.DistanceToLightRight
    this.ModuleType = obj.ModuleType
    this.IsContinuous = obj.IsContinuous
    this.Text = obj.Text
    Visual.call(this, obj, svgContainer)
}

ModuleVisual.prototype = Object.create(Visual.prototype);
ModuleVisual.prototype.constructor = ModuleVisual;

ModuleVisual.prototype.draw = function() {
    let that = this
    let group = this.svgContainer.append('g').call(d3.drag()
                                                .on("drag", this.dragged))
                                                .on("mouseover", function() {that.handleMouseOver(group, '#x_button')})
                                                .on("mouseout", function() {that.handleMouseOut(group, '#x_button')});
    let rect = group.append("rect")
                    .attr('class', 'frame')
                    .attr("x", this.AbsoluteLocation.X)
                    .attr("y", this.AbsoluteLocation.Y)
                    .attr("width", this.AbsoluteSize.Width)
                    .attr("height", this.AbsoluteSize.Height)
                    .attr('fill', 'lightgray')
                    .attr('stroke', 'black')
                    .attr('stroke-width', 1)

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
                                
    let lightGroupLeft = group.append('g').attr('class', 'lights_left')
    let lightGroupRight = group.append('g').attr('class', 'lights_right')
    
    drawLights(this.LightElementsLeft, this.DistanceToLightLeft, lightGroupLeft)
    drawLights(this.LightElementsRight, this.AbsoluteSize.Width -  this.DistanceToLightRight, lightGroupRight)

    let leftLights = lightGroupLeft.select('.light')
    let rightLights = lightGroupRight.select('.light')

    drawText()
    let outArguments = arguments;
    let outGroup = group;

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


    function drawText() {
        let r = that.AbsoluteSize.Height / 2 - 10
        let leftPoint = that.LightElementsLeft === 0 ? that.AbsoluteLocation.X : +d3.select(leftLights._groups[leftLights._groups.length - 1][0]).attr('cx')  + r
        let rightPoint = that.LightElementsRight === 0 ? that.AbsoluteLocation.X + that.AbsoluteSize.Width : +d3.select(rightLights._groups[0][0]).attr('cx')  - r

        let text = group.append('text')
                    .attr('x', (rightPoint + leftPoint) / 2)
                    .attr('y', that.AbsoluteLocation.Y + that.AbsoluteSize.Height / 2 + 5)
                    .attr('fill', 'black')
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "20px")
                    .text(that.Text)
    
        text.attr('x', text.attr('x') - text.node().getComputedTextLength() /2)
    }

    function drawLights(elementsNum, distanceToLight, group) {
        var drawElement = elementDrawer()
        for (let i = 0; i < elementsNum; i++) {
            drawElement(i)
        }

        let addButton = group.append("text")
                .attr('class', 'add_light_button')
                .attr('x', that.AbsoluteLocation.X + distanceToLight)
                .attr('y', +that.AbsoluteLocation.Y + that.AbsoluteSize.Height/2)
                .attr('fill', 'green')
                .attr("font-family", "sans-serif")
                .attr("font-size", 25 + "px")
                .text('+')
                .style('cursor', 'pointer')
                .on('click', function() {
                    let newData = JSON.parse(JSON.stringify(that))
                    group.attr('class') === 'lights_left' ? newData.LightElementsLeft++ :newData.LightElementsRight++;
                    outGroup.remove();
                    new ModuleVisual(newData, that.svgContainer).draw()
                })
                .style("opacity", 0);
        addButton.attr('x', addButton.attr('x') - addButton.node().getComputedTextLength() /2)

        let xLightButton = group.append("text")
                .attr('class', 'x_light_button')
                .attr('x', that.AbsoluteLocation.X + distanceToLight)
                .attr('y', +that.AbsoluteLocation.Y + that.AbsoluteSize.Height/2 + 25/2)
                .attr('fill', 'red')
                .attr("font-family", "sans-serif")
                .attr("font-size", 20 + "px")
                .text('x')
                .style('cursor', 'pointer')
                .on('click', function() {
                    let newData = JSON.parse(JSON.stringify(that))
                    elementsNum !== 0 ? group.attr('class') === 'lights_left' ? newData.LightElementsLeft-- :newData.LightElementsRight-- : null;
                    outGroup.remove();
                    new ModuleVisual(newData, that.svgContainer).draw()
                })
                .style("opacity", 0);
        xLightButton.attr('x', xLightButton.attr('x') - xLightButton.node().getComputedTextLength() /2)

        group.call(d3.drag()
            .on("drag", that.dragged))
            .on("mouseover", function() {that.handleMouseOver(group, '.add_light_button,.x_light_button')})
            .on("mouseout", function() {that.handleMouseOut(group, '.add_light_button,.x_light_button')})
        
        function elementDrawer() {
            let x = that.AbsoluteLocation.X + distanceToLight - that.AbsoluteSize.Height / 4
            let y = that.AbsoluteLocation.Y + that.AbsoluteSize.Height/4
            let a = that.AbsoluteSize.Height/2
            let cx = that.AbsoluteLocation.X + distanceToLight
            let cy = that.AbsoluteLocation.Y + that.AbsoluteSize.Height / 2
            let r = that.AbsoluteSize.Height / 2 - 10
            let padding, translation;
    
            return function drawElement(i) {
                switch(that.ModuleType) {
                    case 3:
                        padding =  10*i + i*a
                        translation =  a/2 * (elementsNum-1) + (5 * (elementsNum - 1))
                        group.append('rect')
                            .attr('class', 'light')
                            .attr('x', x + padding - translation)
                            .attr("cx", cx + padding - translation)
                            .attr('y', y)
                            .attr('width',  a)
                            .attr('height',  a)
                            .style("fill", 'white')
                            .attr('stroke', 'black')
                            .attr('stroke-width', 1);
                        break;
                    case 4:
                        padding = elementsNum === 1 ? 0 : 10*i + i*2*r
                        translation = elementsNum === 1 ? 0 : r * (elementsNum-1) + (5 * (elementsNum - 1))
                        group.append('circle')
                            .attr('class', 'light')
                            .attr("cx", cx + padding - translation)
                            .attr("cy", cy)
                            .attr("r", r)
                            .style("fill", 'white')
                            .attr('stroke', 'black')
                            .attr('stroke-width', 1);
                        break;
                    default:
                        break;
                }
            }
        }
    }
}

// ModuleVisual.prototype.draggedLights = function() {
//     d3.select(this).selectAll("*")
//         .attr("x",  function() { return +d3.select(this).attr('x') + d3.event.dx;} )
//     d3.select(this).selectAll("circle")
//             .attr("cx",  function() { return +d3.select(this).attr('cx') + d3.event.dx;} )
// }
