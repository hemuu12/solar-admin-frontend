import {
  Box,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SavingsImg from "public/images/backgrounds/piggy.png";
import Image from "next/image";

const sells: any = [
  {
    product: "MaterialPro",
    price: "23,568",
    percent: 55,
    color: "primary",
  },
  {
    product: "Flexy Admin",
    price: "23,568",
    percent: 20,
    color: "secondary",
  },
];

const SellingProducts = () => {
  const theme = useTheme();
  const secondarylight = theme.palette.secondary.light;
  const primarylight = theme.palette.primary.light;
  const secondary = theme.palette.secondary.main;
  const primary = theme.palette.primary.main;
  const borderColor = theme.palette.divider;

  return (
      <></>
  );
};

export default SellingProducts;
