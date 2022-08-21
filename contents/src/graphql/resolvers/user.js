
const resolvers = {
    Query: {
        me: async (parent, args, {models, me}) => {
            return models.User.findById(me.id).exec()
        },
        user: async (parent, {id}, {models}) => {
            return await models.User.findById(id).exec()
        },
        users: async (parent, args, {models}) => {
            return await models.User.find().exec()
        },
    },
    User: {
        posts: async (user, args, {models}) => {
            return await models.Post.find({
                author: user.id
            }).exec()
        }
    }
}

module.exports = resolvers