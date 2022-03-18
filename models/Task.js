const {Schema, model} = require('mongoose')
const taskSchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    stage: {
        type: Number,
        required: true,
        min: 1,
        max: 3,
    },
    activities: {
        type: Array,
        required: true,
    }
});
const Task = model('Task', taskSchema); 
module.exports =  { Task }