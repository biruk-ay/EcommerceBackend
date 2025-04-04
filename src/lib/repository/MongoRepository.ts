import { Model, Document, Types } from "mongoose";
import IRepository from "./IRepository.js";

export default class MongoRepository<Resource extends Document> implements IRepository<Resource>{
    
    private collectionName: string;
    public model: Model<Resource>;

    constructor(collectionName: string, model: Model<Resource>) {
        this.collectionName = collectionName;
        this.model = model;
    }

    public async createData(resource: Resource) {
        const document = new this.model(resource);
        await document.save();
    }

    public async readData(email: string) {
        const result = await this.model.findOne({ email: email });
        
        return result;
    }


    public async updateData(email: string, resource: Resource) {
        const result = await this.model.findOneAndUpdate({ email: email, resource });
        if (!result) {
            throw new Error(`Resource with ${email} not found for updating`)
        }
    
    }
    public async deleteData(email: string) {
        const result = await this.model.findOneAndDelete({ email: email });
        if (!result) {
            throw new Error(`Resource with ${email} not found for deleting`);
        }
    }

   
    
    
    
}
