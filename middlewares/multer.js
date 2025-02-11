import multer from 'multer'
import fs from 'fs'

const path = './uploads'

if(!fs.existsSync(path)){
    fs.mkdirSync(path)
}

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads')
    },
    filename : function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.random(Math.random()*1e9)
        cb(null,uniqueSuffix + file.originalname)
    }
})

const upload = multer({storage : storage})

export default upload