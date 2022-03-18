const { Task } = require("./models/Task")
const { ValidationError } = require('apollo-server-express');
const resolvers = {
    Query: {
        getAllTasks: async () => {
            let tasks
            try {
                tasks = await Task.find()
            } catch (error) {
                console.log("error")
                return []
            }
            if (tasks) return tasks
        },
        getTask: async (_, args) => {
            try {
                const task = await Task.findById(args.id)
            } catch (error) {
                console.log("There arent any task with that ID")
            }
            return task
        }
    },
    Mutation: {
        createTask: async (_, args) => {
            const newTask = new Task(args.task);
            await newTask.save().catch(error => {
                throw new ValidationError('Error on request');
            })
            return newTask;
        },
        deleteTask: async (_, args) => {
            await Task.findByIdAndDelete(args.id);
            return "Task deleted";
        },
        deleteAllTask: async () => {
            await Task.deleteMany({ new: true }).catch(error => {
                throw new INTERNAL_SERVER_ERROR('Error on request');
            });
            return ("Tasks deleted")
        },
        updateTask: async (_, args) => {
            const task = await Task.findByIdAndUpdate(
                args.id,
                { $set: args.task },
                { new: true }
            )
            return task
        },
        updateActivities: async (_, args) => {
            const task = await Task.findById(args.id).catch(error =>{ return []})
            console.log("actividades: ", args.activities)
            console.log("Id: ",args.id)
            const taskUpdated =  await Task.findByIdAndUpdate(
                args.id,
                { $addToSet: {
                    activities: {$each: args.activities}
                }},
                {new: true},
            )
            if (task == taskUpdated) console.log("Hay valores duplicados")
            return taskUpdated  
        }
    }
};
module.exports = { resolvers };