# waterfull
A dynamic waterfull container boilerplate using AngulaJs 1.3.x

## example
[example](http://plnkr.co/edit/psGtgDMKztoLJYDktDEQ?p=preview)

## Attributes
### column
Set a number to column attribute, or the default is 5.
If you set this attribute, item-width will be ignore.

### item-width
You have four ways to set item-width

1. Not setting item-width attribute to waterfull, the default is 20%.

2. Set percentage.  e.q. 20%

3. Set pixel.  e.q. 120px

4. Set only number. It'll return pixel.  e.q. 120

The min-width is 100px. 

No matter what you set, we'll compare and recalculate it.

### max-cloumn
If your window is wide enough and you don't want too much columns, give this attribute a number.

### data
In your data collections, every item has one required attribute and one optional attribute.

#required: type. Item's template reference url, so every item could use different template.

#optional: data. Anything you want to bind to your template, or you can create a new directive in your js file to control it yourself. 

*NECESSARY: 'data' doesn't support function and callback.
```javascript
{
  type: (this item's template reference url), /** required */
  data: {
    (anything you want to bind to your template) /** optional */
  }
}
```

example
```javascript
for( var i = 0; i < count; i++ ) {
  var bgc = 'rgba(' + getRandom( 255, 0 ) + ', ' + getRandom( 255, 0 ) + ', ' + getRandom( 255, 0 ) + ', ' + getRandom( 100, 0 ) / 100 + ')';
  var h = getRandom( 100, 10 ) + 'px';

  $scope.items.push({
    type: 'template/flow-item.html', 
    data: { bgc: bgc, h: h }
  });
}

function getRandom( range, init ) {
  if( typeof init == 'undefined' ) init = 1;
  return Math.floor(( Math.random() * range ) + init );
}
```
In html
```html
<waterfull data="items" item-width="120px" max-column="5"></waterfull>
```
