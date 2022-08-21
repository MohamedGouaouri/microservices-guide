
const resolvers =  {
    Query: {
        posts: async (parent, args, { models }) => {
            return await models.Post.find({}).exec();
        },
        post: async (parent, { id }, { models }) => {
            return await models.Post.findById(id).exec();
        },
    },
    Mutation: {
        createPost: async (parent, { title, text }, { me, models }) => {
            return await models.Post.create({
                title: title,
                text: text,
                author: me.id,
            });
        },
        deletePost: async (parent, { id }, { models }) => {
            return await models.Post.deleteOne({
                _id: id
            }).exec();
        },
    },
    Post: {
        author: async (post, args, { models }) => {
            return await models.User.findById(post.author).exec();
        },
    },
};

module.exports = resolvers