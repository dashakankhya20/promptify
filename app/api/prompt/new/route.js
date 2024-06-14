import { connectionToDB } from '@utils/database';
import Prompt from '@models/prompt';

// creating a new prompt
export const POST = async (req) => {
    const { userId, prompt, tag} = await req.json();

    try{
        await connectionToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })
        //for saving the document
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), {
            status:201
        })
    }catch(error){
        return new Response("Failed to create a new prompt", {status: 500})
    }
}