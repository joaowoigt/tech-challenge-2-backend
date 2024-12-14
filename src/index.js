const Express = require('express')
const publicRoutes = require('./publicRoutes')
const routes = require('./routes')
const connectDB = require('./infra/mongoose/mongooseConect');
const app = new Express()
const UserController = require('./controller/User')
app.use(Express.json())

app.use(publicRoutes)
app.use((req, res, next) => {
    const [_, token] = req.headers['authorization']?.split(' ')
    const user = UserController.getToken(token)
    if (!user) res.status(401).json({ message: 'Token inválido' })
    req.user = user
    next()
})
app.use(routes)

connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
});


module.exports = app