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
  CircularProgress,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import "../assets/style/CitiesPage.scss";

type cities = {
  guid: string;
  name: string;
};

const CitiesPage = () => {
  const [cities, setCities] = useState<cities[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingCity, setLoadingCity] = useState(false);
  const [editedMovie, setEditedMovie] = useState("");

  useEffect(() => {
    getCities()
      .then((res) => setCities(res.cities))
      .finally(() => setLoading(false));
  }, []);

  const handleRowClick = async (city: cities) => {
    setLoadingCity(true);
    setModalOpen(true);

    try {
      const res = await getCity(city.guid);
      setSelectedCity(res.city);
      setEditedMovie(res.city.movie || "");
    } finally {
      setLoadingCity(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedCity) return;

    try {
      await updateCity(selectedCity.guid, editedMovie, selectedCity.name);
      toast.success("Movie uppdaterad!");

      // uppdatera listan direkt
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

    try {
      await deleteCity(selectedCity.guid);
      toast.success("City borttagen!");

      // ta bort city från listan direkt
      setCities((prev) => prev.filter((c) => c.guid !== selectedCity.guid));

      setModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Kunde inte ta bort city");
    }
  };

  const columns = useMemo<MRT_ColumnDef<cities>[]>(
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
      <Box className="table-container">
        <MaterialReactTable
          columns={columns}
          data={cities}
          state={{ isLoading: loading }}
          enableColumnOrdering
          enableGlobalFilter
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => handleRowClick(row.original),
            sx: { cursor: "pointer" }, // kan behålla inline för små tweaks
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

        <DialogContent dividers className="dialog-content">
          {loadingCity ? (
            <Box className="loading-container">
              <CircularProgress />
            </Box>
          ) : selectedCity ? (
            <>
              <Typography>
                <strong>Namn:</strong> {selectedCity.name}
              </Typography>

              <TextField
                label="Movie"
                value={editedMovie}
                onChange={(e) => setEditedMovie(e.target.value)}
                fullWidth
              />

              <Typography>
                <strong>GUID:</strong> {selectedCity.guid}
              </Typography>
            </>
          ) : (
            <Typography>Ingen data hittades.</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Uppdatera
          </Button>
          <Button onClick={handleDelete} variant="outlined" color="error">
            Ta bort
          </Button>
          <Button
            onClick={() => setModalOpen(false)}
            variant="contained"
            color="secondary"
          >
            Stäng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CitiesPage;
