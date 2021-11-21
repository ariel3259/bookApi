import { Router } from "https://deno.land/x/oak/mod.ts";
import con from "../db/dbConnection.ts";
import Books from "../interfaces/Books.ts";

const route : Router = new Router();

route.get("/", context => context.response.body = "hi word");

route.get("/api/books", async context => {
    try{
        const books : Array<Books> = await con.query(`SELECT id,author,title,description FROM books`);
        context.response.body = books;
    }catch(err){
        context.response.status = 500;
        context.response.body = "Something is wrong";
    }
})

route.post("/api/books", async context => {
    const books : Books = await context.request.body().value;
    if(!books.title || !books.author || !books.description){
        context.response.status = 400;
        context.response.body = "Uncomplete data";
        return;
    }
    try{
        await con.query(`INSERT INTO books(title, author, description) VALUES(?, ?, ?)`, [books.title, books.author, books.description]);
        context.response.body = "Added a new book";
    }catch(err){
        context.response.status = 500;
        context.response.body = "Something is wrong";
    }
})

route.put("/api/books", async context => {
    const books : Books = await context.request.body().value;
    if(!books.title || !books.author || !books.description || !books.id){
        context.response.status = 400;
        context.response.body = "Uncomplete data";
        return;
    }
    try{
        await con.query(`UPDATE books SET title = ?, description = ?, author = ? WHERE id LIKE ?`, [books.title, books.description, books.author, books.id]);
        context.response.body = "Modified book";
    }catch(err) {
        context.response.status = 500;
        context.response.body = "Something is wrong";
    }
})

route.delete("/api/books", async context => {
    const id : string | null = context.request.headers.get("id");
    try{    
        await con.query(`DELETE FROM books WHERE id LIKE ?`, [id]);
        context.response.body = "Erased a book";
    }catch(err){
        console.log(err);
        context.response.status = 500; 
        context.response.body = "something is wrong";
    }
})


export default route;