const notes = require('./notes');

const demo = notes();
let newNote = {
    title: "New Note",
    content: "New Note content"
};

const main = async () => {
    await demo.insert(newNote).catch(e => console.log(e));
    await demo.insertQueue(newNote);
};

main();
