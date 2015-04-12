
angular.module( 'ui.Waterfull', [] )
  .factory( 'getRandom', [ function() {
    function getRandom( range, init ) {
      if( typeof init == 'undefined' ) init = 1;
      return Math.floor(( Math.random() * range ) + init );
    }

    return getRandom;
  }])
  .directive( 'waterfull', [ function() {
    return {
      scope: {
        itemWidth: '@',
        column: '@',
        maxColumn: '@',
        data: '='
      },
      controller: function( $scope, $element, $window, $timeout ) {
        $scope.iw = '20%';
        $scope.items = $scope.data;
        $scope.columns = [];

        var columns = $element.children()[0].children;
        var c = 0;

        $scope.onResizeFunction = function() {
          var totalWidth = $element[0].childNodes[0].clientWidth - 42;
          var mw = 100;
    
          if( typeof $scope.column != 'undefined' ) {
            $scope.cl = $scope.column;
            $scope.iw = (( totalWidth - $scope.cl * 20 ) / $scope.cl ) / ( totalWidth / 100 ) + '%';
          } else {
            if( $scope.itemWidth.indexOf('%') > -1 ) {
              var columnCount = Math.floor( 100 / parseFloat( $scope.itemWidth.substr( 0, $scope.itemWidth.indexOf('%'))));
              var singleColumnWidth = ( totalWidth - columnCount * 20 ) / columnCount;
              $scope.iw = singleColumnWidth / ( totalWidth / 100 ) + '%';
              $scope.cl = columnCount;
            } else if( $scope.itemWidth.indexOf('px') > -1 ) {
              $scope.iw = $scope.itemWidth;
              $scope.cl = Math.floor( totalWidth / ( parseFloat( $scope.itemWidth ) + 20 ));
              if( $scope.cl > $scope.maxColumn ) $scope.cl = $scope.maxColumn;
              mw = parseFloat( $scope.itemWidth.substr( 0, $scope.itemWidth.indexOf('px')));
            }
          }

          $scope.iw = minWidth( $scope.iw, totalWidth );
          $scope.mw = ( $scope.cl * ( mw + 20 )) + 44 + 'px';
        }

        $scope.onResizeFunction();

        for( var i = 0; i < $scope.cl; i++ ) {
          $scope.columns.push([]);
        }

        angular.element( $window ).bind( 'resize', function() {
          $scope.onResizeFunction();
          $scope.$apply();
        });

        function minWidth( w, tw ) {
          var sw = 100;
          if( w.indexOf( '%' ) > -1 ) {
            if(( parseFloat( w.substr( 0, w.indexOf('%'))) / 100 ) * tw < sw ) 
              return (100 * sw) / tw + '%';
          }
          return w;
        }

        addItem();

        function addItem() {
          c++;
          if( c > $scope.items.length ) return;
          return checkHeight().then( function() {
            addItem();
          });
        }

        function checkHeight() {
          return $timeout( function() {
            var m = 0;
            var M = 0;
            for( var i = 1; i < columns.length; i++ ) {
              if( columns[i].clientHeight < columns[m].clientHeight ) {
                m = i;
              }
              if( columns[i].clientHeight > columns[M].clientHeight ) {
                M = i;
              }
            }

            if(( columns[M].clientHeight - columns[m].clientHeight ) <= 40 ) {
              m = 0;
            }

            $scope.columns[m].push( $scope.items[c - 1] );
          }, 500);
        }
      },
      template: '<div class="waterfull-container" ng-style="{\'min-width\': mw}">'
              +   '<div ng-repeat="c in columns" ng-style="{width: iw}" class="waterfull-column">'
              +     '<waterfull-column data="c"></waterfull-column>'
              +   '</div>'
              + '</div'
    }
  }])
  .directive( 'waterfullColumn', function() {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      controller: function( $scope, $element ) {
        $scope.items = $scope.data;
      },
      replace: true,
      template: '<div ng-repeat="item in items track by $index" class="item-container"><flow-item type="item.type" data="item.data"></flow-item></div>'
    }
  })
  .directive( 'flowItem', [ function() {
    return {
      scope: {
        index: '@',
        type: '=',
        data: '='
      },
      controller: function( $scope, $timeout, getRandom ) {
        $timeout( function() {
          for( var d in $scope.data ) {
            $scope[d] = $scope.data[d];
          }
        }, $scope.index * 500 );

        $scope.getTemplateUrl = function() {
          return $scope.type;
        }
      },
      template: '<div ng-include="getTemplateUrl()" class="template-container"></div>',
      replace: true
    }
  }]);