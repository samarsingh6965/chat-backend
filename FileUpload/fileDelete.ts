import fs from 'fs';
import ServerResponseClass from "../ServerResponse/ServerResponse";
const response = new ServerResponseClass();

export const deletefile = async (file:any) => {
    try {
        fs.unlink(file.url,(err:any)=>{
            if(err){
                response.handleNotFound(err,'notFound')
            }
        })
    } catch (error) {
        console.error(error)
    }
}