import React, { useEffect, useState } from "react";
import { service } from "../appwrite/dbConfig";
import { Container } from "../components/index";

function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    service.allPost().then((post) => {
      // if (post) {
      setPosts(post);
      // }
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div>No Posts available to show.....</div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
