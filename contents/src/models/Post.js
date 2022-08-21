const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

Post.createIndexes()
    .then(() => {
        console.log('Indexed !');
    })
    .catch(() => {
        console.error("NOT INDEXED !");
    })
module.exports = Post