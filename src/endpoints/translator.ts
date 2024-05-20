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
                values: ["tw", "cn", "hk", "jp", "twp"],
				default: "tw",
            }),
            to: Query(Str, {
                description: "The language code to translate the text to",
                values: ["tw", "cn", "hk", "jp", "twp"],
				default: "cn",
            }),
		},
		responses: {
			"200": {
				description: "Returns a single task if found",
				contentType: "text/plain; charset=utf-8",
                schema: Str,
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
