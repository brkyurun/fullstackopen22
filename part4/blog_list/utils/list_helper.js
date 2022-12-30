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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
