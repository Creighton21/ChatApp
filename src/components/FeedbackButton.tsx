// src/components/FeedbackButton.tsx
import React from "react";
import { Button } from "@mui/material";
import OutboundIcon from "@mui/icons-material/Outbound";

const FeedbackButton: React.FC = () => {
  const handleFeedback = () => {
    window.open("https://your-feedback-form-link.com", "_blank"); // Open feedback form
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      endIcon={<OutboundIcon />}
      onClick={handleFeedback}
      sx={{ flexShrink: 0, marginRight: "20px" }} // Ensure button does not shrink
    >
      Feedback
    </Button>
  );
};

export default FeedbackButton;
