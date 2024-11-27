"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "primary.main", // Uses Material-UI's primary color (blue by default)
        color: "white", // Ensures the text is visible
      }}
    >
      <Typography variant="body1" align="center">
        © {new Date().getFullYear()} Sua Viagem. Todos os direitos reservados.
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Feito com ❤️ por {"Rafael Heitor\n"}
        <Link href="https://github.com/rafaelheitor" underline="hover">
          Github
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
