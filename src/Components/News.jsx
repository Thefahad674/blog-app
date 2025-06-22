import React, { useEffect, useState } from "react";
import Weather from "./Weather";
import Calendar from "./Calendar";
import "./News.css";
import userImg from "../assets/images/user.jpg";
import axios from "axios";
import noImg from "../assets/images/no-image.jpg.png";
import NewsModal from "./NewsModal";
import Bookmarks from "./Bookmarks";
 

const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
];

const News = ({ onShowBlogs, blogs }) => {
  const [headline, setHeadline] = useState();
  const [news, setNews] = useState([]);
  const [slectedCategory, setSelectedCategory] = useState("general");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmakrsModal, setShowBookmakrsModal] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://gnews.io/api/v4/top-headlines?category=${slectedCategory}&lang=en&apikey=59a16a7c6b078b9c55aa876cca859e59`;

      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=eng&apikey=59a16a7c6b078b9c55aa876cca859e59`;
      }

      const response = await axios.get(url);
      const fetchedNews = response.data.articles;

      fetchedNews.forEach((article) => {
        if (!article.image) {
          article.image = noImg;
        }
      });

      setHeadline(fetchedNews[0]);
      setNews(fetchedNews.slice(1, 7));

      const savedBookmarks =
        JSON.parse(localStorage.getItem("bookmarks")) || [];
      setBookmarks(savedBookmarks);

      console.log(news);
    };

    fetchNews();
  }, [slectedCategory, searchQuery]);

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleBookmarkClick = (article) => {
    setBookmarks((prevBookmarks) => {
      const updatedBookmarks = prevBookmarks.find(
        (bookmark) => bookmark.title === article.title
      )
        ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
        : [...prevBookmarks, article];
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  return (
    <>
      <div className="news">
        <header className="news-header">
          <h1 className="logo">News & Blogs</h1>
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input type="text" placeholder="Search News..." />
              <button
                type="submit"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </header>
        <div className="news-content">
          <div className="navbar">
            <div className="user" onClick={onShowBlogs}>
              <img src={userImg} alt="User Image" />
              <p>Mary's Blog</p>
            </div>
            <nav className="categories">
              <h1 className="nav-heading">Categories</h1>
              <div className="nav-links">
                {categories.map((category) => (
                  <a
                    key={category}
                    href="#"
                    className="nav-link"
                    onClick={(e) => handleCategoryClick(e, category)}
                  >
                    {category}
                  </a>
                ))}

                <a
                  href="#"
                  className="nav-link"
                  onClick={() => setShowBookmakrsModal(true)}
                >
                  Bookmarks
                  <i className="fa-solid fa-bookmark"></i>
                </a>
              </div>
            </nav>
          </div>
          <div className="news-section">
            {headline && (
              <div
                className="headline"
                onClick={() => handleArticleClick(headline)}
              >
                <img src={headline.image || noImg} alt={headline.title} />
                <h2 className="headline-title">
                  {headline.title}
                  <i
                    className={`${
                      bookmarks.some(
                        (bookmark) => bookmark.title === headline.title
                      )
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-bookmark bookmark`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(headline);
                    }}
                  ></i>
                </h2>
              </div>
            )}
            <div className="news-grid">
              {news.map((article, index) => (
                <div
                  key={index}
                  className="news-grid-item"
                  onClick={() => handleArticleClick(article)}
                >
                  <img src={article.image || noImg} alt={article.title} />
                  <h3>
                    {article.title}
                    <i
                      className={`${
                        bookmarks.some(
                          (bookmark) => bookmark.title === article.title
                        )
                          ? "fa-solid"
                          : "fa-regular"
                      } fa-bookmark bookmark`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookmarkClick(article);
                      }}
                    ></i>
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <NewsModal
            show={showModal}
            article={selectedArticle}
            onClose={() => setShowModal(false)}
          />
          <Bookmarks
            show={showBookmakrsModal}
            bookmarks={bookmarks}
            onClose={() => setShowBookmakrsModal(false)}
            onSelectArticle={handleArticleClick}
            onDeleteBookmark={handleBookmarkClick}
          />
          <div className="my-blogs">
            <h1 className="my-blogs-heading">My Blogs</h1>
            <div className="blog-posts">
              {blogs.map((blog, index) => (
                <div key={index} className="blog-post">
                  <img src={blog.image || noImg} alt={blog.title} />
                  <h3>{blog.title}</h3>
                  {/* <p>{blog.content}</p> */}
                  <div className="post-buttons">
                    <button className="edit-post">
                      <i className="bx bxs-edit"></i>
                    </button>
                    <button className="delete-post">
                      <i className="bx bxs-x-circle"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="weather-calendar">
            <Weather />
            <Calendar />
          </div>
        </div>
        <footer className="news-footer">
          <p>
            <span>News & Blogs App </span>
          </p>
          <p>&copy; All RIght Reserved By Fahad</p>
        </footer>
      </div>
    </>
  );
};

export default News;
