const http = require("http");
const app = require("./app");

/**
 * quand on lance un serveur le port peut venir de différente sources
 * la fonction ci-dessous permet de s'assurer que le port qu'on à reçu d'une source respecte bien les normes
 */
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val; // cas où ce n'est pas un nombre
    }

    if (port >= 0) {
        return port; // valeur valide
    }

    return false; // sinon valeur invalide
};

const port = normalizePort(process.env.PORT || 3000);
// on fait la normalisation de la valeur qu'on reçoit pour le port pour cette ligne
app.set("port", port);

const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe" + address : "port:" + port;

    switch (error.code) {
        case "EACCES":
            console.error(bind + " requries elevated privileges.");
            process.exit(1);
            break;

        case "EADDRINUSE":
            console.error(bind + " is already in user");
            process.exit(1);
            break;

        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("listening on " + bind);
});

server.listen(port);
