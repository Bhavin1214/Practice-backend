import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
// import swaggerJSDoc from "swagger-jsdoc";
import mongoose from "mongoose";
import GLOBALS from "./config/constants.js"
import authenticatedDoc from "./middleware/authenticatedDoc.js";
import userRoute from "./modules/v1/auth/routes/userRoute.js"
import postRoute from "./modules/v1/post/postRoute.js"
import fs from "fs"
import apidoc from "./document/v1/swagger-doc.json"assert { type: 'json' };
const app = express();
app.use(express.json())
app.use(express.text());
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extends:true}))


app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)

/////////////////////////////////         SWAGGER        ///////////////////////////////////////////////

var options = {};
const swaggerDocument = JSON.parse(fs.readFileSync("./document/v1/swagger-doc.json", 'utf-8'));

app.use(
    '/api-docs-v1',
    authenticatedDoc.authenticatedDocument,
    swaggerUi.serveFiles(swaggerDocument, options),
    swaggerUi.setup(swaggerDocument)
);

/////////////////////////////////       DATABASE        ///////////////////////////////////////////

mongoose.connect(GLOBALS.MONGO_URL).
then(()=>{
  console.log("database is connected");
}).
catch((err)=>{
  console.log(err);
  
})

try {
    const server = app.listen(GLOBALS.PORT,()=>{
        console.log("server is running on port",GLOBALS.PORT);
    })
} catch (error) {
    console.log("failed to connect. something went wrong");
}