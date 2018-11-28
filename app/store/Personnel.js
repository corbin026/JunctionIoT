Ext.define('JunctionIoT.store.Personnel', {
    extend: 'Ext.data.Store',

    alias: 'store.personnel',

    fields: [
        'name', 'email', 'phone', 'latitude', 'longitude', 'status',
    ],
    sorters: [
        'status', 'latitude', 'longitude'
    ],

    data: {
        items: [{
                name: 'Jean Luc',
                email: "jeanluc.picard@enterprise.com",
                phone: "555-111-1111",
                latitude: "2764348.21",
                longitude: "8441749.2",
                status: "alive"
            },
            {
                name: 'Worf',
                email: "worf.moghsson@enterprise.com",
                phone: "555-222-2222",
                latitude: "2764349.27",
                longitude: "8441623.6",
                status: "dead"
            },
            {
                name: 'Deanna',
                email: "deanna.troi@enterprise.com",
                phone: "555-333-3333",
                latitude: "2764240.20",
                longitude: "8441750.7",
                status: "alive",
            },
            {
                name: 'Data',
                email: "mr.data@enterprise.com",
                phone: "555-444-4444",
                latitude: "2764153.23",
                longitude: "8441749.8",
                status: "injured"
            }
        ]
    },

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});