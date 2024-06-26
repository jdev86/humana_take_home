import { Card, CardContent, Typography, CardMedia, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useFetchPokemon } from "../api/fetchPokemon";
const SimpleCard = ({ pokemonData }: any) => {
  const { getPokemonDetails } = useFetchPokemon();
  const [pokemonDetails, setPokemonDetails] = useState();

  useEffect(() => {
    getPokemonDetails(pokemonData.url).then((data) => {
      setPokemonDetails(data);
    });
  }, [pokemonData.url]);

  return (
    <Card sx={{ width: "auto" }}>
      <CardMedia
        sx={{ height: 250, padding: "2rem" }}
        image={pokemonDetails?.sprites["front_default"]}
        title={pokemonDetails?.name}
      />
      <CardContent>
        <Stack direction="row">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {pokemonDetails?.name.replace(/^./, (str: string) =>
              str.toUpperCase()
            )}
          </Typography>
          <Typography sx={{ marginLeft: "auto" }}>
            Weight: {pokemonDetails?.weight} lbs.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SimpleCard;
