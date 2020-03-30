class Note {
    constructor({ queue, client }) {
        this.queue = queue;
        this.client = client;

        this.QUEUE = {
            INSERT: 'NOTE_INSERT'
        };
        this.queue.register(this.QUEUE.INSERT, this.insert.bind(this));
    }

    async insert(values) {
        console.log('Try Insert data ', values);
        return this.client('insert', values);
    };

    async insertQueue(values) {
        await this.queue.execute(this.QUEUE.INSERT, values);
    };
}

module.exports = Note;
