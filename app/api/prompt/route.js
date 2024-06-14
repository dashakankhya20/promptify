import { connectionToDB } from "@utils/database";
import Prompt from "@models/prompt";

// For GET request in API route
// Getting all the prompts
export const dynamic = 'force-dynamic';
export const GET = async (req, res) => {
    try {
        await connectionToDB();
        const prompts = await Prompt.find({}).populate('creator');
        
        return new Response(JSON.stringify(prompts), {
            status: 200
        });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}
