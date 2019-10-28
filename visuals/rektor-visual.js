function RektorVisual(obj, svgContainer) {
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

RektorVisual.prototype = Object.create(Visual.prototype);
RektorVisual.prototype.constructor = RektorVisual;

RektorVisual.prototype.draw = function() {
    let that = this
    let group =this.svgContainer.append('g').call(d3.drag()
                                                .on("drag", dragged))
                                                .on("mouseover", function() {that.handleMouseOver(group, '#x_button')})
                                                .on("mouseout", function() {that.handleMouseOut(group, '#x_button')});
    let rect = group.append("rect")
                    .attr("x", this.AbsoluteLocation.X)
                    .attr("y", this.AbsoluteLocation.Y)
                    .attr("width", this.AbsoluteSize.Width)
                    .attr("height", this.AbsoluteSize.Height)
                    .attr('fill', 'lightgray')
                    .attr('stroke', 'black')
                    .attr('stroke-width', 1)
                                
    let rectGroupLeft = group.append('g').attr('class', 'rects_left')
    let rectGroupRight = group.append('g').attr('class', 'rects_right')
    
    drawRects(this.LightElementsLeft, this.DistanceToLightLeft, rectGroupLeft)
    drawRects(this.LightElementsRight, this.AbsoluteSize.Width -  this.DistanceToLightRight, rectGroupRight)

    let leftRects = rectGroupLeft.select('rect')
    let rightRects = rectGroupRight.select('rect')

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
        let a = that.AbsoluteSize.Height / 2 
        let leftPoint = that.LightElementsLeft === 0 ? that.AbsoluteLocation.X : +d3.select(leftRects._groups[leftRects._groups.length - 1][0]).attr('x')  + a/2
        let rightPoint = that.LightElementsRight === 0 ? that.AbsoluteLocation.X + that.AbsoluteSize.Width : +d3.select(rightRects._groups[0][0]).attr('x')  - a/2

        let text = group.append('text')
                    .attr('x', (rightPoint + leftPoint) / 2)
                    .attr('y', that.AbsoluteLocation.Y + that.AbsoluteSize.Height / 2 + 5)
                    .attr('fill', 'black')
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "20px")
                    .text(that.Text)
    
        text.attr('x', text.attr('x') - text.node().getComputedTextLength() /2)
    }

    function drawRects(elementsNum, distanceToLight, group) {
        for (let i = 0; i < elementsNum; i++) {
            let x = that.AbsoluteLocation.X + distanceToLight - that.AbsoluteSize.Height / 4
            let y = that.AbsoluteLocation.Y + that.AbsoluteSize.Height/4
            let a = that.AbsoluteSize.Height/2
            let padding =  10*i + i*a
            let translation =  a/2 * (elementsNum-1) + (5 * (elementsNum - 1))

            let rect = group.append('rect')
                                .attr('x', x + padding - translation)
                                .attr('y', y)
                                .attr('width',  a)
                                .attr('height',  a)
                                .style("fill", 'white')
                                .attr('stroke', 'black')
                                .attr('stroke-width', 1);
        }
        
        let addButton = group.append("text")
                .attr('class', 'add_rect_button')
                .attr('x', that.AbsoluteLocation.X + distanceToLight)
                .attr('y', +that.AbsoluteLocation.Y + that.AbsoluteSize.Height/2)
                .attr('fill', 'green')
                .attr("font-family", "sans-serif")
                .attr("font-size", 25 + "px")
                .text('+')
                .style('cursor', 'pointer')
                .on('click', function() {
                    let newData = JSON.parse(JSON.stringify(that))
                    group.attr('class') === 'rects_left' ? newData.LightElementsLeft++ :newData.LightElementsRight++;
                    outGroup.remove();
                    new RektorVisual(newData, that.svgContainer).draw()
                })
                .style("opacity", 0);
        addButton.attr('x', addButton.attr('x') - addButton.node().getComputedTextLength() /2)

        let xRectButton = group.append("text")
                .attr('class', 'x_rect_button')
                .attr('x', that.AbsoluteLocation.X + distanceToLight)
                .attr('y', +that.AbsoluteLocation.Y + that.AbsoluteSize.Height/2 + 25/2)
                .attr('fill', 'red')
                .attr("font-family", "sans-serif")
                .attr("font-size", 20 + "px")
                .text('x')
                .style('cursor', 'pointer')
                .on('click', function() {
                    let newData = JSON.parse(JSON.stringify(that))
                    elementsNum !== 0 ? group.attr('class') === 'rects_left' ? newData.LightElementsLeft-- :newData.LightElementsRight-- : null;
                    outGroup.remove();
                    new RektorVisual(newData, that.svgContainer).draw()
                })
                .style("opacity", 0);
        xRectButton.attr('x', xRectButton.attr('x') - xRectButton.node().getComputedTextLength() /2)

        group.call(d3.drag()
                .on("drag", draggedRects))
                .on("mouseover", function() {handleMouseOverRects(group)})
                .on("mouseout", function() {handleMouseOutRects(group)})
    }

      function dragged() {
        d3.select(this).selectAll("*")
           .attr("x",  function() { return +d3.select(this).attr('x') + d3.event.dx;} )
        let rects = d3.select(this).selectAll('g')
        rects.selectAll("rect")
                .attr("cx",  function() { return +d3.select(this).attr('cx') + d3.event.dx;} )
      }

      function draggedRects() {
        d3.select(this).selectAll("text")
            .attr("x",  function() { return +d3.select(this).attr('x') + d3.event.dx;} )
        d3.select(this).selectAll("rect")
                .attr("cx",  function() { return +d3.select(this).attr('cx') + d3.event.dx;} )
      }

    function handleMouseOverRects(group) {  
        group.select('.add_rect_button').style("opacity", 0.8);
        group.select('.x_rect_button').style("opacity", 0.8);

    }

    function handleMouseOutRects(group) {
        group.select('.add_rect_button').style("opacity", 0);
        group.select('.x_rect_button').style("opacity", 0);

    }
}