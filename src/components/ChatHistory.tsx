// src/components/ChatHistory.tsx
import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Paper,
  Dialog,
  DialogContent,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import PersonIcon from "@mui/icons-material/Person"; // Icon for the user
import SmartToyIcon from "@mui/icons-material/SmartToy"; // Icon for AI (Copilot)
import CloseIcon from "@mui/icons-material/Close";

interface Reference {
  title: string;
  url?: string; // Optional URL if the reference is a clickable link
}

interface Message {
  text: string;
  sender: "user" | "ai";
  imageUrl?: string; // Optional image URL for AI messages
  references?: Reference[]; // Optional references
  feedback?: "up" | "down" | null; // Track thumbs up/down for each message
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
            backgroundColor: "transparent", // No background color
            boxShadow: "none", // No shadow or border
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
                <Typography variant="caption" sx={{ marginRight: "5px" }}>
                  You
                </Typography>
                <PersonIcon fontSize="small" />
              </>
            ) : (
              <>
                <SmartToyIcon fontSize="small" />
                <Typography variant="caption" sx={{ marginLeft: "5px" }}>
                  Copilot
                </Typography>
              </>
            )}
          </Box>

          {/* Message Text */}
          <Typography variant="body1" sx={{ marginTop: "5px" }}>
            {msg.text}
          </Typography>

          {/* Display Image if present */}
          {msg.imageUrl && (
            <Box
              component="img"
              src={msg.imageUrl}
              alt="AI generated"
              sx={{
                width: "200px",
                borderRadius: "5px",
                marginTop: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(msg.imageUrl)}
            />
          )}

          {/* Display references if they exist */}
          {msg.references && msg.references.length > 0 && (
            <Typography
              variant="caption"
              sx={{ marginTop: "5px", display: "block", color: "#757575" }}
            >
              References:{" "}
              {msg.references.map((ref, refIndex) => (
                <span key={refIndex}>
                  {ref.url ? (
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      {ref.title}
                    </a>
                  ) : (
                    ref.title
                  )}
                  {/* Check if refIndex is not the last element */}
                  {refIndex < (msg.references?.length ?? 0) - 1 && ", "}
                </span>
              ))}
            </Typography>
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
                color={msg.feedback === "up" ? "primary" : "default"} // Color change on click
                onClick={() =>
                  onFeedback(index, msg.feedback === "up" ? null : "up")
                } // Toggle feedback
              >
                <ThumbUpIcon />
              </IconButton>
              <IconButton
                color={msg.feedback === "down" ? "primary" : "default"} // Color change on click
                onClick={() =>
                  onFeedback(index, msg.feedback === "down" ? null : "down")
                } // Toggle feedback
              >
                <ThumbDownIcon />
              </IconButton>
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
