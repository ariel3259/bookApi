import { Client } from "https://deno.land/x/mysql/mod.ts";

const con : Client = await new Client().connect({
    hostname : "localhost",
    username : "root",
    password : "1234",
    db : "books_db"
});

export default con; 