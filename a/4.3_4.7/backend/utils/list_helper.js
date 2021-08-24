const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => sum + item.likes;
    return blogs.length === 0
    ? 0
    : blogs.reduce(reducer,0);
}

const favoriteBlog = (blogs) => {
    let max_likes = 0;
    let blog_index = -1;
    for (let i = 0; i < blogs.length; i++)
    {
        if (blogs[i].likes > max_likes)
        {
            max_likes = blogs[i].likes;
            blog_index = i;
        }
    }
    return blogs[blog_index];
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}