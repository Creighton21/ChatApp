import React from "react";

interface PDFViewerProps {
  src: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ src }) => {
  return (
    <div>
      <iframe
        src={src}
        width="100%"
        height="500px"
        style={{ border: "none" }}
        title="PDF Document"
      />
    </div>
  );
};

export default PDFViewer;
