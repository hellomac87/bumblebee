import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../src/components/common/Header";
import PostItem from "../../src/components/posts/PostItem";
import PostList from "../../src/components/posts/PostList";
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

  const handleClickEdit = (postId: string) => () => {
    router.push(`/posts/edit/${postId}`);
  };

  const handleClickDelete = (postId: string) => async () => {
    const isDelete = window.confirm("deletePost?");
    if (isDelete) {
      await postService.deletePost(postId);
      alert("delete post!");
      await fetchPosts();
    }
  };

  useEffect(() => {
    void fetchPosts();
  }, []);

  return (
    <div>
      <Header />
      <PostList>
        {posts?.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onClickEdit={handleClickEdit(post.id)}
            onClickDelete={handleClickDelete(post.id)}
          />
        ))}
      </PostList>
    </div>
  );
}

export default PostsPage;
