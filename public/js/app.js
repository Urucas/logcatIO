var socket = io(document.location.href);

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

  $scope.clear = function() {
    if(confirm("Are you sure you want to remove the logs?")) {
      $scope.filter = {}
      $scope.logs = []
    }
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

