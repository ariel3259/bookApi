import { Application } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import books from "./routes/books.ts";

const app : Application = new Application ();

app.use(oakCors());

app.use(books.routes());


console.log("SERVER ONLINE ON PORT 8000")
app.listen({port:8000})