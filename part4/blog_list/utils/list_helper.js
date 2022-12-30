const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((prev, curr) => prev + curr, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  const result = blogs.find((blog) => blog.likes === mostLikes);
  return result;
};

const mostBlogs = (blogs) => {
  const authorNamesCount = {};
  for (const blog of blogs) {
    if (authorNamesCount[blog.author]) {
      authorNamesCount[blog.author]++;
    } else {
      authorNamesCount[blog.author] = 1;
    }
  }

  const authorWithMostBlogs = Object.entries(authorNamesCount)
    .sort((prev, curr) => prev[1] - curr[1])
    .pop();

  const result = {
    author: authorWithMostBlogs[0],
    blogs: authorWithMostBlogs[1],
  };

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
