export const authorization = (rol) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ error: 'unauthorized' })
        if (req.user.rol != rol) return res.status(403).send({ error: 'no permissions' })
        next()
    }
}
