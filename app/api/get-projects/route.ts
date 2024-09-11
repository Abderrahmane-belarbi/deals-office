import { connectToDatabase } from "@/lib/mongoose";
import Project from "@/database/project.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connectToDatabase();

  // Extract the search term from the query parameters
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('search') || ''; // Default to an empty string if no search term is provided
  
  const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regex from the search term

  try {
    let query: any = {};
    if (regex) {
      query = {
        name: { $regex: regex, $options: 'i' } // Case-insensitive search for 'name'
      };
    }

    const projects = await Project.find(query); // Fetch all projects that match the filter
    console.log('projects:', projects);
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch projects." }, { status: 500 });
  }
}
