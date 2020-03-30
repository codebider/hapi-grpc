const kue = require('kue');

class Queue {
    constructor() {
        this.jobs = [];
        this.instance = kue.createQueue();
        this.initEvent();
    }

    initEvent() {
        this.instance.on('job complete', (id) => {
            kue.Job.get(id, (err, job) => {
                if (err) {
                    console.log( 'Job %s got queued of type %s', id, err );
                    return;
                }
                job.remove(function(err){
                    if (err) throw err;
                    console.log('Removed completed job #%d', job.id);
                });
            });
        });

        this.instance.active( function( err, ids ) { // others are activeCount, completeCount, failedCount, delayedCount
            console.log( 'We need some back pressure here', ids);

            ids.forEach( function( id ) {
                kue.Job.get( id, function( err, job ) {
                    // Your application should check if job is a stuck one
                    job.inactive();
                });
            });
        });

        this.instance.failed( function( err, ids ) { // others are activeCount, completeCount, failedCount, delayedCount
            console.log( 'We need some back pressure here failed', ids);

            ids.forEach( function( id ) {
                kue.Job.get( id, function( err, job ) {
                    // Your application should check if job is a stuck one
                    // TODO: should check the expired time
                    // console.log(job);
                    job.inactive();
                });
            });
        });
    }

    async execute(action, data) {
        console.log('Create action', action, data);
        const job = await this.instance.create(action, data).attempts(3).backoff( {delay: 5*1000, type:'fixed'} ).save();

        console.log('Create action success', action, data, job.type);

        return job;
    }

    async register(action, executeFn) {
        console.log('Register queue action', action, executeFn.name);
        this.jobs.push(action);
        await this.instance.process(action, 1, async (job, done) => {
            console.log('Process queue action', action, job.id);
            const { data } = job;
            try {
                await executeFn(data);

                console.log('Process queue action success', action, job.id);
                done();
            } catch (error) {
                console.log('Process queue action failed', action, job.id);
                done(error);
            }
        });
    }
}

module.exports = Queue;
