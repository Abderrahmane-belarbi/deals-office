"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the date picker styles

export default function Page() {
  const [title, setTitle] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  const [technicalCardFile, setTechnicalCardFile] = useState<File | null>(null);
  const [notebookFile, setNotebookFile] = useState<File | null>(null);
  const [procedureFile, setProcedureFile] = useState<File | null>(null);

  const [isDraggingTechnicalCard, setIsDraggingTechnicalCard] = useState(false); // Separate drag state for the technical card
  const [isDraggingNotebook, setIsDraggingNotebook] = useState(false); // Separate drag state for the notebook
  const [isDraggingProcedure, setIsDraggingProcedure] = useState(false); // Separate drag state for the Procedure


  // Handle drag over event for Technical Card
  const handleDragOverTechnicalCard = (e: any) => {
    e.preventDefault();
    setIsDraggingTechnicalCard(true);
  };

  // Handle drag leave event for Technical Card
  const handleDragLeaveTechnicalCard = () => {
    setIsDraggingTechnicalCard(false);
  };

  // Handle drop event for Technical Card
  const handleDropTechnicalCard = (e: any) => {
    e.preventDefault();
    setIsDraggingTechnicalCard(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setTechnicalCardFile(files[0]);
    }
  };

  // Handle drag over event for Notebook
  const handleDragOverNotebook = (e: any) => {
    e.preventDefault();
    setIsDraggingNotebook(true);
  };

  // Handle drag leave event for Notebook
  const handleDragLeaveNotebook = () => {
    setIsDraggingNotebook(false);
  };

  // Handle drop event for Notebook
  const handleDropNotebook = (e: any) => {
    e.preventDefault();
    setIsDraggingNotebook(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setNotebookFile(files[0]);
    }
  };

  // Handle drag over event for Procedure
  const handleDragOverProcedure = (e: any) => {
    e.preventDefault();
    setIsDraggingProcedure(true);
  };

  // Handle drag leave event for Procedure
  const handleDragLeaveProcedure = () => {
    setIsDraggingProcedure(false);
  };

  // Handle drop event for Procedure
  const handleDropProcedure = (e: any) => {
    e.preventDefault();
    setIsDraggingProcedure(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setProcedureFile(files[0]);
    }
  };

  // Handle selection Procedure change
  const handleSelectProcedureChange = (event: any) => {
    setSelectedProcedure(event.target.value); // Update State with selected value
  };
  // Handle selection source change
  const handleSelectSourceChange = (event: any) => {
    setSelectedSource(event.target.value); // Update State with selected value
    console.log('source:', selectedSource);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();

    if (!title) {
      alert("من فضلك أضف عنوان المشروع");
      return;
    }

    if(!procedureFile) {
      alert("من فضلك أضف ملف الإجراء");
      return;
    }

    if (!technicalCardFile) {
      alert("من فضلك أضف ملف البطاقة التقنية");
      return;
    }

    if (!notebookFile) {
      alert("من فضلك أضف ملف دفتر الشروط");
      return;
    }

    const formData = new FormData();
    formData.append("procedureFile", procedureFile); // Key name matches backend
    formData.append("title", title);
    formData.append("technicalCardFile", technicalCardFile); // Key name matches backend
    formData.append("notebookFile", notebookFile); // Key name matches backend
    formData.append("year", selectedDate.getFullYear().toString()); // Key name matches backend
    formData.append("selectedDate", selectedDate.toISOString()); // Key name matches backend
    formData.append("selectedProcedure", selectedProcedure); // Key name matches backend
    formData.append("estimatedAmount", estimatedAmount); // Key name matches backend
    formData.append("selectedSource", selectedSource); // Key name matches backend

    try {
      // This URL should point to your API or server route
      const response = await fetch("/api/files-upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      alert(result.message || "تم رفع الملف بنجاح.");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("فشل في رفع الملف.");
    }

    try {
      // Sending a POST request to the API route
      const response = await fetch("/api/create-project", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create project.");
      }

      const result = await response.json();
      alert(result.message || "تم إنشاء المشروع بنجاح.");
      window.location.reload(); // This will reload the page
    } catch (error) {
      console.error("Error creating project:", error);
      alert("فشل في إنشاء المشروع.");
    }
  };

  return (
    <main className="w-[800px] mx-auto p-6 bg-white rounded-lg shadow-md">
      <p className="text-2xl font-semibold text-gray-800 mb-4 font-rubik text-center">
        إنشاء مشروع جديد
      </p>
      <form className="flex flex-col gap-4">
        {/* Project Title Input */}
        <div className="flex flex-col">
          <label className="font-marhey text-gray-700 mb-2">
            عنوان المشروع
          </label>
          <input
            type="text"
            className="font-marhey border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            placeholder="أدخل عنوان المشروع"
          />
        </div>

        {/* Select Dropdown */}
        <div className="flex flex-col">
          <label
            htmlFor="funding-source"
            className="font-marhey text-gray-700 mb-2"
          >
            إختيار مصدر التمويل
          </label>
          <div className="relative">
            <select
              id="funding-source"
              className="font-marhey appearance-none border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full"
              value={selectedSource}
              onChange={handleSelectSourceChange}
            >
              <option className="font-marhey" value="" disabled>
                مصدر التمويل
              </option>
              <option className="font-marhey" value="BC">
                BC - ميزانية البلدية
              </option>
              <option className="font-marhey" value="BW">
                BW - ميزانية ولائية
              </option>
              <option className="font-marhey" value="ADSEC">
                ADSEC - برنامج الدعم التنمية الإقتصادية والإجتماعية
              </option>
              <option className="font-marhey" value="CSGCL">
                CSGCL
              </option>
            </select>
            {/* Custom arrow icon */}
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.583l3.71-4.35a.75.75 0 011.08 1.04l-4.25 5a.75.75 0 01-1.08 0l-4.25-5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Reporting Date */}
        <div className="flex flex-col">
          <label className="font-marhey text-gray-700 mb-2">
            تاريخ التبليغ
          </label>
          <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date!)}
              className="font-marhey border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full"
              dateFormat="dd/MM/yyyy" // Change the date format if needed
            />
          </div>
        </div>

        {/* Estimated Amount Input */}
        <div className="flex flex-col">
          <label className="font-marhey text-gray-700 mb-2">
            مبلغ التقديري
          </label>
          <input
            type="number"
            className="font-marhey border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={estimatedAmount}
            onChange={(event) => {
              setEstimatedAmount(event.target.value);
              console.log(selectedDate.getFullYear());
            }}
            placeholder="أدخل المبلغ التقديري"
          />
        </div>

        {/* Procedures */}
        <div className="flex flex-col">
          <label
            htmlFor="procedures"
            className="font-marhey text-gray-700 mb-2"
          >
            الإجراءات
          </label>
          <div className="relative">
            <select
              id="procedures"
              className="font-marhey appearance-none border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full"
              value={selectedProcedure} // Bind select value to state
              onChange={handleSelectProcedureChange} // Handle selection change
            >
              <option className="font-marhey" value="" disabled>
                إختر أحد الإجراءات
              </option>
              <option className="font-marhey" value="CO">
                إستشارة
              </option>
              <option className="font-marhey" value="DO">
                طلب عروض مفتوح
              </option>
              <option className="font-marhey" value="DOC">
                طلب عروض مع إشتراط قدرات دنيا
              </option>
              <option className="font-marhey" value="UC">
                مسابقة
              </option>
            </select>
            {/* Custom arrow icon */}
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.583l3.71-4.35a.75.75 0 011.08 1.04l-4.25 5a.75.75 0 01-1.08 0l-4.25-5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* upload selectedProcedure file */}
        { selectedProcedure && <div>
          <div
            className={`upload-drop-zone flex items-center justify-center w-full h-[150px] border-2 rounded cursor-pointer mb-4 ${
              isDraggingProcedure
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300"
            }`}
            onDragOver={handleDragOverProcedure}
            onDragLeave={handleDragLeaveProcedure}
            onDrop={handleDropProcedure}
          >
            {procedureFile ? (
              <p className="font-marhey text-gray-700">
                تم رفع: {procedureFile.name}
              </p>
            ) : (
              <p className="font-marhey text-gray-700">
                {selectedProcedure === 'CO' ? 'إسحب الملف الخاص بالإستشارة' : selectedProcedure === 'DO' ? 'إسحب الملف الخاص بطلب عروض مفتوح' : selectedProcedure === 'DOC' ? 'إسحب الملف الخاص بطلب عروض مع إشتراط قدرات دنيا' : selectedProcedure === 'UC' ? 'إسحب الملف الخاص بالمسابقة' : 'من فضلك اختر خيار'}
              </p>
            )}
          </div>
        </div>}

        {/* Technical card */}
        <div>
          <p className="font-marhey text-gray-700 mb-2">بطاقة تقنية</p>
          <div
            className={`upload-drop-zone flex items-center justify-center w-full h-[150px] border-2 rounded cursor-pointer mb-4 ${
              isDraggingTechnicalCard
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300"
            }`}
            onDragOver={handleDragOverTechnicalCard}
            onDragLeave={handleDragLeaveTechnicalCard}
            onDrop={handleDropTechnicalCard}
          >
            {technicalCardFile ? (
              <p className="font-marhey text-gray-700">
                تم رفع: {technicalCardFile.name}
              </p>
            ) : (
              <p className="font-marhey text-gray-700">
                إسحب الملف الخاص بالبطاقة التقنية
              </p>
            )}
          </div>
        </div>

        {/* Cond */}
        <div>
          <p className="font-marhey text-gray-700 mb-2">دفتر الشروط</p>
          <div
            className={`upload-drop-zone flex items-center justify-center w-full h-[150px] border-2 rounded cursor-pointer mb-4 ${
              isDraggingNotebook
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300"
            }`}
            onDragOver={handleDragOverNotebook}
            onDragLeave={handleDragLeaveNotebook}
            onDrop={handleDropNotebook}
          >
            {notebookFile ? (
              <p className="font-marhey text-gray-700">
                تم رفع: {notebookFile.name}
              </p>
            ) : (
              <p className="font-marhey text-gray-700">
                إسحب الملف الخاص بدفتر الشروط
              </p>
            )}
          </div>
        </div>
        
        {/* Submit Button */}
        <button
          type="button"
          onClick={(event) => {
            handleUpload(event);
          }}
          className="px-6 bg-indigo-500 font-marhey text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300 self-center"
        >
          إنشاء
        </button>
      </form>
    </main>
  );
}
