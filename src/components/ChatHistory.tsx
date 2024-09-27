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
import PersonIcon from "@mui/icons-material/Person";
import RedditIcon from "@mui/icons-material/Reddit";
import CloseIcon from "@mui/icons-material/Close";
import PDFViewer from "./PDFViewer";

interface Reference {
  title: string;
  documentUrl?: string;
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
  const [openPDF, setOpenPDF] = useState<string | null>(null);

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

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
      setOpenPDF(documentUrl);
    }
  };

  const handleClosePDF = () => {
    setOpenPDF(null);
  };

  return (
    <Box
      sx={{
        padding: "10px",
        overflowY: "scroll",
        flexGrow: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: "80px",
        // Hide scrollbar
        "&::-webkit-scrollbar": { width: 0, background: "transparent" }, // Chrome, Safari
        "&::-webkit-scrollbar-thumb": { background: "transparent" }, // Chrome, Safari
        "-ms-overflow-style": "none", // IE and Edge
        scrollbarWidth: "none", // Firefox
      }}
    >
      {messages.map((msg, index) => (
        <Paper
          key={index}
          sx={{
            padding: "10px",
            paddingBottom: "50px",
            marginBottom: "10px",
            backgroundColor: "transparent",
            boxShadow: "none",
            textAlign: "left",
            width: "70%", // Adjust to limit message width
            display: "flex",
            flexDirection: "column",
          }}
          ref={index === messages.length - 1 ? lastMessageRef : null}
        >
          {/* Sender Info */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {msg.sender === "user" ? (
              <>
                <PersonIcon sx={{ fontSize: 28 }} />
                <Typography
                  variant="caption"
                  sx={{ marginRight: "5px", fontWeight: "bold", fontSize: 18 }}
                >
                  You
                </Typography>
              </>
            ) : (
              <>
                <RedditIcon sx={{ fontSize: 28 }} />
                <Typography
                  variant="caption"
                  sx={{ marginLeft: "5px", fontWeight: "bold", fontSize: 18 }}
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
                  onClick={() => handleReferenceClick(ref.documentUrl)}
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
              >
                <ThumbUpIcon sx={{ fontSize: "18px" }} />
              </IconButton>
              <IconButton
                color={msg.feedback === "down" ? "primary" : "default"}
                onClick={() =>
                  onFeedback(index, msg.feedback === "down" ? null : "down")
                }
              >
                <ThumbDownIcon sx={{ fontSize: "18px" }} />
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
