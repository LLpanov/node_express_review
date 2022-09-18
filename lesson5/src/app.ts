// на typeorm 0.3 не вийшло нормально прорисати скрипти і помилка з шляхами перейшов на 0.2 версію!

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

import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req: Request, res: Response) => {
    const users = await getManager()
        .getRepository(User)
        .find({ relations: ['posts'] });
    res.json(users);
});

// app.get('/users', async (req: Request, res: Response) => {
//     const getOneUser = await getManager()
//         .getRepository(User)
//         .findOne({
//             where: { firstName: 'Angelo' },
//         });
//     res.json(getOneUser);
// });

app.post('/users', async (req, res) => {
    const createdUser = await getManager().getRepository(User).save(req.body);
    res.json(createdUser);
});

app.put('/users/:id', async (req, res) => {
    const [password, email] = req.body;
    const updateUser = await getManager().getRepository(User).update(
        { id: Number(req.params.id) },
        {
            password, email,
        },
    );
    res.json(updateUser);
});
// app.delete('/users/:id', async (req: Request, res: Response) => {
//     const deleteUsers = await getManager()
//         .getRepository(User)
//         .delete({ id: Number(req.body.id) });
//     res.json(deleteUsers);
// });
app.delete('/users/:id', async (req: Request, res: Response) => {
    const deleteUsers = await getManager()
        .getRepository(User)
        .softDelete({ id: Number(req.body.id) });
    res.json(deleteUsers);
});
app.listen(1111, async () => {
    console.log('Serves has started on PORT: http://localhost:1111');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('database connect');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
