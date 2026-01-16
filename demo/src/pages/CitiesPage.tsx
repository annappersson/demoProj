import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { getCities, getCity } from "../services/demoAPI";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

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
    } finally {
      setLoadingCity(false);
    }
  };

  const columns = useMemo<MRT_ColumnDef<cities>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Stad",
        size: 80,
      },
    ],
    []
  );

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={cities}
        state={{ isLoading: loading }}
        enableColumnOrdering
        enableGlobalFilter
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => handleRowClick(row.original),
          sx: { cursor: "pointer" },
        })}
      />
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Stadsinformation</DialogTitle>

        <DialogContent dividers>
          {loadingCity ? (
            <div
              style={{ display: "flex", justifyContent: "center", padding: 20 }}
            >
              <CircularProgress />
            </div>
          ) : selectedCity ? (
            <>
              <Typography>
                <strong>Namn:</strong> {selectedCity.name}
              </Typography>
              <Typography>
                <strong>Movie:</strong> {selectedCity.movie}
              </Typography>
              <Typography>
                <strong>GUID:</strong> {selectedCity.guid}
              </Typography>
            </>
          ) : (
            <Typography>Ingen data hittades.</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setModalOpen(false)}
            variant="contained"
            color="primary"
          >
            Stäng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CitiesPage;
