const PROTO_PATH = './notes.proto';
const grpc = require('grpc');
const NoteService = grpc.load(PROTO_PATH).NoteService;
const index = new NoteService('localhost:50051',
    grpc.credentials.createInsecure());

module.exports = (name, ...params) => {
    return new Promise((resolve, reject) => {
        // This is a not a Node styled callback.
        // 1. data is the first argument
        // 2. err is the second argument
        index[name](...params, (err, data) => {
            if (err) {
                return reject(err)
            } else {
                console.log(' Insert data successful', ...params);
                resolve(data)
            }
        })
    });
};
