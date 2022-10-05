"use strict";
// на typeorm 0.3 не вийшло нормально прорисати скрипти і помилка з шляхами перейшов на 0.2 версію!
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1)Повторіть всі ендпоінти як в мене
// 2)Створіть міграцію для таблиці comments, яка буде мати такі поля
// (id, text, authorId, postId, like, dislike, createdAt,deletedAt),
// відповідно звязок з таблицею юзерс і постс
// 3)Створіть ендпоінт get /posts/userId - який буде виводити пости якогось юзера який їх створив
// 4)update /posts/userId можна оновити текст про пост
// 5)get comments/userId вивести коментарі які належать юзеру який їх написав і пости в яких вони
// написані (якщо через квері почитаєте як там зробити мulti select)
// *6) update /comments/action написати ендпоінт який буде приймати в body commentId,
// action(like, dislike) і оновлювати в бд інформацію про кількість лайків і дизлайків в коментарі
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const post_1 = require("./entity/post");
const comments_1 = require("./entity/comments");
const apiRouter_1 = require("./router/apiRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(apiRouter_1.apiRouter);
// Get all Users include posts and comments
app.get('/users', async (req, res) => {
    const users = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .find({ relations: ['posts', 'comments'] });
    res.json(users);
});
// Get All Posts include Comments
app.get('/posts', async (reg, res) => {
    const posts = await (0, typeorm_1.getManager)().getRepository(post_1.Post).find({ relations: ['comments'] });
    res.json(posts);
});
// get Post by userId
app.get('/posts/:userId', async (req, res) => {
    const postById = await (0, typeorm_1.getManager)()
        .getRepository(post_1.Post)
        .find({ userId: Number(req.params.userId) });
    res.json(postById);
});
// update posts column text
app.put('/posts/:userId', async (req, res) => {
    const { text } = req.body;
    const updatePost = await (0, typeorm_1.getManager)()
        .getRepository(post_1.Post)
        .update({ userId: Number(req.params.userId) }, { text });
    res.json(updatePost);
});
// get all comments
app.get('/comments', async (req, res) => {
    const comments = await (0, typeorm_1.getManager)().getRepository(comments_1.Comment).find();
    res.json(comments);
});
// Find comment by user
// app.get('/comments/:authorId', async (req, res) => {
//     const commentsById = await getManager().getRepository(Comment)
//         .find({ authorId: Number(req.params.authorId) });
//     res.json(commentsById);
// });
// find comments by user query
app.get('/comments/:userId', async (req, res) => {
    const queryCommentsById = await (0, typeorm_1.getManager)()
        .getRepository(comments_1.Comment)
        .createQueryBuilder('comment')
        .where('comment.authorId = :id', { id: +req.params.userId })
        .leftJoinAndSelect('comment.user', 'user')
        .getMany();
    res.json(queryCommentsById);
});
// знайти юзера з певним параметром вказуэм у where
// app.get('/users', async (req: Request, res: Response) => {
//     const getOneUser = await getManager()
//         .getRepository(User)
//         .findOne({
//             where: { firstName: 'Angelo' },
//         });
//     res.json(getOneUser);
// });
// Create users and save in base
// app.post('/users', async (req, res) => {
//     const createdUser = await getManager().getRepository(User).save(req.body);
//     res.json(createdUser);
// });
// Update users password and email in base
app.put('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const updateUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).update({ id: Number(req.params.id) }, {
        password, email,
    });
    res.json(updateUser);
});
// delete users post
app.delete('/posts/:userId', async (req, res) => {
    const deletePost = await (0, typeorm_1.getManager)()
        .getRepository(post_1.Post)
        .delete({ userId: Number(req.params.userId) });
    res.json(deletePost);
});
// action like dislike
app.post('/comments/action', async (req, res) => {
    const { action, commentId } = req.body;
    const queryRunner = (0, typeorm_1.getManager)().getRepository(comments_1.Comment);
    const comment = await queryRunner.createQueryBuilder('comment')
        .where('comment.id = :id', { id: commentId }).getOne();
    if (!comment) {
        throw new Error('wrong comment id');
    }
    if (action === 'like') {
        await queryRunner.update({ id: commentId }, { like: comment.like + 1 });
    }
    if (action === 'dislike') {
        await queryRunner.update({ id: commentId }, { dislike: comment.dislike + 1 });
    }
    res.sendStatus(201);
});
// Delete users in base
// app.delete('/users/:id', async (req: Request, res: Response) => {
//     const deleteUsers = await getManager()
//         .getRepository(User)
//         .delete({ id: Number(req.body.id) });
//     res.json(deleteUsers);
// });
// Delete users and save his information in base(softDelete)
app.delete('/users/:id', async (req, res) => {
    const deleteUsers = await (0, typeorm_1.getManager)()
        .getRepository(user_1.User)
        .softDelete({ id: Number(req.body.id) });
    res.json(deleteUsers);
});
app.listen(7777, async () => {
    console.log('Serves has started on PORT: http://localhost:7777');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('database connect');
        }
    }
    catch (err) {
        if (err)
            console.log(err);
    }
});
//# sourceMappingURL=app.js.map