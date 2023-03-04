import clientPromise from "../../lib/mongodb";

export async function GET() {
	const res = await fetch("https://dummyjson.com/products", {});
	const data = await res.json();

	return data;
}

export async function GET_COMMENTS() {
	const client = await clientPromise;
	const db = client.db("sample_mflix");
	const collection = db.collection("comments");

	const comments = await collection.find({}).toArray();
	return comments;
}
