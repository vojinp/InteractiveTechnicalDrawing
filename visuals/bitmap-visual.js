function BitmapVisual(obj, svgContainer) {
    this.SourceUrl = obj.SourceUrl
    this.BitmapSize = obj.BitmapSize
    this.Name = obj.Name
    Visual.call(this, obj, svgContainer)
}

BitmapVisual.prototype = Object.create(Visual.prototype);
BitmapVisual.prototype.constructor = BitmapVisual;

BitmapVisual.prototype.draw = function() {
    this.svgContainer.append("svg:image")
                .attr('x', this.AbsoluteLocation.X)
                .attr('y', this.AbsoluteLocation.Y)
                .attr('width', this.AbsoluteSize.Width)
                .attr('height', this.AbsoluteSize.Height)
                .attr("xlink:href", this.SourceUrl)
}