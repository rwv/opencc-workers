import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { Translator } from "./endpoints/translator";

export const router = OpenAPIRouter({
	docs_url: "/",
});

router.get("/translate", Translator);

// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

export default {
	fetch: router.handle,
};
