import React, {useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogServiceAll from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState('')

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    setNewBlogLikes(event.target.value)
  }

  //using react hook effect to fetch data from server
  const hook = () => {
    blogServiceAll.getAll().then(initialBlogs => {setBlogs(initialBlogs) })
  }

  useEffect(hook, []);
  
  //adding new note
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: newBlogLikes
    }

    blogServiceAll
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      setNewBlogLikes('')
    })
  }

  return (
    <div className="main_div">
      <h1>Blogs</h1>

      <ul>
        <h2>Blog List</h2>
        {blogs.map((blog, index) =>
        <Blog key={index} blog={blog} /> 
        )}
      </ul>
        <br></br>
      <div id="form">
        <h4>Add A New Blog Article</h4>
        <form onSubmit={addBlog}>
          <label>Blog Title: </label>
          <input value={newBlogTitle} onChange={handleTitleChange} />
          <br></br>
          <label>Blog Author: </label>
          <input value={newBlogAuthor} onChange={handleAuthorChange} /> 
          <br></br>
          <label>Blog URL: </label>
          <input value={newBlogUrl} onChange={handleUrlChange} />
          <br></br>
          <lable>Likes Count: </lable>
          <input value={newBlogLikes} onChange={handleLikesChange} />
          <br></br>
          <button type="submit"> Add </button>
        </form>
      </div>
      
    </div>
  )
}

export default App;