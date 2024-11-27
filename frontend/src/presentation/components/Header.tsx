"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Header() {
  const router = useRouter();

  const handleRouteChange = () => {
    router.push("/ride-history");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href={"/"}>Sua Viagem</Link>
        </Typography>
        <Button color="inherit" onClick={handleRouteChange}>
          Histórico de Viagens
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
