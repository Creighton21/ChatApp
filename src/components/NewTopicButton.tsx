// src/components/NewTopicButton.tsx
import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface NewTopicButtonProps {
  onNewTopic: () => void;
}

const NewTopicButton: React.FC<NewTopicButtonProps> = ({ onNewTopic }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onNewTopic}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        borderRadius: hovered ? "20px" : "50%", // Rounded rectangle when hovered, circle when not
        width: hovered ? "140px" : "50px", // Expand width on hover, but remain circular initially
        height: "50px", // Fixed height
        minWidth: "unset", // Remove default button min-width
        padding: hovered ? "0 12px" : "0", // Add padding when hovered to give space for text and icon
        boxSizing: "border-box", // Ensure border and padding don't affect size
        display: "flex",
        alignItems: "center",
        justifyContent: hovered ? "flex-start" : "center", // Center icon when unhovered
        transition: "all 0.3s ease", // Smooth transition for size and shape
        overflow: "hidden", // Hide text when not hovered
      }}
    >
      {/* Icon is always visible */}
      <AddCircleOutlineIcon
        sx={{
          fontSize: 24, // Set icon size
          marginRight: hovered ? "8px" : "0", // Add margin when hovered
        }}
      />

      {/* Text only appears on hover */}
      {hovered && (
        <Box
          component="span"
          sx={{
            whiteSpace: "nowrap", // Prevent text wrapping
            opacity: hovered ? 1 : 0, // Fade-in effect for text
            transition: "opacity 0.3s ease", // Smooth fade-in transition
          }}
        >
          New Topic
        </Box>
      )}
    </Button>
  );
};

export default NewTopicButton;
