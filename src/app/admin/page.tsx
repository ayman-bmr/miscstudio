"use client";

import { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button, Card, CardContent, CardMedia,
  Grid, IconButton, Paper, Dialog, DialogTitle, DialogContent,
  DialogActions, Select, MenuItem
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function AdminDashboard() {
  const [games, setGames] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("")
  const [language, setLanguage] = useState("en");
  const [viewLanguage, setViewLanguage] = useState("en");
  const [loading, setLoading] = useState(false);

  const [editingGame, setEditingGame] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editLink, setEditLink]= useState("");
  const [editLanguage, setEditLanguage] = useState("en");
 

  // Fetch games
  async function fetchGames() {
    try {
      const res = await fetch(`/api/admin/games?lang=${viewLanguage}`);
      const data = await res.json();
      if (!Array.isArray(data)) setGames([]);
      else setGames(data);
    } catch (err) {
      console.error("Error fetching games:", err);
      setGames([]);
    }
  }

  useEffect(() => { fetchGames(); }, [viewLanguage]);

  // Add game
  async function addGame() {
    if (!title || !description || !image) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image,link, language }),
      });
      if (!res.ok) throw new Error("Failed to add game");
      setTitle(""); setDescription(""); setImage("");setLink("");;
      fetchGames();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  // Delete game
  async function deleteGame(id: number) {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/admin/games/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete game");
      fetchGames();
    } catch (err) {
      console.error(err);
    }
  }

  // Edit game
  function openEditDialog(game: any) {
    setEditingGame(game);
    setEditTitle(game.title);
    setEditDescription(game.description);
    setEditImage(game.image);
    setEditLanguage(game.language);
    setEditLink(game.link);
  }

  async function saveEdit() {
    if (!editingGame) return;
    try {
      const res = await fetch(`/api/admin/games/${editingGame.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          image: editImage,
          link: editLink,
          language: editLanguage,
        }),
      });
      if (!res.ok) throw new Error("Failed to update game");
      setEditingGame(null);
      fetchGames();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Misc Studio Admin Dashboard</Typography>

      {/* Language filter */}
      <Box sx={{ mb: 3 }}>
        <Typography>View Games By Language:</Typography>
        <Select value={viewLanguage} onChange={(e) => setViewLanguage(e.target.value)} sx={{ ml: 2 }}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ar">Arabic</MenuItem>
        </Select>
      </Box>

      {/* Add game */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Add New Game</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={2} />
          <TextField label="Image URL" value={image} onChange={(e) => setImage(e.target.value)} fullWidth />
          <TextField label="link" value={link} onChange={(e) => setLink(e.target.value)} fullWidth />
          <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ar">Arabic</MenuItem>
          </Select>
          <Button variant="contained" color="primary" onClick={addGame} disabled={loading}>
            {loading ? "Adding..." : "Add Game"}
          </Button>
        </Box>
      </Paper>

      {/* Games list */}
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card>
              {game.image && <CardMedia component="img" height="140" image={game.image} alt={game.title} />}
              <CardContent>
                <Typography variant="h6">{game.title}</Typography>
                <Typography variant="body2">{game.description}</Typography>
              </CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
                <IconButton onClick={() => openEditDialog(game)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => deleteGame(game.id)}><DeleteIcon /></IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit dialog */}
      <Dialog open={!!editingGame} onClose={() => setEditingGame(null)}>
        <DialogTitle>Edit Game</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} fullWidth />
          <TextField label="Description" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} fullWidth multiline rows={2} />
          <TextField label="Image URL" value={editImage} onChange={(e) => setEditImage(e.target.value)} fullWidth />
          <TextField label="link" value={editLink} onChange={(e) => setEditLink(e.target.value)} fullWidth />
          <Select value={editLanguage} onChange={(e) => setEditLanguage(e.target.value)}>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ar">Arabic</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingGame(null)}>Cancel</Button>
          <Button onClick={saveEdit} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
 