import { useState, useEffect } from 'react'

const apiBlog = 'http://localhost:3008/api/v1/posts'
function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(apiBlog)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const deletePostByTitle = (title) => {
    const postToDelete = posts.find((post) => post.title === title);
    if (!postToDelete) {
      console.error('Post not found');
      return;
    }

    fetch(`${apiBlog}/${postToDelete.title}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setPosts(posts.filter((post) => post.title !== postToDelete.title));
        } else {
          console.error('Failed to delete post');
        }
      })
      .catch((error) => console.error('Error deleting post:', error));
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-4 mb-4" key={post.slug}>
              <div className="card">
                <div className="card-body">
                  <img className='card-img-top' src={post.image} alt={post.title} />
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => deletePostByTitle(post.title)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
