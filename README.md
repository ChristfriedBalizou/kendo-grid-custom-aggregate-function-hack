# kendoGrid custom aggregate function [(Demo)](http://christfriedbalizou.github.io/kendo-grid-custom-aggregate-function-hack)

The kendo lib does not allow to inject your custom library. 
This script allow you to add your custom aggregation function
using [columns.groupFooterTemplate](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.groupFooterTemplate) option.

### Usage

* Import [jQuery](http://api.jquery.com/) lib
* Import [Kendo](http://www.telerik.com/kendo-ui) lib
* Import this script (kendo.aggregate.helper.js)

* You custom aggregation function will receive a list of data per group which is exactly what you need to aggregate yourself. Return the value/ string that should be display. *

#### Html
```
<!DOCTYPE html>
<html>
<head>
<!-- YOUR CSS HERE -->
</head>
<body>
...
<div id="#grid"></div>
...
<script><!-- jQuery here --></script>
<script><!-- kendo.all.min.js here --></script>
<script src="kendo.aggregate.helper.js"></script>
</body>
</html>
```

#### Javascript
```
function myAggregate(data){
// Data here is a list of data by group (brilliant right! :-) )
// Do anything here and return result string
}

var grid = $('#grid').kendoGrid({
...
columns: [
  { field: '', title: '', groupFooterTemplate: myAggregate
]
...
});
```

### Good to Know 

This git repo did not import *kendo library* because of license.
Please think about adding it yourself in your project before using it.

* AND BUY A LICENSE. (I LOVE KENDO  :-) ) *

### Todo

- ~~Use aggregation with multiple groupBy~~
- Test aggregation with inner details view
- Free memory variable after aggregation complete

