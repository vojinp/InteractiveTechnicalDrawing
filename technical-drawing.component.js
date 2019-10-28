// Register `phoneList` component, along with its associated controller and template
angular.
  module('phonecatApp', []).controller("MainController",  function($scope){
    $scope.item = 2
  }).
  controller('technicalDrawing', function($scope) {
        $scope.data = data
        
        $scope.counter = 0
        $scope.$watch('data', function(newVal, oldVal){
            $scope.counter++
            if ($scope.counter === 1)
                return
            rerenderData()
            $scope.counter++
        }, true);

        $scope.changeData = function() {
            $scope.data.AbsoluteSize.Width = 100
        }
        
        renderData()

        function rerenderData() {
            d3.select('svg').remove();
            renderData()
        }

        function renderData() {
            $scope.svgContainer  = d3.select("body").append("svg")
                                            .attr("width", $scope.data.AbsoluteSize.Width)
                                            .attr("height", $scope.data.AbsoluteSize.Height)
                                            .attr("x", $scope.data.AbsoluteLocation.X)
                                            .attr("y", $scope.data.AbsoluteLocation.Y)
                                            .attr('padding', 20);
            let svg = $scope.svgContainer
            for (let visual of $scope.data.Children) {
                switch(visual.Type) {
                    case C.MeasurementVisual:
                        new MeasurementVisual(visual, svg).draw()
                        break;
                    case C.ProfileVisual:
                        new ProfileVisual(visual, svg).draw()
                        break;
                    case C.ModuleVisual:
                        new ModuleVisual(visual, svg).draw()
                        break;
                    case C.LegendVisual:
                        new LegendVisual(visual, svg).draw()
                        break;
                    case C.BitmapVisual:
                        new BitmapVisual(visual, svg).draw()
                        break;
                    case C.LedLineVisual:
                        new LedLineVisual(visual, svg).draw()
                        break;
                    case C.RektorVisual:
                        new RektorVisual(visual, svg).draw()
                        break;
                    default:
                        break;
                }
            }
            new LedLineVisual({
                "Text": "Led line (1x)",
                "AbsoluteLocation": {
                  "X": 20.0,
                  "Y": 195.0
                },
                "AbsoluteSize": {
                  "Width": 200.0,
                  "Height": 48.0
                },
                "Type": "ModuleVisual"
              }, $scope.svgContainer).draw()

            new ModuleVisual({
                "PositionInFragment": 323.0,
                "TotalLength": 400.0,
                "LightElementsLeft": 0,
                "DistanceToLightLeft": 0.0,
                "LightElementsRight": 1,
                "DistanceToLightRight": 100.0,
                "ModuleType": 3,
                "IsContinuous": false,
                "Text": "Rektor (1x)",
                "AbsoluteLocation": {
                  "X": 750.0,
                  "Y": 180.0
                },
                "AbsoluteSize": {
                  "Width": 400.0,
                  "Height": 78.0
                },
                "Type": "ModuleVisual"
              }, svg).draw()
        }
    });