import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import { updateUserProfile } from "../services/demoAPI";
import { useAuth } from "../hooks/useAuth";
import GlobalLoadingSpinner from "../components/GlobalLoadingSpinner";

const MyPage = () => {
  const [loaded, setLoaded] = useState(false);

  const [personalNumber, setPersonalNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setPersonalNumber(user.personalNumber || "");
    setEmail(user.email || "");
    setName(user.name || "");
    setPhone(user.phone || "");

    setLoaded(true);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        email,
        name,
        phone,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      };

      const res = await updateUserProfile(payload);

      if (res.access_token) {
        localStorage.setItem("access_token", res.access_token);
      }

      toast.success("Profil uppdaterad!");

      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      toast.error("Kunde inte uppdatera profil");
    } finally {
      setLoading(false);
    }
  };

  if (!loaded) return <p>Laddar...</p>;

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" mt={6}>
      <GlobalLoadingSpinner isLoading={loading} />
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={3}>
          Min profil
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Personnummer"
            fullWidth
            margin="normal"
            value={personalNumber}
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Namn"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Mobilnummer"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Typography mt={3} mb={1}>
            Byt lösenord (valfritt)
          </Typography>

          <TextField
            label="Nuvarande lösenord"
            type="password"
            fullWidth
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <TextField
            label="Nytt lösenord"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            Spara ändringar
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default MyPage;
