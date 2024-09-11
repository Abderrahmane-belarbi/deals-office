"use client";
import React, { useState } from "react";

interface ProjectCardProps {
  title: string;
  fundingSource: string;
  notificationDate: string; // Assuming this is a string in ISO format
  estimatedAmount: number;
  procedure: string;
  filePath: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  fundingSource,
  notificationDate,
  estimatedAmount,
  procedure,
  filePath,
}) => {
  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      // Handle the case where the date is invalid
      return "Invalid Date"; // You can customize this message or provide a fallback value
    }

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date); // Format the date in dd/MM/yyyy format
  };

  const [showCopyMessage, setShowCopyMessage] = useState(false); // State for feedback message

  // Handle Copy file Directory
  const handleCopyPath = () => {
    navigator.clipboard
      .writeText(filePath)
      .then(() => {
        setShowCopyMessage(true); // Show the copy message
        setTimeout(() => setShowCopyMessage(false), 2000); // Hide it after 2 seconds
      })
      .catch((err) => {
        console.error("فشل في نسخ المسار: ", err);
      });
  };

  return (
    <div className="bg-white p-4 font-marhey rounded-lg shadow-md">
      {/* Use title attribute to show full text on hover */}
      <h2
        className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
        title={title} // This will display the full title text on hover
      >
        {title}
      </h2>
      <p className="font-marhey">
        مصدر التمويل:{" "}
        {fundingSource === "BC"
          ? "ميزانية البلدية"
          : fundingSource === "BW"
          ? "ميزانية ولائية"
          : fundingSource === "ADSEC"
          ? "برنامج الدعم التنمية الإقتصادية والإجتماعية"
          : fundingSource === "CSGCL"
          ? "CSGCL"
          : "عير معروف"}
      </p>
      <p className="font-marhey">
        تاريخ التبليغ: {formatDate(notificationDate)}
      </p>
      <p className="font-marhey">
        مبلغ التقديري: {estimatedAmount.toLocaleString()} دج
      </p>
      <p className="font-marhey">
        الإجراء:{" "}
        {procedure === "CO"
          ? "إستشارة"
          : procedure === "DO"
          ? "طلب عروض مفتوح"
          : procedure === "DOC"
          ? "طلب عروض مع إشتراط قدرات دنيا"
          : procedure === "UC"
          ? "مسابقة"
          : "عير معروف"}
      </p>
      {/* Copy Path Button */}
      <div className="relative">
        <button
          type="button"
          onClick={handleCopyPath}
          className="mt-2 bg-mainPurple text-white py-2 px-4 rounded-lg hover:bg-mainPurpleHover transition duration-300 self-center"
        >
          📁 نسخ المسار
        </button>
        {showCopyMessage && (
          <span className="absolute font-marhey right-36 top-3 text-mainPurple animate-fade">
            تم النسخ
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
