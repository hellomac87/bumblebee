import * as userRepository from "../data/auth";

type Post = {
  id: string;
  text: string;
  createdAt: string;
  userId: string;
};

let posts: Post[] = [
  {
    id: "1",
    text: "dobby fighting!",
    createdAt: new Date().toString(),
    userId: "1",
  },
  {
    id: "2",
    text: "Kimmy fighting!",
    createdAt: new Date().toString(),
    userId: "1",
  },
];

export async function getAll() {
  return Promise.all(
    posts.map(async (post) => {
      const { username, name, url } = (await userRepository.findById(
        post.userId
      )) as userRepository.User;
      return {
        ...post,
        username,
        name,
        url,
      };
    })
  );
}

export async function getAllByUsername(username: string) {
  const allPosts = await getAll();
  return allPosts.filter((post) => post.username === username);
}

export async function getAllByUserId(userId: string) {
  return posts.filter((post) => post.userId === userId);
}

export async function getById(postId: string) {
  return posts.find((post) => post.id === postId);
}

export async function create(text: string, userId: string) {
  const post = {
    id: Date.now().toString(),
    text,
    createdAt: new Date().toString(),
    userId,
  };
  posts = [post, ...posts];
  return post;
}

export async function update(id: string, text: string) {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.text = text;
  }
  return post;
}

export async function remove(id: string) {
  posts = posts.filter((post) => post.id !== id);
}
