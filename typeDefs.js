const { gql } = require("apollo-server-express")
const typeDefs = gql`
    type Task {
        id: ID
        title: String
        description: String
        stage: Int
        activities: [ActivitiesOutput]
    }
    input ActivitiesInput {
        description: String
        checked: Boolean
    }
    type ActivitiesOutput {
        description: String
        checked: Boolean
    }
    input TaskInput {
        title: String
        description: String
        stage: Int
        activities: [ActivitiesInput]
    }
    input TaskInputRequired {
        title: String!
        description: String!
        stage: Int!
        activities: [ActivitiesInput]!
    }
    type Query {
        hello: String
        "Get all tasks"
        getAllTasks: [Task],
        getTask(id: ID!): Task
    }
    type Mutation {
        createTask(
            task: TaskInputRequired!
        ): Task
        deleteTask(
            id: ID!,
        ): String!
        deleteAllTask: String!
        updateTask(
            id: ID!,
            task: TaskInput
        ): Task!
        updateActivities(
            id: ID!,
            activities: [ActivitiesInput]
        ): Task!
    }
`
module.exports = { typeDefs }