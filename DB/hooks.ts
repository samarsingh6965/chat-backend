import {MediaRefModel} from '../Models'
interface Imodel {
    post: (arg0: string, arg1: (doc: { [_id: string]: any; _id: any; }, next: () => void
    ) => void) => void;
}
const ArrayBuilder = (doc:{ [_id: string]: any; _id: any; },modelName:string,keys:any) => {
    let mediaRefData:{media:string,ref:string,ref_id:string}[] = [];
    for(let key of keys){
        if(doc[key]){
            if(Array.isArray(doc[key])){
                for(let _id of doc[key]){
                    if(_id && modelName && doc._id){
                        mediaRefData.push({
                            media:_id,
                            ref:modelName,
                            ref_id:doc._id
                        })
                    }   
                }
            }else{
                if(doc[key] && modelName &&doc._id){
                    mediaRefData.push({
                        media:doc[key],
                        ref:modelName,
                        ref_id:doc._id
                    })
                }
            }
        }
    }
    return mediaRefData;
}
const mediaRef = (model:Imodel,modelName: string, keys: any)=>{
    model.post('save', (doc: { [_id: string]: any; _id: any; }, next: () => void)=>{
        MediaRefModel.insertMany(ArrayBuilder(doc,modelName,keys))
        next();
    })
    model.post('findOneAndUpdate', (doc: { [_id: string]: any; _id: any; }, next: () => void)=>{
        MediaRefModel.insertMany(ArrayBuilder(doc,modelName,keys))
        next();
    })
}
export const Hooks = {
    mediaRef
}