const path = require('path');
// const os = require('os');
//
// const joinePath = path.join(__dirname,'test', 'test2', 'files', 'public');
// console.log(joinePath);

// const norman = path.normalize('test//files/\/public//text.txt');
// console.log(norman,'normalize')
//
// const resolverPath = path.resolve('test///files///public//file.txt')
// console.log(resolverPath,'resolve')
// console.log(os.cpus())
// console.log(os.cpus().length);
// console.log(os.arch());

const fs = require('fs');
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