import multer from 'multer'
import fs from 'node:fs'

export const upload = multer({ dest: './src/public/img/products' })

export const changeNameImg = (file) => {
    const newPath = `./src/public/img/products/${file.originalname}`
    fs.renameSync(file.path, newPath)
    return newPath
}
