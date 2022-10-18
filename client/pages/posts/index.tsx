import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../src/components/common/Header";
import PostItem from "../../src/components/posts/PostItem";
import { baseUrl } from "../../src/constant/service";
import PostService from "../../src/service/post";
import { Post } from "../../types/posts";

type Props = {};

function PostsPage({}: Props) {
  const router = useRouter();
  const [posts, setPosts] = useState<null | Post[]>(null);
  const postService = new PostService(baseUrl);

  const fetchPosts = async () => {
    const data = await postService.getPosts();
    setPosts(data);
  };

  const updatePosts = async (postId: string, text: string) => {
    const data = await postService.updatePost(postId, text);

    const updatedPosts = posts?.map((post) =>
      post.id === postId
        ? {
            ...post,
            text,
          }
        : post
    );

    setPosts(updatedPosts ?? null);
  };

  const handleClickEdit = (postId: string) => () => {
    router.push(`/posts/edit/${postId}`);
  };

  useEffect(() => {
    void fetchPosts();
  }, []);

  return (
    <div>
      <Header />
      <ul className="h-screen snap-y snap-mandatory z-0 overflow-y-scroll overflow-x-hidden">
        {posts?.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onClickEdit={handleClickEdit(post.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default PostsPage;
