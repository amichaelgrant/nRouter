var net          = require('net');
var util         = require('util');
var EventEmitter = require('events').EventEmitter;
var Config       = require('../config/config');
var Types        = require('./Type');
var Redis        = require('redis');

var log = console.log;

function nRouter (){
    this.socketHash = {};
    var self = this;

//    self.server = net.createServer(function (connection) {
//        socket.write('Echo server\r\n');
//        socket.pipe(socket);
//    });
//
//    self.listen = function(port, host){
//        self.server.listen(port, host);
//    };
//
//    self.incoming = function(){
//
//    };
//
//    self.outgoing = function(){
//
//    };

};

util.inherits(nRouter, EventEmitter);

nRouter.prototype.init = function(){
    var rStore = Redis.createClient(config.REDIS_PORT, config.REDIS_HOST);
   	rStore.auth(config.REDIS_PASSWORD);
   	this.rStore = rStore;
}
nRouter.prototype._close = function(){
    log('Connection to nRouter closed');
}

nRouter.prototype._end = function(){
    log('Connection to nRouter ended');
}

nRouter.prototype._listening = function(){
    log('nRouter listening');
}

nRouter.prototype._error = function(error){
    log('nRouter error %s', error);
}

nRouter.prototype._connection = function( socket ){
    var self = this;
    log('Incoming connection to nRouter....%s', socket.address().address);
    socket.on('close', function(){
        log('Socket connection closed');
    });
    socket.on('error', function(){
        log('Socket connection error');
    });
    socket.on('end', function(){
        log('Socket connection ended');
    });
    socket.on('data', function(data){
        log('Socket connection has data : %s', data);
        //parse message to json data or report error //
        //to client is message is not parseable//
        var json = '';
        try{
            json = JSON.parse( data );
            self.Router(json, socket);
        }catch(exception){
            var message = Types.createMessage(Types.Type.ERROR);
            message.body = data;
            message.body += ' - Invalid stream data; not parseable';
            socket.write(JSON.stringify(message));
            log('%s @ %s', message.extra, message.body);
        }
    });
}

nRouter.prototype.listen = function (port, host){
    var self = this;
    this.init();
    this.server = net.createServer( function(psocket){
       //log('nRouter has a connection %s', util.log(psocket));//
    });
    this.server.on('close', this._close);
    this.server.on('end', this._end);
    this.server.on('listening', this._listening);
    this.server.on('connection', this._connection);
    this.server.on('error', this._error);

    this.server.listen( port, host, function(){
        var addr = self.server.address();
        log('Running nRouter on %s @ %s', addr.port, addr.address);
    });
};


nRouter.prototype.Router = function (json, socket){
    var self = this;
    var message = new Types.createMessage(Types.Type.CHAT);
    if(!json || !socket){
        return
    }

    if(json.type && json.type === Types.Type.CHAT){

    }else if( json.type && json.type === Types.Type.QUERY ){

    }else if( json.type && json.type === Types.Type.INFO ){

    }else if( json.type && json.type === Types.Type.AUTH){
        //Authentication//
        self.rStore.get(key, function(err, value){
            //
        });
    }else if( json.type && json.type === Types.Type.REGISTER){
         //Authentication//
         self.rStore.set(key, json);
     }

}


module.exports = nRouter;
