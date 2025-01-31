const fs = require("fs");
const http = require("http");
const PORT = 3033;
const url = require("url");

http.createServer((req, res) => {
    const fullpath = url.parse(req.url, true);
    const pathName = fullpath.pathname;
    const queries = fullpath.query;
    res.writeHead(200, "Working good!", {"Content-Type": "text/html; charset=UTF-8"});

    if (pathName === "/") {
        res.write("<h1>Welcome to the International version!</h1>");
        res.write("<p>Everything's in English here!</p>");
        res.write("<a href='/ita'>Click here for Italian</a>");
        res.write("<a href='/swe'>Click here for Swedish</a>");
        res.write("<a href='/pt'>Click here for Portuguese</a>");
        res.write(
            `<div>
                <p>
                    This page is in English because it's used all over the world and I've tried my best to learn it at the best of my capabilities... 
                    but it's still a work in progress!
                </p>
            </div>`
        );
        res.write(
            `<p>In addition, you can even choose to see the rest in:
                <a href='?lang=gb'>British English</a>, 
                <a href='?lang=us'>American English</a>
                and 
                <a href='?lang=au'>Australian English</a>
            </p>`
        );

        if (queries.lang === "gb") {
            fs.readFile("./data/gb.html", (err, data) => {

                if (err) {
                    res.write("<p>Ooops.. something went wrong</p>");
                } else {
                    res.write(data);
                }

                res.end(); 

            });

        } else if (queries.lang === "us") {
            fs.readFile("./data/us.html", (err, data) => {

                if (err) {
                    res.write("<p>Ooops.. something went wrong</p>");
                } else {
                    res.write(data);
                }

                res.end(); 

            });        
        } else if (queries.lang === "au") {

            fs.readFile("./data/au.html", (err, data) => {
                if (err) {
                    res.write("<p>Ooops.. something went wrong</p>");
                } else {
                    res.write(data);
                }

                res.end(); 

            });   
        } else {
            res.end();
        }

    } else if (req.url === "/ita") { 
        res.write("<h1>Benvenuti alla versione italiana!</h1>");
        res.write("<p>Qui tutto è in italiano!</p>");
        res.write("<a href='/'>Clicca per la versione Internazionale</a>");
        res.write("<a href='/swe'>Clicca per lo Svedese</a>");
        res.write("<a href='/pt'>Clicca per il Portoghese</a>");
        

        fs.readFile('./html/ita.html', (err, data) => { 
            if (err) {
                res.write("<p>Something went wrong</p>");
                res.end();
            } else {
                res.write(data);
                res.end();
            }
        });

    } else if (req.url === "/swe") { 
        res.write("<h1>Välkommen till den svenska versionen!</h1>");
        res.write("<p>Allt är på svenska här!</p>");
        res.write("<a href='/'>Klick för internationell version</a>");
        res.write("<a href='/ita'>Klick här för italienska</a>");
        res.write("<a href='/pt'>Klick här för portugisiska</a>");

        fs.readFile('./html/swe.html', (err, data) => { 
            if (err) {
                res.write("<p>Something went wrong</p>");
                res.end();

            } else {
                res.write(data);
                res.end();
            }
        });
        
    } else if (pathName === "/pt") { 
        res.write("<h1>Bem-vindo à versão em português!</h1>");
        res.write("<p>Está tudo em português aqui!</p>");
        res.write("<a href='/'>Clique para a versão internacional</a>");
        res.write("<a href='/ita'>Clique para italiano</a>");
        res.write("<a href='/swe'>Clique para sueco</a>");
        res.write(
            `<div>
                <p>
                    Questa pagina è in italiano perché è la mia lingua madre e credo che sia senza dubbio la più bella lingua del mondo!
                </p>
            </div>`
        );
        res.write(`<p>Você pode até escolher de ver o resto em:
                <a href='?lang=brpt'>Português brasileiro</a> and
                <a href='?lang=ptpt'>Portugal Português</a>
            </p>`)

        if (queries.lang === "brpt") {
            fs.readFile("./data/brpt.html", (err, data) => {
                if (err) {
                    res.write("<p>Algo deu errado</p>");
                } else {
                    res.write(data);
                }
                res.end();
            });
        } else if (queries.lang === "ptpt") {
            fs.readFile("./data/ptpt.html", (err, data) => {
                if (err) {
                    res.write("<p>Algo deu errado</p>");
                } else {
                    res.write(data);
                }
                res.end();
            });
        } else {
            res.end();
        }


    } else {
        res.write("<h1>Page not found</h1>")
        res.write("<p>Sorry, we're still building the pages to the other languages...</p>")
        res.end();

    }

}).listen(PORT, () => console.log(`Port ${PORT} is up and running!`));