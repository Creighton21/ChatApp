// src/components/SuggestedPrompts.tsx
import React from "react";
import { Box, Chip } from "@mui/material";

const SuggestedPrompts: React.FC<{
  prompts: string[];
  onSelect: (prompt: string) => void;
}> = ({ prompts, onSelect }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "100px", // Shift it upwards
        left: "50%",
        transform: "translateX(-50%)", // Center horizontally
        display: "flex",
        gap: "10px",
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {prompts.map((prompt, index) => (
        <Chip
          key={index}
          label={prompt}
          onClick={() => onSelect(prompt)}
          variant="outlined"
          sx={{ cursor: "pointer" }}
        />
      ))}
    </Box>
  );
};

export default SuggestedPrompts;
