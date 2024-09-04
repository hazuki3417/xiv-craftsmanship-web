import { NextResponse } from "next/server";

/**
 * proxy POST request to GraphQL API (xiv-craftsmanship-api)
 */
export async function POST(request: Request) {
	const body = await request.json();

	/**
	 * TODO: csrfトークンの検証
	 */

	const url = `${process.env.API_URL}/graphql`;
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return NextResponse.json(data);
}
