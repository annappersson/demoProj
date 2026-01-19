import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import {
  deleteCity,
  getCities,
  getCity,
  updateCity,
} from "../services/demoAPI";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import "../assets/style/CitiesPage.scss";
import GlobalLoadingSpinner from "../components/GlobalLoadingSpinner";

type City = {
  guid: string;
  name: string;
  movie?: string;
};

const CitiesPage = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingCity, setLoadingCity] = useState(false);
  const [editedMovie, setEditedMovie] = useState("");

  useEffect(() => {
    getCities()
      .then((res) => setCities(res.cities))
      .catch(() => toast.error("Kunde inte hämta städer"))
      .finally(() => setLoading(false));
  }, []);

  const handleRowClick = async (city: City) => {
    setLoadingCity(true);
    setModalOpen(true);

    try {
      const res = await getCity(city.guid);
      setSelectedCity(res.city);
      setEditedMovie(res.city.movie || "");
    } catch (err) {
      console.error(err);
      toast.error("Kunde inte hämta detaljer för staden");
      setModalOpen(false);
    } finally {
      setLoadingCity(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedCity) return;

    try {
      await updateCity(selectedCity.guid, editedMovie, selectedCity.name);
      toast.success("Movie uppdaterad!");

      setCities((prev) =>
        prev.map((c) =>
          c.guid === selectedCity.guid ? { ...c, movie: editedMovie } : c
        )
      );

      setSelectedCity((prev) => prev && { ...prev, movie: editedMovie });
    } catch (err) {
      console.error(err);
      toast.error("Kunde inte uppdatera movie");
    }
  };

  const handleDelete = async () => {
    if (!selectedCity) return;
    if (!window.confirm(`Är du säker på att du vill ta bort ${selectedCity.name}?`)) return;

    try {
      await deleteCity(selectedCity.guid);
      toast.success("City borttagen!");

      setCities((prev) => prev.filter((c) => c.guid !== selectedCity.guid));
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Kunde inte ta bort city");
    }
  };

  const columns = useMemo<MRT_ColumnDef<City>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Stad",
        size: 150,
      },
    ],
    []
  );

  return (
    <Box className="cities-page">
      <GlobalLoadingSpinner isLoading={loading} />

      <Box className="table-container" sx={{ mt: 2 }}>
        <MaterialReactTable
          columns={columns}
          data={cities}
          enableColumnOrdering
          enableGlobalFilter
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => handleRowClick(row.original),
            sx: { cursor: "pointer" },
          })}
        />
      </Box>

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Stadsinformation</DialogTitle>

        <DialogContent dividers>
          {loadingCity ? (
            <Box display="flex" justifyContent="center" p={4}>
              <GlobalLoadingSpinner isLoading={loadingCity} />
            </Box>
          ) : selectedCity ? (
            <Box display="flex" flexDirection="column" gap={2} py={2}>
              <Typography variant="body1">
                <strong>Namn:</strong> {selectedCity.name}
              </Typography>

              <TextField
                label="Movie"
                value={editedMovie}
                onChange={(e) => setEditedMovie(e.target.value)}
                fullWidth
                variant="outlined"
              />

              <Typography variant="caption" color="textSecondary">
                <strong>GUID:</strong> {selectedCity.guid}
              </Typography>
            </Box>
          ) : (
            <Typography>Ingen data hittades.</Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Uppdatera
          </Button>
          <Button onClick={handleDelete} variant="outlined" color="error">
            Ta bort
          </Button>
          <Button
            onClick={() => setModalOpen(false)}
            variant="contained"
            color="inherit"
          >
            Stäng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CitiesPage;