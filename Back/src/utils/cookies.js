export const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies[process.env.COOKIE_USER]
    }
    return token
}

export const extractedToken = (token) =>{
    const newToken = token.split('token=')[1];
    return newToken
}
