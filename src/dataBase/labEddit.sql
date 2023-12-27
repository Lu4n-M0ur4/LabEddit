-- Active: 1703699147838@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE  NOT NULL,
        name TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT NOT NULL
    );

CREATE TABLE
    posts(
    id TEXT UNIQUE NOT NULL PRIMARY KEY,
    creator_id TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT(0),
    dislikes INTEGER NOT NULL DEFAULT(0),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    coments(
    id TEXT PRIMARY KEY UNIQUE  NOT NULL,
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
    likes_dislikes_coments(
    user_id TEXT NOT NULL,
    coments_id TEXT NOT NULL,
    like INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (coments_id) REFERENCES coments (id) ON UPDATE CASCADE ON DELETE CASCADE
    )

CREATE TABLE
    likes_dislikes_posts(user_id TEXT NOT NULL,
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
VALUES
(
        'p001',
        'u001',
        'Olá Mundo',
        0,
        0,
        '2023-10-16T13:00:0.000Z',
        '2023-10-16T13:00:0.000Z'
    ), (
        'p002',
        'u002',
        'Olá Galera da minha rede',
        0,
        0,
        '2023-10-16T13:00:0.000Z',
        '2023-10-16T13:00:0.000Z'
    );


INSERT INTO coments
VALUES
(
        'c001',
        'u001',
        'p001',
        'Parabens pelo seu primeiro passo',
        0,
        0,
        '2023-10-16T13:00:0.000Z',
        '2023-10-16T13:00:0.000Z'
    );

    INSERT INTO coments
    VALUES
    (
        'c002',
        'u001',
        'p001',
        'Continue postando seu avanço',
        0,
        0,
        '2023-10-16T13:10:0.000Z',
        '2023-10-16T13:10:0.000Z'
    );

    INSERT INTO coments
    VALUES
    (
        'c003',
        'u002',
        'p001',
        'Caramba comentando no proprio post',
        0,
        0,
        '2023-10-16T13:12:0.000Z',
        '2023-10-16T13:12:0.000Z'
    )


    INSERT INTO likes_dislikes_coments VALUES (
        'u001',
        'c003',
        0
    );

    UPDATE coments SET likes = 1 WHERE id = 'c003';

    

    SELECT * FROM posts INNER JOIN coments ON coments.post_id = posts.id

    SELECT * FROM coments INNER JOIN likes_dislikes_coments ON coments.id = likes_dislikes_coments.coments_id

    