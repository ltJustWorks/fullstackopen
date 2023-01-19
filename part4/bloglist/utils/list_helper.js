const logger = require('./logger')
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length > 0) {
        const {title, author, likes} = blogs.reduce((lastBlog, currBlog) => lastBlog.likes >= currBlog.likes ? lastBlog : currBlog)
        return {title: title, author: author, likes: likes}
    }
}

const mostBlogs = (blogs) => {
    const blogsByAuthor = blogs.reduce((result, blog) => {
        if (!(blog.author in result)) {
            result[blog.author] = 0
        }
        result[blog.author]++
        return result
    }, {})

    return Object.keys(blogsByAuthor).reduce((mostAuthor, currAuthor) => {
        return blogsByAuthor[currAuthor] > blogsByAuthor[mostAuthor] ?  currAuthor : mostAuthor
    }, Object.keys(blogsByAuthor)[0])
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}