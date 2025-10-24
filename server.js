const http = require("http");
const app = require("./app");

/*
 * reçoit en paramètre la valeur du port à normaliser
 * convertir cette valeur en entier pour s'assurer qu'elle correspond bien au format normal de la valeur d'un port
 * si après conversion, port n'est pas un nombre alors il faudra retourner value comme reçu
 * si après conversion port est supérieur ou égal à zero alors tu retourne la valeur de port (value convertit) car elle correspond à ce qu'on attend
 * si non default, tu retourne false
 */
const normalizePort = (value) => {
    const port = parseInt(value, 10);

    if (isNaN(port)) {
        return value;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

const errorHandler = (error) => {
    if (error.syscall != "listen") {
        throw error;
    }

    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe: " + address : "port: " + port;

    switch (error.code) {
        case "EACCESS":
            console.error(bind + " vous n'avez les privilèges requis.");
            process.exit(1);
            break;

        case "EADDRINUSE":
            console.error(
                bind + " cette addresse est déjà en cours d'utilisation."
            );
            process.exit(1);
            break;

        default:
            throw error;
    }
};

const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe: " + address : "port: " + port;

    console.log("Votre server a bien été lancé. " + bind);
});
server.listen(port);
