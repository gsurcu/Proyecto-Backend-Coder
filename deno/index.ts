// import * as mod from "https://deno.land/std@0.95.0/datetime/mod.ts";

// const myDate = mod.parse('04-07-2021','dd-mm-yyyy');
// const sayHello = (name: string): string => `Hello ${name}`;

// console.log(sayHello('Pablo'), ' :',myDate);

// console.log(Deno.args)

// const port = Number(Deno.env.get("PORT")) || 8080
// console.log(port)

// await Deno.writeTextFile("test.txt", "Hola, Coder con Deno");
// for (const req of s) {
  //   req.respond({ body: "Hello Deno Server"})
  // }
import { serve } from "https://deno.land/std@0.145.0/http/mod.ts";
import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";

const  PORT = 8080;

const handler = (req: Request): Response => {
  const body = 'Hello Deno Server';
  return new Response(body, { status: 200 });
}
await serve(handler, { port: PORT});

console.log(`Server is up and running on port ${PORT}`);