// src/components/FeedbackButton.tsx
import React from "react";
import { Button } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const FeedbackButton: React.FC = () => {
  const handleFeedback = () => {
    window.open("https://your-feedback-form-link.com", "_blank"); // Open feedback form
  };

  return (
    <Button
      variant="outlined"
      startIcon={<ChatBubbleOutlineIcon />}
      sx={{
        borderRadius: "20px",
        fontSize: "0.75rem",
        padding: "5px 10px",
        borderColor: "blue",
        color: "blue",
        textTransform: "none",
      }}
      onClick={handleFeedback}
    >
      Feedback
    </Button>
  );
};

export default FeedbackButton;
