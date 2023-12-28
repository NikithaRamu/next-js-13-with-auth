import {NextResponse} from "next/server"
import User from "@/app/models/User"
import bcrypt from "bcrypt"

export async function POST(req)
{
    try{
        const body = await req.json()
        const userData = body.formData
        if(!userData.email || !userData.password)
        {
            return NextResponse.json({message:"All fields required"},{status:400})
        }
        const hasPass = await bcrypt.hash(userData.password,10)
        userData.password = hashPass;
        await User.create(userData);
        return NextResponse.json({message:"User created"},{status:201})
    }

    catch(error)
    {
        console.log(error)
        return NextResponse.json({message:"Error",error},{status:500})
    }
}
