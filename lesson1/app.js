// const path = require('path');
// // const os = require('os');
//
// const joinedPath = path.join(__dirname,'test', 'test2', 'files', 'public');
// console.log(joinedPath);

// const norman = path.normalize('test//files/\/public//text.txt');
// console.log(norman,'normalize')
//
// const resolverPath = path.resolve('test///files///public//file.txt')
// console.log(resolverPath,'resolve')
// console.log(os.cpus())
// console.log(os.cpus().length);
// console.log(os.arch());

// const fs = require('fs');
// fs.writeFileSync(path.join(__dirname, 'files', 'file.txt'), 'some data');
// fs.writeFile(path.join(__dirname, 'files', 'file2.txt'),'some data2',(err)=>{
//     if(err){
//         console.log(err);
//         throw err;
//     }
//     console.log('23')
// })
// fs.readFile(path.join(__dirname,'files','file2.txt'),'utf8',(err,data)=>{
//     if(err){
//         console.log(err);
//         throw err;
//     }
//     console.log(data)
// })
// for (let i = 0; i < 100; i++) {
//
//     fs.appendFile(path.join(__dirname,'files','file2.txt'),'\nNew Data',{flag:'w'},(err)=>{
//         if(err){
//             console.log(err);
//             throw err;
//         }
//     })
// }
// fs.truncate(path.join(__dirname,'files','file2.txt'),(err)=>{
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// })
//
// fs.mkdir(path.join(__dirname,'public','files','test','test2'),{recursive:true},(err)=>{
//     if (err){
//         console.log(err);
//         throw err
//     }
// })
// fs.rmdir(path.join(__dirname,'public','files','test','test2'),(err)=>{
//     if (err){
//         console.log(err);
//         throw err
//     }
// })
// fs.readdir(path.join(__dirname,'public'),(err,data)=>{
//   console.log(data)
// })
// fs.rename(path.join(__dirname,'public','files','test','someThe.txt'),path.join(__dirname,'files','someThe.txt'),(err)=>{
// //     if(err){
// //         console.log(err);
// //         throw err;
// //     }
// // })

// ____________________________________________________________HOMEWORKER_________________________________________
// Homework 1
// // //
// // //     Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)
// // // Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
// // // Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user
// // // ({. name: "Andrii", age: 22, city: "Lvov" }),  відповідно перший - onlineUsers, другий - inPersonUsers;
// // // і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів,
// // // але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.
// // //
// // // Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу.
// // // (ті, що були в папці inPerson будуть в папці online)
// //

// Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)
// // // Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
//
// const path = require('path');
// const fs = require('fs');
//
// const create = () => {
//     fs.mkdir(path.join(__dirname, 'Hm','main', 'online'), {recursive: true}, (err) => {
//         if (err) {
//             console.log(err);
//             throw err
//         }
//         fs.mkdir(path.join(__dirname, 'Hm','main', 'inPerson'), (err) => {
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//             }
//         );
//     });
// }
// create()

// Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user
// // // ({. name: "Andrii", age: 22, city: "Lvov" }),  відповідно перший - onlineUsers, другий - inPersonUsers;
// // // і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів,
// // // але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.
//
// const onlineUsers = [{name: "Andrii", age: 22, city: "Lvov"}];
// const inPersonUsers = [{name: "Vasya", age: 23, city: "Kyiv"}];
//
// //
// String.prototype.firstLetterToUppercase = function() {
//     return this[0].toUpperCase() + this.slice(1);
// }
//
// async function FileApend () {
// await onlineUsers.forEach(user => {
//     for (let value in user) {
//      fs.appendFile(path.join(__dirname,'Hm','main','online','file.txt'),`\n${value.firstLetterToUppercase()}---${user[value]}`,(err)=>{
//           if (err){
//               console.log(err)
//               throw err
//           }
//       })
//
//     }
// });
//      inPersonUsers.forEach(user => {
//         for (let value in user) {
//             fs.appendFile(path.join(__dirname,'Hm','main','inPerson','file2.txt'),`\n${value.firstLetterToUppercase()}---${user[value]}`,(err)=>{
//                 if (err){
//                     console.log(err)
//                     throw err
//                 }
//             })
//
//         }
//     });
//
//
// };
//
// FileApend().then()

// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу.
// // // (ті, що були в папці inPerson будуть в папці online)
// //
// const reWrite = () => {
//
//     fs.readFile(path.join(__dirname, 'Hm', 'main', 'inPerson', 'file2.txt'), (error, data1) => {
//         if (error) {
//             console.log(error)
//             throw error
//         }
//         fs.readFile(path.join(__dirname, 'Hm',  'main', 'online', 'file.txt'), (error, data2) => {
//             if (error) {
//                 console.log(error)
//                 throw error
//             }
//             fs.writeFile(path.join(__dirname,  'Hm', 'main', 'online', 'file.txt'), data1, error => {
//                 if (error) {
//                     console.log(error)
//                     throw error
//                 }
//             })
//             fs.writeFile(path.join(__dirname, 'Hm', 'main', 'inPerson', 'file2.txt'), data2, error => {
//                 if (error) {
//                     console.log(error)
//                     throw error
//                 }
//             })
//         })
//     })
//
// }
// reWrite()
//
//
///////////////////////////////////////////////////////////////////////////Classwork////////////////////?

// 1 1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і
// одразу, дані які ви отримали запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// // як можна це обійти, але поки зробіть так

const fs = require('fs');
const path = require('path');

// const CreateReadChange = async () => {
// try {
//     await fs.mkdir(path.join(__dirname, 'Cw'), (err) => {
//         console.log(err)
//     })
//     await fs.writeFile(path.join(__dirname, 'Cw', 'text.txt'), 'some text', (err) => {
//         console.log(err);
//     })
//     await fs.readFile(path.join(__dirname,'Cw', 'text.txt'),(err,data)=>{
//         console.log(err);
//         fs.writeFile(path.join(__dirname,'Cw', 'text2.txt'),`${data}`,(err)=>{
//             console.log(err)
//         })
//         fs.rmdir
//     })
//
// }catch (e) {
//     throw e
//
// }
//
// }
// CreateReadChange().then();


// 2.2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього
// і перенесіть їх в нову папку та файл в ній, старий файл видаліть після того як все завершиться. Також вийде callback hell


// const CreateReadDeleted = () => {
//
//     fs.mkdir(path.join(__dirname, 'Cw', 'file'), (err) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         fs.writeFile(path.join(__dirname, 'Cw', 'file', 'new.txt'), 'bla-bla-bla', (err) => {
//             if (err) {
//                 console.log(err);
//                 throw err;
//             }
//             fs.readFile(path.join(__dirname, 'Cw', 'file', 'new.txt'), 'utf8', (err, data) => {
//                 if (err) {
//                     console.log(err);
//                     throw err;
//                 }
//                 fs.mkdir(path.join(__dirname, 'Cw', 'newfile'), (err) => {
//
//                     if (err) {
//                         console.log(err);
//                         throw err;
//                     }
//                     fs.writeFile(path.join(__dirname, 'Cw', 'newfile', 'new2.txt'), `${data}`, (err) => {
//                         if (err) {
//                             console.log(err);
//                             throw err;
//                         }
//                         fs.unlink(path.join(__dirname, 'Cw', 'file', 'new.txt'), (err) => {
//                             console.log(err);
//                             throw err;
//                         })
//
//                     });
//                 });
//             });
//         });
//     });
// }
//
// CreateReadDeleted();

// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані
// (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли
// тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки,
//     вам потрібно їх перейменувати і додати до назви префікс _new
//
// const CreateFolderFile = () => {
//     fs.mkdir(path.join(__dirname, 'Cw', 'folder','emptyfolder'), {recursive: true}, (err) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//             for (let i = 0; i < 10; i++) {
//                 fs.appendFile(path.join(__dirname, 'Cw', 'folder', 'some.txt'), '\nget lost', (err) => {
//                     if (err) {
//                         console.log(err);
//                         throw err;
//                     }
//                 })
//             }
//
//     });
//
// }
// CreateFolderFile()
//
// const checkStatus = () => {
//     fs.readdir(path.join(__dirname, 'Cw', 'folder'), (err, data) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//         for (const file of data) {
//             fs.stat(path.join(__dirname, 'Cw', 'folder', `${file}`), (err, stats) => {
//                     console.log(file);
//
//                 if (stats.isFile()) {
//
//                    fs.truncate(path.join(__dirname, 'Cw', 'folder', `${file}`), (err,) => {
//                         if (err) {
//                             console.log(err);
//                             throw err;
//                         }
//
//                             });
//                         }  else if(stats.isDirectory()) {
//                             fs.rename(path.join(__dirname, 'Cw', 'folder', `${file}`), path.join(__dirname, 'Cw', 'folder', `_new_${file}`), (err) => {
//                                 if (err) {
//                                     console.log(err);
//                                     throw err;
//                                 }
//
//                     });
//                 }
//
//             })
//         }
//     });
// }
// checkStatus();
//
//
