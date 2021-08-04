import React from 'react';

const Blog = ({blog}) => {
    return (
        <div className='blog'>
            <h4>{blog.title}</h4>
            <p>Author : {blog.author}</p>
            <p>Url : <a href={blog.url}>{blog.title} link </a></p>
            <p>Likes: {blog.likes} likes </p>
        </div>
    )
}

export default Blog;