/**
 * Created by christfried Balizou on 05/01/16.
 */

(function(){
    'use strict';


    // Kendo data
    var data = [
        {firstName: "Peter", lastName: "Cook", age: 10},
        {firstName: "Janette", lastName: "Lucie", age: 11},
        {firstName: "Denver", lastName: "Jack", age: 23},
        {firstName: "Alex", lastName: "Cook", age: 26},
        {firstName: "Jennifer", lastName: "Cooper", age: 12},
        {firstName: "Rachel", lastName: "Pick", age: 33},
        {firstName: "Kevin", lastName: "Horse", age: 10},
        {firstName: "Travis", lastName: "Lincoln", age: 50},
        {firstName: "Vanessa", lastName: "Loose", age: 10},
        {firstName: "Stan", lastName: "Cooper", age: 25}
    ];

    // DOM element
    var $element = $('#grid');

    // Kendo config
    var config = {
        groupable: true,
        selectable: true,
        dataSource: {
            data: data
        },
        columns: [
            {field: 'firstName', title: 'First Name'},
            {field: 'lastName', title: 'Last Name'},
            {field: 'age', title: 'Age', groupFooterTemplate : aggregateAge}
        ]
    };


    function aggregateAge(data){
        var total = 0;
        for(var i = 0, len = data.length; i < len; i++){
            total += data[i].age;
        }
        return "Age: " + total;
    }

    // Render elements
    $element.kendoGrid(config);
})();
