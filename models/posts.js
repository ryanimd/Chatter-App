const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: String,
  message:
    {
      type: String,
      required: true
    },
  createdAt:
    {
      type: String,
      default: Date
    }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post;
