import multer from 'multer'
import __dirname  from '../path.js'

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, `${__dirname}/public/img/products`)
        },
        filename: (req, file, cb) => {
            cb(null, `${file.originalname}`)
        }
    }
)

export const upload = multer({
    storage,
})
