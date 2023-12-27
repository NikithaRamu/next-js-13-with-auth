import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const options = {
providers:[
    GitHubProvider({
        profile(profile){
            console.log("profile gitHub",profile)

            let userRole = "GitHub User"
            if(profile?.email == 'nikitharamu992@gmail.com')
            {
                userRole = 'admin'
            }

            return{
                ...profile,
                role : userRole,
            }
        },
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
        profile(profile){
            console.log("google profile",profile)

            let userRole = "Google User"
            return{
                ...profile,
                id: profile.sub,
                role : userRole,
            }
        },
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    })
],
callbacks :{
    //below for using in server
    async jwt({token,user})
    {
        if(user)
        {
            token.role = user.role
            
        }
        return token
    },
    //below for using in client
    async session({session,token}){
        if(session?.user)
        {
            session.user.role = token.role
           
        }
        return session
    }
}
}