import React, { useState } from "react";
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

interface Reference {
  title: string;
  url?: string;
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

  const handleImageClick = (imageUrl: string | undefined) => {
    if (imageUrl) {
      setOpenImage(imageUrl);
    }
  };

  const handleCloseImage = () => {
    setOpenImage(null);
  };

  return (
    <Box sx={{ padding: "10px", overflowY: "auto", flexGrow: 1 }}>
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
                  component="a"
                  href={ref.url}
                  clickable
                  target="_blank"
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
                <ThumbUpIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                color={msg.feedback === "down" ? "primary" : "default"}
                onClick={() =>
                  onFeedback(index, msg.feedback === "down" ? null : "down")
                }
                sx={{ fontSize: "18px" }} // Smaller thumbs icons
              >
                <ThumbDownIcon sx={{ fontSize: 18 }} />
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
                width: "75%",
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
    </Box>
  );
};

export default ChatHistory;
