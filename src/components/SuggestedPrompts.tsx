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
        flexWrap: "wrap", // Enable wrapping of prompts
        justifyContent: "center", // Center the wrapped prompts
        paddingBottom: "10px",
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
            whiteSpace: "normal", // Allow text to wrap within the button
          }}
        >
          {prompt}
        </Button>
      ))}
    </Box>
  );
};

export default SuggestedPrompts;
