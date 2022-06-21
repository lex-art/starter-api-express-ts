import { Router } from "express";
import AuthRoute from "./routes/auth.route";
const api = Router();

api.get("/", (_, res) => {
	const environment = process.env.NODE_ENV || "development";
	let hostName = "http://localhost:5000";
	if (environment === "production")
		// TODO: add your hostname
		hostName = "https://limitless-ravine-85932.herokuapp.com";
	// TODO: add yours endpoints list
	res.json({
		message: "Welcome API-TEST",
		auth: `${hostName}/api/v1/auth/login`,
	});
});


api.use("/auth", AuthRoute);

export default api;