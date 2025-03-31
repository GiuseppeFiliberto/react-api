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

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {posts.map((post) => (
            <div className="col-md-4 mb-4" key={post.slug}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.content}</p>
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
