import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import "./App.css";
import Card from "./components/Card";
import { useState, useEffect, useCallback } from "react";
import { useFetchPokemon } from "./api/fetchPokemon";
import randomItem, { generateRandomNumber } from "./utils/randomItem";

function App() {
  const [originalPokemonList, setOriginalPokemonList] = useState<any[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<any[]>([]);
  const { getPokemon } = useFetchPokemon();

  const handleFilteringPokemonList = (data: any) => {
    const sortedList = data.sort(() => 0.5 - generateRandomNumber());

    const selection = sortedList.slice(0, 7);

    setFilteredPokemonList(selection);
  };

  useEffect(() => {
    getPokemon().then((data) => {
      setOriginalPokemonList(data);
      handleFilteringPokemonList(data);
    });
  }, []);

  const handleAddCard = useCallback(() => {
    const selectedCards = filteredPokemonList.map((i) => i.name);

    if (
      !originalPokemonList.length ||
      !filteredPokemonList.length ||
      selectedCards.length === originalPokemonList.length
    )
      return;
    const card = randomItem(originalPokemonList, selectedCards);

    setFilteredPokemonList([...filteredPokemonList, card]);
  }, [originalPokemonList, filteredPokemonList]);

  return (
    <Stack>
      <Box sx={{ padding: 5 }}>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() => handleAddCard()}
            sx={{ margin: 5 }}
          >
            Add Card
          </Button>
          <Button
            variant="contained"
            onClick={() => handleFilteringPokemonList(originalPokemonList)}
            sx={{ margin: 5 }}
          >
            Reset
          </Button>
        </ButtonGroup>

        <Typography
          sx={{ marginLeft: "auto" }}
        >{`${filteredPokemonList.length} / ${originalPokemonList.length}`}</Typography>
      </Box>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error */}
      <Grid container spacing={4} justify="center">
        {filteredPokemonList?.map((p) => {
          return (
            <Grid item xs={12} sm={6} md={4}>
              <Card pokemonData={p} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

export default App;
