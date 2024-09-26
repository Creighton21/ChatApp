// src/components/ChatHistory.tsx
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Link,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CloseIcon from "@mui/icons-material/Close";

interface Reference {
  label: string;
  url: string;
}

interface Message {
  text: string;
  sender: "user" | "ai";
  imageUrl?: string; // Optional image URL for AI messages
  references?: Reference[]; // Optional references
  feedback?: "up" | "down" | null; // Track thumbs up/down for each message
}

const ChatHistory: React.FC<{
  messages: Message[];
  onFeedback: (index: number, feedback: "up" | "down" | null) => void;
}> = ({ messages, onFeedback }) => {
  const [openImage, setOpenImage] = useState<string | undefined>(undefined); // Use undefined instead of null

  const handleImageClick = (imageUrl?: string) => {
    if (imageUrl) {
      setOpenImage(imageUrl); // Only open if imageUrl is defined
    }
  };

  const handleClose = () => {
    setOpenImage(undefined); // Close the dialog by setting openImage to undefined
  };

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          overflowY: "auto",
          flexGrow: 1,
          marginBottom: "120px", // So it doesn't overlap the ChatInput component
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "10px",
                backgroundColor: msg.sender === "user" ? "#1976d2" : "#f1f1f1",
                color: msg.sender === "user" ? "#fff" : "#000",
                maxWidth: "70%",
              }}
            >
              <Typography>{msg.text}</Typography>

              {/* Check if there's an image in the message */}
              {msg.imageUrl && (
                <Box
                  component="img"
                  src={msg.imageUrl}
                  alt="chat image"
                  sx={{
                    width: "100%",
                    marginTop: "10px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                  onClick={() => handleImageClick(msg.imageUrl)} // imageUrl is guaranteed to exist now
                />
              )}

              {/* Thumbs up/down feedback for AI responses */}
              {msg.sender === "ai" && (
                <Box sx={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                  <IconButton
                    color={msg.feedback === "up" ? "primary" : "default"}
                    onClick={() =>
                      onFeedback(index, msg.feedback === "up" ? null : "up")
                    }
                  >
                    <ThumbUpIcon />
                  </IconButton>
                  <IconButton
                    color={msg.feedback === "down" ? "primary" : "default"}
                    onClick={() =>
                      onFeedback(index, msg.feedback === "down" ? null : "down")
                    }
                  >
                    <ThumbDownIcon />
                  </IconButton>
                </Box>
              )}

              {/* Display references below AI responses as a comma-separated list */}
              {msg.references && (
                <Box sx={{ marginTop: "10px" }}>
                  <Typography variant="body2" color="textSecondary">
                    References:{" "}
                    {msg.references.map((ref, refIndex) => (
                      <Link
                        key={refIndex}
                        href={ref.url}
                        target="_blank"
                        rel="noopener"
                        sx={{
                          color: "blue",
                          textDecoration: "underline",
                          fontSize: "0.85rem",
                        }}
                      >
                        {ref.label}
                        {refIndex < msg.references!.length - 1 ? ", " : ""}
                      </Link>
                    ))}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Modal Dialog for enlarged image */}
      <Dialog open={!!openImage} onClose={handleClose} maxWidth="md">
        <DialogContent>
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          {openImage && (
            <Box
              component="img"
              src={openImage}
              alt="enlarged chat image"
              sx={{
                width: "100%",
                borderRadius: "5px",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatHistory;
