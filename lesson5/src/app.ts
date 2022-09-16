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
import express from 'express';
import { createConnection } from 'typeorm';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

// app.get('/users', async (req: Request, res: Response) => {
//     // await getManager().getRepository()
//     // res.end();
// });

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
