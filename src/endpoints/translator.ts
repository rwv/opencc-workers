import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
    Query,
    Str
} from "@cloudflare/itty-router-openapi";
import * as OpenCC from 'opencc-js';

export class Translator extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Translators"],
		summary: "Translate text from TW to CN",
		parameters: {
			text: Query(Str, {
                description: "The text to translate",
				required: true,
				example: "漢語",
            }),
            from: Query(Str, {
                description: "The language code of the text to translate",
                values: ["tw", "cn", "hk", "jp", "twp", "t"],
				default: "tw",
            }),
            to: Query(Str, {
                description: "The language code to translate the text to",
                values: ["tw", "cn", "hk", "jp", "twp", "t"],
				default: "cn",
            }),
		},
		responses: {
			"200": {
				description: "The translated text",
				contentType: "text/plain; charset=utf-8",
                schema: Str,
			},
			"400": {
				description: "Invalid from or to language",
				schema: {
					success: Boolean,
					error: Str
				},
			},
		},
	};

	static converters = new Map<string, OpenCC.ConvertText>();

	async handle(
		request: Request,
		env: Env,
		context: ExecutionContext,
		data: {
			query: {
				text: string;
				from: string;
				to: string;
			};
		}
	) {
		const { from, to, text } = data.query;

		if (from !== "tw" && from !== "cn" && from !== "hk" && from !== "jp" && from !== "twp" && from !== "t") {
			return Response.json(
				{
					success: false,
					error: "Invalid from language",
				},
				{ status: 400 }
			)
		}

		if (to !== "tw" && to !== "cn" && to !== "hk" && to !== "jp" && to !== "twp" && to !== "t") {
			return Response.json(
				{
					success: false,
					error: "Invalid to language",
				},
				{ status: 400 }
			)
		}

		console.log(`Translating ${text} from ${from} to ${to}`);
		const converterKey = `${from}-${to}`;
		let converter = Translator.converters.get(converterKey);
		if (!converter) {
			console.log(`Failed to find converter for ${converterKey}, creating new converter`)
			converter = OpenCC.Converter({ from, to });
			Translator.converters.set(converterKey, converter);
		}

		const converted = converter(text);

		console.log(`Converted text: ${converted}`);

		return new Response(
            converted,
            {
                status: 200,
                headers: {
                    "Content-Type": "text/plain; charset=utf-8",
                },
            }
        );
	}
}
