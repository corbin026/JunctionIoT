/**
 * This view is an example list of people.
 */
Ext.define('JunctionIoT.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'JunctionIoT.store.Personnel'
    ],

    title: 'Personnel',

    store: {
        type: 'personnel'
    },

    columns: [{
            text: 'Status',
            dataIndex: 'status',
            flex: 1
        }, {
            text: 'Name',
            dataIndex: 'name',
            flex: 1
        },
        {
            text: 'Email',
            dataIndex: 'email',
            flex: 1
        },
        {
            text: 'Phone',
            dataIndex: 'phone',
            flex: 1
        },
        {
            text: 'Latitude',
            dataIndex: 'latitude',
            flex: 1
        },
        {
            text: 'Longuitud',
            dataIndex: 'longitude',
            flex: 1
        },
    ],

    listeners: {
        select: 'onItemSelected'
    }
});