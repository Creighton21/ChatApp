import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Paper,
  Dialog,
  DialogContent,
  Chip,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PersonIcon from "@mui/icons-material/Person"; // Icon for the user
import RedditIcon from "@mui/icons-material/Reddit"; // Icon for AI (Copilot)
import CloseIcon from "@mui/icons-material/Close";
import PDFViewer from "./PDFViewer"; // Import the PDFViewer component

interface Reference {
  title: string;
  documentUrl?: string; // Optional URL for the document (replaces the regular web URL)
}

interface ImageData {
  url: string;
  source: string;
}

interface Message {
  text: string;
  sender: "user" | "ai";
  imageList?: ImageData[];
  references?: Reference[];
  feedback?: "up" | "down" | null;
}

interface ChatHistoryProps {
  messages: Message[];
  onFeedback: (index: number, feedback: "up" | "down" | null) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, onFeedback }) => {
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [openPDF, setOpenPDF] = useState<string | null>(null); // State to track which document is open

  // Create a reference for the last message
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  // Smooth scrolling to the last message when messages are updated
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleImageClick = (imageUrl: string | undefined) => {
    if (imageUrl) {
      setOpenImage(imageUrl);
    }
  };

  const handleCloseImage = () => {
    setOpenImage(null);
  };

  const handleReferenceClick = (documentUrl: string | undefined) => {
    if (documentUrl) {
      setOpenPDF(documentUrl); // Open the PDF when a reference is clicked
    }
  };

  const handleClosePDF = () => {
    setOpenPDF(null); // Close the PDF modal
  };

  return (
    <Box
      sx={{
        padding: "10px",
        overflowY: "auto",
        flexGrow: 1,
        height: "100%",
        paddingBottom: "150px", // Reserve space for input and suggestions
      }}
    >
      {messages.map((msg, index) => (
        <Paper
          key={index}
          sx={{
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "transparent",
            boxShadow: "none",
            textAlign: msg.sender === "user" ? "right" : "left",
          }}
          ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to last message
        >
          {/* Sender Info */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            {msg.sender === "user" ? (
              <>
                <Typography
                  variant="caption"
                  sx={{ marginRight: "5px", fontWeight: "bold", fontSize: 16 }}
                >
                  You
                </Typography>
                <PersonIcon sx={{ fontSize: 24 }} />
              </>
            ) : (
              <>
                <RedditIcon sx={{ fontSize: 24 }} />
                <Typography
                  variant="caption"
                  sx={{ marginLeft: "5px", fontWeight: "bold", fontSize: 16 }}
                >
                  Copilot
                </Typography>
              </>
            )}
          </Box>

          {/* Message Text */}
          <Typography variant="body1" sx={{ marginTop: "5px" }}>
            {msg.text}
          </Typography>

          {/* Display References */}
          {msg.references && msg.references.length > 0 && (
            <Box sx={{ marginTop: "5px" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                References:
              </Typography>
              {msg.references.map((ref, refIndex) => (
                <Chip
                  key={refIndex}
                  label={`${refIndex + 1} ${ref.title}`}
                  onClick={() => handleReferenceClick(ref.documentUrl)} // Handle PDF click
                  clickable
                  sx={{
                    fontSize: "12px",
                    padding: "0 5px",
                    borderRadius: "5px",
                    border: "1px solid #e0e0e0",
                    margin: "3px",
                  }}
                />
              ))}
            </Box>
          )}

          {/* Thumbs Up/Down Feedback */}
          {msg.sender === "ai" && (
            <Box
              sx={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
              }}
            >
              <IconButton
                color={msg.feedback === "up" ? "primary" : "default"}
                onClick={() =>
                  onFeedback(index, msg.feedback === "up" ? null : "up")
                }
                sx={{ fontSize: "18px" }} // Smaller thumbs icons
              >
                <ThumbUpIcon />
              </IconButton>
              <IconButton
                color={msg.feedback === "down" ? "primary" : "default"}
                onClick={() =>
                  onFeedback(index, msg.feedback === "down" ? null : "down")
                }
                sx={{ fontSize: "18px" }} // Smaller thumbs icons
              >
                <ThumbDownIcon />
              </IconButton>
            </Box>
          )}

          {/* Image Box with a border */}
          {msg.imageList && (
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                padding: "10px",
                marginTop: "15px",
                borderRadius: "5px",
              }}
            >
              {/* Display images in a grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {msg.imageList.map((image, imgIndex) => (
                  <Box
                    key={imgIndex}
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageClick(image.url)}
                  >
                    <Box
                      component="img"
                      src={image.url}
                      alt={`Image ${imgIndex + 1}`}
                      sx={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                    />
                    {/* Number overlay on image */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        color: "#fff",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                      }}
                    >
                      {imgIndex + 1}
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Image References */}
              <Box
                sx={{
                  marginTop: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "5px",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ marginRight: "10px", fontWeight: "bold" }}
                >
                  Image Sources:
                </Typography>
                {msg.imageList.map((image, imgIndex) => (
                  <Chip
                    key={imgIndex}
                    label={`${imgIndex + 1}. ${image.source}`}
                    sx={{
                      fontSize: "12px",
                      padding: "0 5px",
                      borderRadius: "5px",
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Paper>
      ))}

      {/* Image Modal for Enlarged View */}
      <Dialog open={!!openImage} onClose={handleCloseImage}>
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={handleCloseImage}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            component="img"
            src={openImage || undefined}
            alt="enlarged chat image"
            sx={{
              width: "100%",
              borderRadius: "5px",
            }}
          />
        </DialogContent>
      </Dialog>

      {/* PDF Viewer Modal for Document References */}
      <Dialog open={!!openPDF} onClose={handleClosePDF} maxWidth="md" fullWidth>
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={handleClosePDF}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          {openPDF && <PDFViewer src={openPDF} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ChatHistory;
