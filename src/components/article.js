import { useEffect, useState } from "react";
import { login, logout } from "../../reducers/user";
import { useDispatch, useSelector } from "react-redux";

const Article = () => {
  const URL = "http://localhost:3011";
  const [articlesData, setArticlesData] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  console.log({ user });

  useEffect(() => {
    fetch(`${URL}/displayArticles`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setArticlesData(data.result);
      });
  }, []);

  console.log({ articlesData });

  const HandleDisplayArticles = (data) => {
    const displayArticle = data.map((article) => {
      return (
        <div className="col">
          <div className="card">
            <img src={article.picture} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">{article.description}</p>
              <p className="card-text">{article.author}</p>
            </div>
          </div>
        </div>
      );
    });
    return displayArticle;
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            A la découverte des épices
          </h2>
        </div>
        <br />
        <br />
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {HandleDisplayArticles(articlesData)}
        </div>
      </div>
    </div>
  );
};

export default Article;
