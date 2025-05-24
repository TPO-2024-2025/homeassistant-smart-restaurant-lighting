import React, { useState } from "react";
import { generateScene } from "./api";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
  Card,
  CardContent,
} from "@mui/material";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const scene = await generateScene(prompt);
      setResponse(scene);
    } catch (err) {
      setResponse({ error: "⚠️ Error fetching response from OpenAI." });
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        💡 Restaurant Lighting Scene Generator
      </Typography>

      <TextField
        label="Describe your ambient lighting scene"
        variant="outlined"
        multiline
        rows={5}
        fullWidth
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Scene"}
        </Button>
      </Box>

      {response && (
        <Card sx={{ mt: 4, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
            Generated Scene YAML (ready for scripts.yaml)
            </Typography>
            <Typography
              variant="body2"
              component="pre"
              sx={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}
            >
              {response}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default App;
