import basicAuth from "basic-auth";
import GLOBALS from "../config/constants.js";
import statusCode from "../config/statusCode.js";
import english from "../languages/en.js";

const authenticatedDocument = (req,res,next)=>{
    const credintial = basicAuth(req)
    
    if (
        !credintial || credintial.name !== GLOBALS.SWAGGER_USERNAME ||
        credintial.pass !== GLOBALS.SWAGGER_PASSWORD
    ) {
        {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.status(statusCode.UNAUTHORIZED).send(english.INVALID_CREDENTIAL);
    }
    } else {
        next();
    }
}

export default {
    authenticatedDocument
}