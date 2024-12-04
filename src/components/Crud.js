import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpdateIdToStore } from "../../reducers/updateId";
import { useRouter } from 'next/router';


const Crud = () => {
  const URL = "http://localhost:3011";
  const [articlesData, setArticlesData] = useState([]);
  const [articleById, setArticleById] = useState([]);
  const [deleteArticle, setDeleteArticle] = useState();
  let articleId = [];

  const router = useRouter();
  const dispatch = useDispatch();
  

  const addUpdateId = (id) => {
    const result =  dispatch(addUpdateIdToStore(id));
    router.push('/updateArticle');
  };


  const retrievedId = useSelector((state) => state.updateId.value);
  console.log("RETRIEVEDID",retrievedId);
  

  useEffect(() => {
    fetch(`${URL}/displayArticles`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setArticlesData(data.result));
  }, []);


  const handleDelete = (id, URL) => {
    console.log(`${URL}/deleteArticle/${id}`);
    fetch(`${URL}/deleteArticle/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data in then", data.result);
        if (data.result.deletedCount > 0) {
          setDeleteArticle(data.result);
          setArticlesData((prev) =>
            prev.filter((article) => article._id !== id)
          );
        }
      });
  };

  // const retrieveUpdateId = (id) => {
  //     setUpdateId(id)
  // };

 

  //console.log("crud article", articlesData);

  // const handleDisplayArticles = (data) => {
  //     const handleDelete = (id, URL) => {

  //         fetch(`${URL}/deleteArticle/${id}`)
  //         .then((res) => res.json())
  //         .then((data) => setDeleteArticle(data.result))
  //     }
  //     const displayArticle = data.map((article, index) => {
  //         return(
  //             <tr key={index}>
  //             <td> {article.title} </td>
  //             <td> {article.description} </td>
  //             <td> {article.author} </td>
  //             <td>
  //                 <button onClick={() => handleDelete(article.id, URL)} className="btn btn-info">Update </button>
  //                 <button style={{marginLeft: "10px"}} className="btn btn-danger">Delete </button>
  //             </td>
  //        </tr>
  //         )
  //     });

  //     return displayArticle;
  // };

  // console.log({ deleteArticle });

  return (
    <div className="container">
      <div>
        <h2 className="text-center">Articles list</h2>
        <div>
          <a class="btn btn-primary" href="/addArticle" role="button">
            Ajouter un article
          </a>
          {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal for @getbootstrap</button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Recipient:</label>
                            <input type="text" class="form-control" id="recipient-name"/>
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Message:</label>
                            <textarea class="form-control" id="message-text"></textarea>
                        </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Send message</button>
                    </div>
                    </div>
                </div>
                </div> */}
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articlesData.map((article, index) => {;
                return (
                  <tr key={index}>
                    <td> {article.title} </td>
                    <td> {article.description} </td>
                    <td> {article.author} </td>
                    <td>
                      <button
                        onClick={() => addUpdateId(article._id)}
                        className="btn btn-info"
                      >
                        Update{" "}
                      </button>
                      <button
                        onClick={() => handleDelete(article._id, URL)}
                        style={{ marginLeft: "10px" }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Crud;

// const handleGetArticleById = (data) => {
//     console.log("data id", data);

//     fetch(`http://localhost:3011/articleById/${data.id}`)
//     .then((res) => res.json)
//     .then((data) => setArticleById(data.result))

// }
