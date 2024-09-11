import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Parse the form data
  const formData = await request.formData();
  const procedureFile = formData.get('procedureFile') as File; // Matching the front-end 'procedureFile' key
  const title = formData.get('title') as string;
  const technicalCardFile = formData.get('technicalCardFile') as File; // Matching the front-end 'technicalCardFile' key
  const notebookFile = formData.get('notebookFile') as File; // Matching the front-end 'notebookFile' key
  const year = formData.get('year') as String; // Matching the front-end 'year' key

  if (!technicalCardFile || !notebookFile || !title) {
    return NextResponse.json({ message: "الملف أو العنوان مفقود" }, { status: 400 });
  }

  // Function to save a file
  const saveFile = async (file: File, destinationDir: string) => {
    // Read the file as a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const destinationFile = path.join(destinationDir, file.name);

    try {
      // Ensure the destination directory exists
      await fs.promises.mkdir(destinationDir, { recursive: true });

      // Write the file to the new location
      await fs.promises.writeFile(destinationFile, buffer);
      return { success: true, message: `تم رفع ${file.name} بنجاح` };
    } catch (error) {
      console.error(`خطأ في رفع ${file.name}:`, error);
      return { success: false, message: `فشل حفظ ${file.name}` };
    }
  };

  // Define the destination directory with an additional folder
  const baseDir = `E:/BM/${year}`;

  const procedureFolder = "Consultation";
  const procedureDestinationDir = path.join(baseDir, title, procedureFolder);

  const technicalCardFolder = "Fiche technique";
  const technicalCardDestinationDir = path.join(baseDir, title, technicalCardFolder);

  const notebookFolder = "Cahier de charge";
  const notebookDestinationDir = path.join(baseDir, title, notebookFolder);
  
  // Save both files
  const result1 = await saveFile(procedureFile, procedureDestinationDir);
  const result2 = await saveFile(technicalCardFile, technicalCardDestinationDir);
  const result3 = await saveFile(notebookFile, notebookDestinationDir);

  if (!result1.success || !result2.success || !result3.success) {
    return NextResponse.json({
      message: `${result1.message}, ${result2.message}, ${result3.message}`
    }, { status: 500 });
  }

  return NextResponse.json({ message: "تم رفع الملفات بنجاح" });
}
