export default async function getUserProfile(token:string) {
    const responses = await fetch("http://localhost:5000/api/v1/auth/me", {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if(!responses.ok){
        throw new Error("Failed to fetch user profile")
    }
    return await responses.json()
}