import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { getCities } from "../services/demoAPI";

type cities = {
  guid: string;
  name: string;
};

const DashboardPage = () => {
  const [cities, setCities] = useState<cities[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCities()
      .then((res) => setCities(res.cities))
      .finally(() => setLoading(false));
  }, []);

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
    <MaterialReactTable
      columns={columns}
      data={cities}
      state={{ isLoading: loading }}
      enableColumnOrdering
      enableGlobalFilter
    />
  );
};

export default DashboardPage;
