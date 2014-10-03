var Authentication = {
    username: '',
    password: ''
    type: ''
};

var Registration = {
    username: '',
    password: '',
    other: {}
};

var Message = {
    to: '',
    from: '',
    body: '',
    type: ''
};

var Type = {
    REGISTER, 'REGISTER',
    AUTH: 'AUTH',
    QUERY: 'QUERY', //inbound
    ERROR: 'ERROR', //outbound
    CHAT: 'CHAT',  //in-out-bound
    INFO: 'INFO'   //outbound
};

var createMessage = function(type){
    var message = new Message();
    message.type = type;
    return message;
};

exports.Message = Message;
exports.Type   = Type;
exports.createMessage = createMessage;