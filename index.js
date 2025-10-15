import { obtenerProductos, obtenerProducto, eliminarProducto, actualizarProducto, agregarProducto } from "./metodosFakeApi.js";

// Obtener los argumentos de la línea de comandos
const args = process.argv.slice(2);
const metodoHTTP = (args[0] || '').toUpperCase();
const parametroHTTP = (args[1] || '');

// Función principal asincrónica
async function main() {

    // ------------------ GET ------------------
    if (metodoHTTP === "GET") {
        if (parametroHTTP.toLowerCase() === "products") {
            await obtenerProductos();
        } else if (parametroHTTP.toLowerCase().startsWith("products/")) {
            // // extraer solo el ID
            // const id = parametroHTTP.split("/")[1];
            await obtenerProducto(parametroHTTP);
        } else {
            console.log("⚠️ Parámetro no reconocido para GET");
        }
    }

    // ------------------ POST ------------------
    else if (metodoHTTP === "POST") {
        if (parametroHTTP.toLowerCase() === "products") {
            // elimino los dos primeros que corresponde al methodo y parametro
            // hago destructuring para obtener datos del producto
            const [title, price, category] = args.slice(2);
            if (!title || !price || !category) {
                console.log("⚠️ Faltan datos: npm run start POST products <title> <price> <category>");
            } else {
                const producto = { title, price, category };
                await agregarProducto(producto);
            }
        } else {
            console.log("⚠️ Parámetro no reconocido para POST");
        }
    }

    // ------------------ PUT ------------------
    else if (metodoHTTP === "PUT") {
        if (parametroHTTP.toLowerCase().startsWith("products/")) {
            const id = parametroHTTP.split("/")[1];
            const [title, price, category] = args.slice(2);

            if (!id || !title || !price || !category) {
                console.log("⚠️ Uso correcto: npm run start PUT products/<id> <title> <price> <category>");
            } else {
                const producto = { id, title, price, category };
                await actualizarProducto(producto);
            }
        } else {
            console.log("⚠️ Parámetro no reconocido para PUT");
        }
    }

    // ------------------ DELETE ------------------
    else if (metodoHTTP === "DELETE") {
        if (parametroHTTP.toLowerCase().startsWith("products/")) {
            // const id = parametroHTTP.split("/")[1];
            await eliminarProducto(parametroHTTP);
        } else {
            console.log("⚠️ Uso correcto: npm run start DELETE products/<id>");
        }
    }

    else {
        console.log("⚠️ Método no reconocido. Usa GET, POST, PUT o DELETE.");
    }
}

// Ejecutar la función principal
main();
