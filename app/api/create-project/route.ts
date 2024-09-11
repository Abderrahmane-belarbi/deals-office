import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Project from '@/database/project.model';

export async function POST(request: NextRequest) {
  // Parse the form data
  const formData = await request.formData();
  
  // Extract fields from form data
  const procedureFile = formData.get('procedureFile') as File;
  const title = formData.get('title') as string;
  const technicalCardFile = formData.get('technicalCardFile') as File;
  const notebookFile = formData.get('notebookFile') as File;
  const selectedDate = formData.get('selectedDate') as string; // Assuming it's in ISO format
  const selectedProcedure = formData.get('selectedProcedure') as string;
  const estimatedAmount = formData.get('estimatedAmount') as string;
  const selectedSource = formData.get('selectedSource') as string;
  const year = formData.get('year') as String; // Matching the front-end 'year' key

  // Validate required fields
  if (!title || !estimatedAmount || !selectedDate || !selectedProcedure || !selectedSource || !procedureFile || !technicalCardFile || !notebookFile || !year) {
    return NextResponse.json({ message: "All fields are required." }, { status: 400 });
  }

  await connectToDatabase();

  try {
    // Create a new project
    const project = await Project.create({
      title,
      estimatedAmount,
      selectedDate,
      selectedProcedure,
      selectedSource,
      route: `E:/BM/${year}/${title}`
      // Handle file uploads if needed
    });

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ success: false, message: 'Failed to create project.' }, { status: 500 });
  }
}
