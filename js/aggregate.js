/**
 * Created by christfried Balizou on 05/01/16.
 */
var aggregate = (function(){
    'use strict';

    var instance;
    if(!instance){
        instance = new Aggregate();
    }
    return instance;

    /*
     * FIXME this loop is too complicated should clean it
     * Logic: If field === field we found the field we store the value
     * else if data contains items we resend the array
     * else we reach bottom we loop on the rest
     * */
    function loop(r, f, d) {
        for (var k in d) {
            if (d[k].field === f) {
                if (d[k].hasSubgroups) {
                    loop(r, f, d[k].items);
                } else {
                    var data = d[k].items;
                    for(var i = 0, len = data.length; i < len; i++) {
                        r.push(data[i].get(f));
                    }
                }
            }
        }
    }

    function cback(r){
        var total = 0;
        for(var i = 0, len = r.length; i < len; i++){
            total += r[i];
        }
        return total;
    }

    function Aggregate(){
        var memory = {};

        var save = function(key){
            (memory[key] ? (memory[key].index += 1) :
                (memory[key] = {index : 0}));
            return memory[key];
        };

        return {
            template: function(field, $g, callback){
                var size = save(field + $g.attr('id')).index
                    ,ds = $g.data('kendoGrid').dataSource
                    ,results = [];

                callback = cback;

                loop(results, field, ds.view());
                return callback ? callback.call(null, results) : "";
            }
        };
    }
})();