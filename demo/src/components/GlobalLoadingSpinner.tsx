import { Backdrop } from "@mui/material";
import { CircleLoader } from "react-spinners";

interface GlobalLoadingSpinnerProps {
    isLoading: boolean;
}

const GlobalLoadingSpinner = ({ isLoading }: GlobalLoadingSpinnerProps) => {
    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
            open={isLoading}
        >
            <CircleLoader color="#4c69e0" size={70} />
            <span style={{ fontFamily: "sans-serif", fontWeight: "bold" }}>
                Laddar...
            </span>
        </Backdrop>
    );
};

export default GlobalLoadingSpinner;