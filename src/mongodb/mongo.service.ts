import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import LogInterface from '../interfaces/log/log.interface';

export const collections: { b9system?: mongoDB.Collection }  = {}  

export async function connectToDatabase () {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING || '');
          
  await client.connect();
      
  const db: mongoDB.Db = client.db(process.env.DB_NAME || '');
 
  const b9systemCollection: mongoDB.Collection = db.collection(process.env.B9SYSTEM_COLLECTION_NAME || '');

  collections.b9system = b9systemCollection;
     
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${b9systemCollection.collectionName}`);
  
  await client.close();
}

  export class LogService {

    static async logCreate (data: LogInterface) { 
      console.log(data) 
      await connectToDatabase ().then( async () => {
        await collections.b9system?.insertOne(data)
      })       
    }
  }
