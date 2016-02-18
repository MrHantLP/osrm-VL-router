/**
 * Created by MrHant on 19.02.2016.
 */
var OSRM = require('osrm-client');
var osrm = new OSRM("http://router.project-osrm.org");
var csvjson = require('csvjson');

var async = require('async');

/*var answer = [];*/

//Конфертим
var coordinate = csvjson.toObject('./centers.csv').output;

function compareNumeric(a, b) {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
}


var i = 0;
var xStart = coordinate[i].x;
var yStart = coordinate[i].y;
var answer = [];
var j = 0;
var query;

for (j = 0; j < coordinate.length; j++) {
    async.waterfall([
            function (callback) {
             /*   debugger;*/
                (function(j) {
                    var xEnd = coordinate[j].x;
                    var yEnd = coordinate[j].y;
                    query = {coordinates: [[xStart, yStart], [xEnd, yEnd]]};
                    osrm.route(query, function (err, result) {
                        callback(null, result.route_summary.total_time, j);
                    });
                })(j);
            },
            function(t, j, callback) {
                answer.push({"id": j, "time":t});
                //console.log(j,t);
                //console.log(answer);
                callback(null, answer);
            }
        ],
        function (err, results) {
            results.sort(compareNumeric);
            console.log(results);
        });
}


/*

 //тут форич когда для каждого пока так
 var i = 0;
 var answer = [];

 var xStart = coordinate[i].x;
 var yStart = coordinate[i].y;

 //Считаем
 var query;
 var j;

 for (j = 0; j < coordinate.length; j++) {
 var xEnd = coordinate[j].x;
 var yEnd = coordinate[j].y;
 query = {coordinates: [[xStart, yStart], [xEnd, yEnd]]};
 osrm.route(query, function (err, result) {
 //result.route_summary.total_time - время
 // console.log(j, result.route_summary.total_time, result.route_summary.start_point, result.route_summary.end_point);
 //answer=answer + '{ id: '+ j.toString()+', time: '+result.route_summary.total_time.toString()+' },';
 answer.push(result.route_summary.total_time);

 });
 }
 */

/*for (var j=0;j<coordinate.length;j++){
 (function (j) {
 var xEnd = coordinate[j].x;
 var yEnd = coordinate[j].y;

 var id = coordinate[j].id;


 query = {coordinates: [[xStart, yStart], [xEnd, yEnd]]};
 osrm.route(query, function (err, result) {
 //result.route_summary.total_time - время
 console.log(j, result.route_summary.total_time, result.route_summary.start_point, result.route_summary.end_point);
 //answer=answer + '{ id: '+ j.toString()+', time: '+result.route_summary.total_time.toString()+' },';
 //answer.push(result.route_summary.total_time);


 });
 })(j);
 }*/




/*
 var query = {coordinates: [[43.119304,131.885045], [43.11196,131.911763]]};
 osrm.route(query, function (err, result) {
 //result.route_summary.total_time - время
 console.log(result.route_summary.total_time);


 });
 */

/* Output:
 { status: 0,
 status_message: 'Found route between points',
 route_geometry: '{~pdcBmjfsXsBrD{KhS}DvHyApCcf@l}@kg@z|@_MbX|GjHdXh^fm@dr@~\\l_@pFhF|GjCfeAbTdh@fFqRp}DoEn\\cHzR{FjLgCnFuBlG{AlHaAjJa@hLXtGnCnKtCnFxCfCvEl@lHBzA}@vIoFzCs@|CcAnEQ~NhHnf@zUpm@rc@d]zVrTnTr^~]xbAnaAhSnPgJd^kExPgOzk@maAx_Ek@~BuKvd@cJz`@oAzFiAtHvKzAlBXzNvB|b@hGl@Dha@zFbGf@fBAjQ_AxEbA`HxBtPpFpa@rO_Cv_B_ZlD}LlBGB',
 route_instructions:
 [ ... ],
 route_summary:
 { total_distance: 2814,
 total_time: 211,
 start_point: 'Friedenstra?e',
 end_point: 'Am K?llnischen Park' },
 alternative_geometries: [],
 alternative_instructions: [],
 alternative_summaries: [],
 route_name:
 [ 'Lichtenberger Stra?e',
 'Holzmarktstra?e' ],
 alternative_names: [ [ '', '' ] ],
 via_points:
 [ [ 52.519934, 13.438647 ],
 [ 52.513162, 13.415509 ] ],
 via_indices: [ 0, 69 ],
 alternative_indices: [],
 hint_data:
 { checksum: 222545162,
 locations:
 [ '9XkCAJgBAAAtAAAA____f7idcBkPGuw__mMhA7cOzQA',
 'TgcEAFwFAAAAAAAAVAAAANIeb5DqBHs_ikkhA1W0zAA' ] } }
 */