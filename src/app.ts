import express, { Response, NextFunction} from "express";
import dotenv from "dotenv";
import morgan from "morgan"; // lleva registros de la peticiones
import helmet from "helmet"; // ayuda a proteger la aplicación de algunas vulnerabilidades web conocidas mediante el establecimiento correcto de cabeceras HTTP
import cors from "cors";
import path from "path";
import { notFound, errorHandler } from "./middleware";
import api from "./api";
dotenv.config(); // Esta es una forma consisa de configurar variables de entorno en un proceso de Node js

const app = express();
// use middlewares
app.use(morgan("dev")); // muestra los registros de las peticiones
app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
	})
); // ayuda a proteger la aplicación de algunas vulnerabilidades web conocidas mediante el establecimiento correcto de cabeceras HTTP
app.use(cors());
app.use((_, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header(
		"Cross-Origin-Resource-Policy", "same-site"
	);
	res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});
app.use(express.json({ limit: "5mb" })); // middleware que transforma un body a un json
app.get("/", async (_, res: Response) => {
    res.sendFile(path.join(__dirname, "./views/index.html"));
});


app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

export default app;