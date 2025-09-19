"use client";

import { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button, Card, CardContent, CardMedia,
  Grid, IconButton, Paper, Dialog, DialogTitle, DialogContent,
  DialogActions, Select, MenuItem
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [games, setGames] = useState<any[]>([]);

  // New game states
  const [title_en, setTitleEn] = useState("");
  const [description_en, setDescriptionEn] = useState("");
  const [title_ar, setTitleAr] = useState("");
  const [description_ar, setDescriptionAr] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [viewLanguage, setViewLanguage] = useState("en");
  const [loading, setLoading] = useState(false);

  // Edit states
  const [editingGame, setEditingGame] = useState<any | null>(null);
  const [editTitleEn, setEditTitleEn] = useState("");
  const [editDescriptionEn, setEditDescriptionEn] = useState("");
  const [editTitleAr, setEditTitleAr] = useState("");
  const [editDescriptionAr, setEditDescriptionAr] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editLink, setEditLink] = useState("");

  // Fetch games
  async function fetchGames() {
    try {
      const res = await fetch(`/api/admin/games?lang=${viewLanguage}`);
      const data = await res.json();
      setGames(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching games:", err);
      setGames([]);
    }
  }

  useEffect(() => { fetchGames(); }, [viewLanguage]);

  // Add game
  async function addGame() {
    if (!title_en || !description_en || !title_ar || !description_ar || !image) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title_en, description_en, title_ar, description_ar, image, link }),
      });
      if (!res.ok) throw new Error("Failed to add game");

      // Reset form
      setTitleEn(""); setDescriptionEn(""); setTitleAr(""); setDescriptionAr("");
      setImage(""); setLink("");
      fetchGames();
    } catch (err) { console.error(err); }
    setLoading(false);
  }

  // Delete game
  async function deleteGame(id: number) {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/admin/games/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete game");
      fetchGames();
    } catch (err) { console.error(err); }
  }

  // Open edit dialog
  function openEditDialog(game: any) {
    setEditingGame(game);
    setEditTitleEn(game.title_en || "");
    setEditDescriptionEn(game.description_en || "");
    setEditTitleAr(game.title_ar || "");
    setEditDescriptionAr(game.description_ar || "");
    setEditImage(game.image);
    setEditLink(game.link);
  }

  // Save edit
  async function saveEdit() {
    if (!editingGame) return;
    try {
      const res = await fetch(`/api/admin/games/${editingGame.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title_en: editTitleEn,
          description_en: editDescriptionEn,
          title_ar: editTitleAr,
          description_ar: editDescriptionAr,
          image: editImage,
          link: editLink,
        }),
      });
      if (!res.ok) throw new Error("Failed to update game");
      setEditingGame(null);
      fetchGames();
    } catch (err) { console.error(err); }
  }

  // Logout
  async function handleLogout() {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/signin");
    } catch (err) { console.error("Logout failed", err); }
  }

  return (
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Misc Studio Admin Dashboard</Typography>
      <Button variant="outlined" color="secondary" sx={{ position: "absolute", top: 16, right: 16 }} onClick={handleLogout}>Logout</Button>

      {/* Language filter */}
      <Box sx={{ mb: 3 }}>
        <Typography>View Applications By Language:</Typography>
        <Select value={viewLanguage} onChange={(e) => setViewLanguage(e.target.value)} sx={{ ml: 2 }}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ar">Arabic</MenuItem>
        </Select>
      </Box>

      {/* Add game */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Add New Application</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Title (EN)" value={title_en} onChange={(e) => setTitleEn(e.target.value)} fullWidth />
          <TextField label="Description (EN)" value={description_en} onChange={(e) => setDescriptionEn(e.target.value)} fullWidth multiline rows={2} />
          <TextField label="Title (AR)" value={title_ar} onChange={(e) => setTitleAr(e.target.value)} fullWidth />
          <TextField label="Description (AR)" value={description_ar} onChange={(e) => setDescriptionAr(e.target.value)} fullWidth multiline rows={2} />
          <TextField label="Image URL" value={image} onChange={(e) => setImage(e.target.value)} fullWidth />
          <TextField label="Link" value={link} onChange={(e) => setLink(e.target.value)} fullWidth />
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
              {game.image && <CardMedia component="img" height="140" image={game.image} alt={viewLanguage === "ar" ? game.title_ar : game.title_en} />}
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
          <TextField label="Title (EN)" value={editTitleEn} onChange={(e) => setEditTitleEn(e.target.value)} fullWidth />
          <TextField label="Description (EN)" value={editDescriptionEn} onChange={(e) => setEditDescriptionEn(e.target.value)} fullWidth multiline rows={2} />
          <TextField label="Title (AR)" value={editTitleAr} onChange={(e) => setEditTitleAr(e.target.value)} fullWidth />
          <TextField label="Description (AR)" value={editDescriptionAr} onChange={(e) => setEditDescriptionAr(e.target.value)} fullWidth multiline rows={2} />
          <TextField label="Image URL" value={editImage} onChange={(e) => setEditImage(e.target.value)} fullWidth />
          <TextField label="Link" value={editLink} onChange={(e) => setEditLink(e.target.value)} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingGame(null)}>Cancel</Button>
          <Button onClick={saveEdit} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
