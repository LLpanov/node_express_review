//
const fs = require('fs');
const path = require('path');
// const {EventEmitter} = require('events');
//
// const one = new EventEmitter();
//
// one.on('click', (name) => {
//     console.log('lock is working',`${name}`)
// });
// // one.emit('click', 'Ivan');
// // one.emit('click', 'Ivan');
// // one.emit('click', 'Ivan');
//
// // once - виконуэ 1 раз і померає
// one.once('Test',(name)=>{
//     console.log('test is working',`${name}`)
// })
// // one.emit('Test', 'Stepan');
// // one.emit('Test', 'Stepan');
// // one.emit('Test', 'Stepan');
//
// console.log(one.eventNames());

// const readStream = fs.createReadStream(path.join(__dirname,'test.txt'));
// readStream.on('data',(chunk)=>{
//     console.log(chunk.toString());
//
// })
// const writeStream = fs.createWriteStream((path.join(__dirname, 'test.txt')));
// for (let i = 0; i < 5000; i++) {
//     writeStream.write('\nNew Data', (e) => {
//         if (e) {
//             console.log(e);
//             throw e;
//         }
//     });
//
//
// }
// writeStream.end();

//
// const readStream = fs.createReadStream(path.join(__dirname,'test.txt'));
// const writeStream = fs.createWriteStream((path.join(__dirname, 'test2.txt')));
//
// readStream.on('data', (chunk) => {
//     writeStream.write(chunk, (err) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     });
//     writeStream.end();
// });

// readStream.pipe(writeStream); - набагато швидше і простіше