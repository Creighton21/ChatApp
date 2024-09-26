// src/SuggestedPrompts.tsx
import React from "react";
import { Box, Button } from "@mui/material";

const SuggestedPrompts: React.FC<{
  prompts: string[];
  onSelect: (prompt: string) => void;
}> = ({ prompts, onSelect }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        padding: "5px",
        overflowX: "auto", // Scroll within the prompt area if necessary
        whiteSpace: "nowrap", // Prevent prompts from wrapping and causing overflow
      }}
    >
      {prompts.map((prompt, index) => (
        <Button
          key={index}
          variant="outlined"
          onClick={() => onSelect(prompt)}
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            color: "blue",
            borderColor: "blue",
            fontSize: "0.85rem",
            padding: "5px 10px",
          }}
        >
          {prompt}
        </Button>
      ))}
    </Box>
  );
};

export default SuggestedPrompts;
