var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomDateSchema = new Schema({
    username: String,
    day : String,
    dateInit: String,
    dateEnd: String
});

module.exports = mongoose.model('RoomDateModel', roomDateSchema);
