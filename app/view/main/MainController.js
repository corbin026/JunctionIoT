/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('JunctionIoT.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onItemSelected: function (sender, record) {
        var me = this,
            view = me.getView();

        var userLocation = [record.get('latitude'), record.get('longitude')];
        // var bern = ol.proj.fromLonLat([7.4458, 46.95]);
        // var otaniemi = [2764348.21, 8441749.2];
        var view = this.map.getView();

        flyTo = function (location, done) {
                var duration = 1500;
                var zoom = view.getZoom();
                var parts = 2;
                var called = false;

                function callback(complete) {
                    --parts;
                    if (called) {
                        return;
                    }
                    if (parts === 0 || !complete) {
                        called = true;
                        done(complete);
                    }
                }
                view.animate({
                    center: location,
                    duration: duration
                }, callback);
                view.animate({
                    zoom: zoom - 1,
                    duration: duration / 2
                }, {
                    zoom: 21,
                    duration: duration / 2
                }, callback);
            },

            flyTo(userLocation, function () {});
    },

    onRender: function (conmponent) {
        //Openlayers 4 Implemetation
        var me = this,
            view = me.getView();

        Ext.Ajax.request({
            url: 'https://jsonplaceholder.typicode.com/todos/1',

            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                console.dir(obj);
                console.log(obj);
                // Ext.message("");
            },

            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

        grid = view.down('grid');
        store = grid.getStore();

        var features = new Array();
        store.each(function (record) {
            status = record.get('status');

            var person = new ol.Feature({
                geometry: new ol.geom.Point([record.get('latitude'), record.get('longitude')])
            });

            var color;

            if (status == 'dead') {
                color = '#ff0000';
            } else if (status == 'alive') {
                color = '#009933';
            } else if (status == 'injured') {
                color = '#ff9900';
            }

            person.setStyle(new ol.style.Style({
                image: new ol.style.Icon( /** @type {module:ol/style/Icon~Options} */ ({
                    color: color,
                    crossOrigin: 'anonymous',
                    src: 'data/dot.png'
                }))
            }));
            features.push(person);
        });



        var vectorSource = new ol.source.Vector({
            features: features
        });
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        //Layers
        var urlImagery = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer';

        var projection = ol.proj.get('EPSG:3857');
        var projectionExtent = projection.getExtent();
        var size = ol.extent.getWidth(projectionExtent) / 256;
        var resolutions = new Array(14);
        var matrixIds = new Array(14);
        for (var z = 0; z < 14; ++z) {
            // generate resolutions and matrixIds arrays for this WMTS
            resolutions[z] = size / Math.pow(2, z);
            matrixIds[z] = z;
        }

        var osmLayer = new ol.layer.Tile({
            crossOrigin: 'anonymous',
            source: new ol.source.OSM()
        });
        var arcgisImageryLayer = new ol.layer.Tile({
            //extent: [-13884991, 2870341, -7455066, 6338219],
            source: new ol.source.TileArcGISRest({
                crossOrigin: 'anonymous',
                url: urlImagery
            })
        });

        var layers = [
            osmLayer,
            // arcgisImageryLayer,
            vectorLayer
        ];

        var view = new ol.View({
            center: [2764348.21, 8441749.2], // OTANIEMI
            //center: [4098839.63, -142995.5], //Nairobi
            zoom: 15
        });

        this.map = new ol.Map({
            target: 'map',
            renderer: 'canvas',
            layers: layers,
            view: view,
        });

        //Events

    },
    onResize: function () {
        var size = this.lookup('mapContainer').getSize();
        console.log(size);
        this.map.setSize([size.width, size.height]);
    },
});