import dotenv from "dotenv"
dotenv.config()

const GLOBALS = {
        PORT:process.env.PORT,
        MONGO_URL:process.env.MONGO_URL,
        SWAGGER_USERNAME:process.env.SWAGGER_USERNAME,
        SWAGGER_PASSWORD:process.env.SWAGGER_PASSWORD,
        KEY:process.env.KEY,
        IV:process.env.IV,
        JWT_SECRET:process.env.JWT_SECRET,
        JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN
}

export default GLOBALS