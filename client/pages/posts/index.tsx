import React, { useEffect, useState } from "react";
import PostItem from "../../components/posts/PostItem";
import { Post } from "../../types/posts";

type Props = {};

function PostsPage({}: Props) {
  const [posts, setPosts] = useState<null | Post[]>(null);
  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((res) => res.json())
      .then((json) => {
        setPosts(json.posts);
      });
  }, []);

  return (
    <div>
      <ul className="h-screen snap-y snap-mandatory z-0 overflow-y-scroll overflow-x-hidden">
        {posts?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}

export default PostsPage;
