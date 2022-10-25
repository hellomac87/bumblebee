import { NextFunction, Request, Response } from 'express';
import * as postRepository from '../data/post';

export function getPosts(req: Request, res: Response, next: NextFunction) {
    const username = req.query.username as string;
    const data = username ? postRepository.getAllByUsername(username) : postRepository.getAll();
    res.status(200).json(data);
}

export function getPost(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const post = postRepository.getById(id);
    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: `Post ${id} not found` });
    }
}

export function createPost(req: Request, res: Response, next: NextFunction) {
    const { text, name, username } = req.body;
    const post = postRepository.create(text, name, username);
    res.status(202).json(post);
}

export function updatePost(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const text = req.body.text;
    const post = postRepository.update(id, text);

    if (post) {
        res.status(201).json(post);
    } else {
        res.status(404).json({ message: `Post ${id} not found` });
    }
}

export function deletePost(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    postRepository.remove(id);
    res.sendStatus(204);
}
