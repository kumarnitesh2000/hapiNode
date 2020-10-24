const Hapi = require('hapi');


    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    });


    server.route({
        method: 'POST',
        path: '/post/data',
        handler :async (request,h) => {
            return request.payload;
        }
    });

    //adding routes 
    server.route({
        method: 'GET',
        path: '/{name}',
        handler: async (request, h) => {
            const name = request.params.name;
            return `Hello ${name} today's Date is ${await h.getDate()}`
        }
    });
    server.route({
        method:'GET',
        path: '/hello/{name}',
        handler: (request, h) => {
                return h.redirect(`/${request.params.name}`)
        }
    });
    //end of routes


    server.start();
    console.log('Server running on %s', server.info.uri);


//creating our own plugin
//this objects should be the plugin name which you can then register 
const getDate = {

    'name': 'dateTimeInfo',
    'version': '1.0.0',
    'register': async function(server,options){

        const currentDate = async function() {

            const date = new Date();
            
            return date;
        };

        server.decorate('toolkit', 'getDate', currentDate);

    }


}
//plugin two give info about each requests


//using the middleWares
server.register({
    'plugin':getDate
});




