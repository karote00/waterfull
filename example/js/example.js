'use strict';

var app = angular.module( 'app', ['ui.Waterfull'] );

app.controller( 'ctrl', [ '$scope', '$timeout', function( $scope, $timeout ) {
  var count = Math.floor(( Math.random() * 50 ) + 10 );
  $scope.items = [];

  for( var i = 0; i < count; i++ ) {
    var bgc = 'rgba(' + getRandom( 255, 0 ) + ', ' + getRandom( 255, 0 ) + ', ' + getRandom( 255, 0 ) + ', ' + getRandom( 100, 0 ) / 100 + ')';
    var h = getRandom( 100, 10 );
    
    $scope.items.push( { 
      count: i, 
      type: 'template/flow-item.html', 
      data: { bgc: bgc, h: h }
    });
  }

  function getRandom( range, init ) {
    if( typeof init == 'undefined' ) init = 1;
    return Math.floor(( Math.random() * range ) + init );
  }
}]);