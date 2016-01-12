/**
 * Created by christfried Balizou on 05/01/16.
 */

function Exception(name, message) {

    if (!(this instanceof arguments.callee)) {
        return new Exception(name, message);
    }

    this.message = message;
    this.name = name;
    this.toString = function () {
        return this.name + " " + this.message;
    }
}

// Check jquery library
if (!jQuery) {
    alert("jQuery lib is missing, please make sure jQuery is load before this script.");
    throw Exception("ExceptionMissingDependency",
        "jQuery lib is missing, please make sure jQuery is load before this script.");
}

// Check kendo plugin
if (!jQuery.fn.kendoGrid) {
    alert("Kendo plugin is missing, please make sure Kendo is load before this script.");
    throw Exception("ExceptionMissingDependency",
        "Kendo plugin is missing, please make sure Kendo is load before this script.")
}

// The hack to make custom aggregation work
var jQuery = (function ($, aggregate) {

    var kendoGridGroupRowHtml = $.fn.kendoGrid.widget.fn._groupRowHtml;

    $.fn.kendoGrid.widget.fn._groupRowHtml = function (e, t, n, i, r, o) {
        var str = aggregate.process(this, e);
        r.groupFooterTemplate = function () {
            return str;
        };
        return kendoGridGroupRowHtml.call(this, e, t, n, i, r, o);
    };

    return $;

})(jQuery || {}, (function () {

    var instance;
    if (!instance) {
        instance = new Aggregate();
    }
    return instance;

    function Aggregate() {
        // TODO free memory after grid is rendered
        var memory = {};

        function loop(data) {
            return data.hasSubgroups ? loop(data.items) : data.items;
        }

        return {
            process: function (grid, group) {
                var gridId = grid.element[0].id
                    , cols = grid.columns;

                memory[gridId] = {};
                for (var i = 0, len = cols.length; len > i; i++) {
                    memory[gridId][cols[i].field] = cols[i].groupFooterTemplate;
                }

                return this.template(gridId, loop(group), grid._groups());
            },
            template: function (key, data, size) {
                // TODO test grid with details
                if (!data) return "";

                var $row = '<tr class="k-group-footer">'
                    , grid = memory[key];

                $row += (new Array(size + 1))
                    .join('<td class="k-group-cell">&nbsp;</td>');

                for (var field in grid) {
                    var str = grid[field];
                    $row += '<td class="k-group-cell">' + (str ? str(data) : "") + '</td>';
                }

                return $row + '</tr>';
            },
            remove: function (key) {
                return delete memory[key];
            },
            clear: function () {
                memory = {};
            }
        };
    }
})());