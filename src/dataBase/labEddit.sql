-- Active: 1703030644373@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

CREATE TABLE
    posts(
        id TEXT UNIQUE NOT NULL PRIMARY KEY,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL DEFAULT(0),
        dislikes INTEGER NOT NULL DEFAULT(0),
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    comments(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL DEFAULT(0),
        dislikes INTEGER NOT NULL DEFAULT(0),
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    likes_dislikes_comments(
        user_id TEXT NOT NULL,
        comments_id TEXT NOT NULL,
        like INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (comments_id) REFERENCES comments (id) ON UPDATE CASCADE ON DELETE CASCADE
    )

CREATE TABLE
    likes_dislikes_posts(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO users
VALUES (
        'u001',
        'Fulano',
        'fulano@email.com',
        'fulano123',
        'NORMAL',
        '2023-10-16T12:00:0.000Z'
    ), (
        'u002',
        'Beltrana',
        'beltrana@email.com',
        'beltrana00',
        'NORMAL',
        '2023-11-16T12:00:0.000Z'
    );

INSERT INTO posts
VALUES (
        'p001',
        'u001',
        'Olá Mundo',
        0,
        0,
        '2023-10-16T13:00:0.000Z',
        '2023-10-16T13:00:0.000Z'
    ), (
        'p002',
        'u001',
        'Olá Galera da minha rede',
        0,
        0,
        '2023-10-16T13:00:0.000Z',
        '2023-10-16T13:00:0.000Z'
    );

INSERT INTO comments
VALUES (
        'c001',
        'u001',
        'p001',
        'Parabens pelo seu primeiro passo',
        0,
        0,
        '2023-10-16T13:00:0.000Z',
        '2023-10-16T13:00:0.000Z'
    );

INSERT INTO comments
VALUES (
        'c002',
        'u001',
        'p001',
        'Continue postando seu avanço',
        0,
        0,
        '2023-10-16T13:10:0.000Z',
        '2023-10-16T13:10:0.000Z'
    );

INSERT INTO comments
VALUES (
        'c003',
        'u002',
        'p001',
        'Caramba comentando no proprio post',
        0,
        0,
        '2023-10-16T13:12:0.000Z',
        '2023-10-16T13:12:0.000Z'
    )

INSERT INTO
    likes_dislikes_comments
VALUES ('u001', 'c003', 0);

UPDATE comments SET likes = 1 WHERE id = 'c003';

INSERT INTO
    likes_dislikes_posts
VALUES ('u001', 'p002', 0);

UPDATE posts SET likes = 1 WHERE id = 'p002';

SELECT
    posts.id,
    posts.content AS conteudo,
    posts.creator_id AS criador,
    comments.id,
    comments.content,
    comments.likes,
    comments.dislikes
FROM comments
    INNER JOIN posts ON comments.post_id = posts.id;

SELECT * FROM
    posts 
INNER JOIN 
    likes_dislikes_posts
ON 
likes_dislikes_posts.post_id = posts.id;