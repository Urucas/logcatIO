var socket = io("http://localhost:5000");

angular.module("LogcatIOApp", [])

.controller("EmitterController", ["$scope", function($scope) {
  $scope.logs = []
  $scope.filter = {}

  $scope.shouldBeShown = function(log) {
    var field = $scope.filter["field"] || false
    if(!field) return true
    var q = $scope.filter["q"] || false
    if(!q) return true
    return log[field].indexOf(q) != -1 ? true : false
  }

  socket.on("greetings", function(card) {
    card["action"] = "connected"
    card["log"] = ""
    $scope.$apply(function(){
      $scope.logs.push(card)
    })
  })

  socket.on("dump", function(log) {
    log["action"] = "log"
    $scope.$apply(function(){
      $scope.logs.push(log)
    })
  })

  socket.on("goodbye", function(card) {
    card["action"] = "disconnect"
    card["log"] = ""
    $scope.$apply(function() {
      $scope.logs.push(card)
    })
  })
}])

