import { MongoClient, Document } from "mongodb";

const url: string = `${process.env.MONGO_URL}`;
const port: string = `${process.env.MONGO_PORT}`
const client = new MongoClient(`mongodb://${url}:${port}/`);

export async function getCoordinates() {
    
    try {
        await client.connect();
        const database = client.db("locations");
        const cities = database.collection("cities");

        const query = [{$sample: {size: 40}}]; 
        const result = await cities.aggregate(query).toArray();

        const coordinates = result.map((city:Document)=>{
            return {
                city: city.name,
                country: city.country,
                coord: city.coord
            };
        });
        return coordinates;
        
    } catch (error) {
        return error;
    } finally {
        await client.close();
    }
}

