import { useState } from "react";
import { DEFAULT_N, DEFAULT_RB, MapParams } from "../api/map";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";

interface MapOptionProps {
  onSubmit: (params: MapParams) => void;
  params: MapParams;
}

const range = (from: number, to: number, step: number) =>
  [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

const MapOptions = (props: MapOptionProps) => {
  const { onSubmit, params } = props;
  const [n, setN] = useState<number>(params.n || DEFAULT_N);
  const [rb, setRb] = useState<number>(params.rb || DEFAULT_RB);
  const [seed, setSeed] = useState<string>(
    params.seed || Date.now().toString()
  );
  return (
    <Stack
      direction="row"
      spacing={2}
      style={{ paddingTop: 20, paddingBottom: 20 }}
    >
      <FormControl>
        <InputLabel id="n">Size</InputLabel>

        <Select
          labelId="n"
          id="n"
          value={n}
          label="Map size"
          onChange={(e) => setN(Number(e.target.value))}
        >
          {range(5, 12, 1).map((x) => {
            const size = Math.pow(2, x) + 1;
            return (
              <MenuItem value={x} key={x}>
                {size} * {size} px
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        id="rb"
        label="random Bound"
        value={rb}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        onChange={(e) => setRb(Number(e.target.value))}
      />
      <TextField
        id="seed"
        label="seed"
        value={seed}
        onChange={(e) => setSeed(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => onSubmit({ n: n, rb: rb, seed: seed })}
      >
        Re Generate
      </Button>
    </Stack>
  );
};

export default MapOptions;
