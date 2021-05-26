const fs = require('fs');
const http = require("http");
const url = require("url");

///////////////////////////////////////
//FILES

//sync and blcoking 
// const fileText = fs.readFileSync("./txt/input.txt", 'utf-8')
// const toBeWritten = `this is what we know  ${fileText}\nCreated on ${Date.now()}`
// fs.writeFileSync("./txt/output.txt", toBeWritten)
// console.log(fileText)

//async and non-blocking
// fs.readFile("./txt/start.txt",  (err, data)=>{ //removed UTF-8 from here
//     if (err) return console.log(err, "ERROR 1 !!!!!!!!!!") 
//     console.log("DATA1:", data, typeof(data) )

//     fs.readFile(`./txt/${data}.txt`, "", (err, data2)=>{
//         if (err) return console.log(err, "ERROR2 !!!!!!!!!!") //doubt: not giving error, buffer data behaving as file contnt
//         console.log("DATA2:", data2)
        
//         fs.readFile("./txt/append.txt", "", (err, data3)=>{
//             console.log("DATA3:", data3)

//             fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, err=>{
//                 console.log("File written!!!!!!!!!!!!!!")
//             })
//         })
//     })
// })
// // , 'utf-8'
// console.log("file reading and writing.....")


///////////////////////////////////////
//SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const parsedData = JSON.parse(data)

const server = http.createServer((req, res)=>{
    const pathName = req.url
    const parsedUrl = url.parse(pathName, true)
    const parsedUrlFalse = url.parse(pathName)
    console.log(pathName, "|", parsedUrl, "|", parsedUrlFalse, "|", typeof(parsedUrl.query.id))
    //ES6 destructuring
    const {pathname, query} = parsedUrl 
    // console.log(pathname, query, "ES6 destructuring")
    // console.log(parsedUrl, "|", typeof(parsedUrl),"|", parsedUrl.query,"|", typeof(parsedUrl.query),"|", parsedUrl.query.id, ".........................")
    if (url==="/" || url==="/product") res.end("This is product")

    else if (url==="/api") {
        //file be read everytime api is hit
        // const data = fs.readFile("./dev-data/data.json", "utf-8", (err, data)=>{
        //     res.writeHead(200, {
        //         'content-type': 'application/json',
        //         'my-own-header': "hello-world"
        //     })
        //     const parsedData = JSON.parse(data)
        //     console.log(typeof(data), typeof(parsedData), parsedData[0].productName, data[0].productName, "???????????????????????/")
        //     res.end(data)
        // })
        res.writeHead(200, {
            'content-type': 'application/json',
            'my-own-header': "hello-world"
        })
        
        console.log(typeof(data), typeof(parsedData), parsedData[0].productName, data[0].productName, "???????????????????????/")
        res.end(parsedData)
    }

    else{
        res.writeHead(404, {
            'content-type': "text/html",
            'my-own-header': "hello-world"
        })
        res.end("<h1>Page not found</h1>")
    } 
})

server.listen(8000, '127.0.0.1', ()=>{
    console.log("Listening to port at 8000")
})