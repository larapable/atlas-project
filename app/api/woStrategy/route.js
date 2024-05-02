import { NextResponse } from "next/server";
import WOStrat from '/models/woStrategy.js';

export async function POST(req) {
    try {
        const body = await req.json();
        const { response } = body;
        console.log("API Response:", response);

        try {
            await WOStrat.postWOStrat(response);
            return NextResponse.json({ message: "W-O Posted." }, { status: 201 });
        } catch (error) {
            console.error("Error posting S-O:", error);
            return NextResponse.json({ message: "An error occurred while posting W-O." }, { status: 500 });
        }
    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json({ message: "An error occurred while handling the request." }, { status: 500 });
    }
}