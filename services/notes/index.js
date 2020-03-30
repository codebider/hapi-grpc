const Note = require('./Note');
const queue = require('../queues');
const client = require('../clients');

module.exports = () => new Note({ queue: queue(), client });
