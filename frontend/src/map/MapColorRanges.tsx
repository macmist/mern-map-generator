import {
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { ColorRange, defaultRangeArray } from "../lib/types";
import ColorPickerModal from "./ColorPickerModal";
import { useState } from "react";

interface MapColorRangesProps {
  heightColors?: Array<ColorRange>;
  onSave?: (heightColors: Array<ColorRange>) => void;
}

const newColorRange = (): ColorRange => {
  return { min: 0, max: 1, color: "#000000" };
};

const MapColorRanges = ({
  heightColors = defaultRangeArray,
  onSave,
}: MapColorRangesProps) => {
  const onClickSave = () => {
    if (onSave) onSave(ranges);
  };
  const [ranges, setRanges] = useState<Array<ColorRange>>(heightColors || []);

  const [modalsVisibility, setModalsVisibility] = useState<Array<boolean>>(
    heightColors ? heightColors.map((_) => false) : []
  );
  const updateModalVisibility = (index: number, visible: boolean) => {
    const newVisivibility = modalsVisibility.map((x, idx) => {
      if (idx === index) return visible;
      return x;
    });
    setModalsVisibility(newVisivibility);
  };

  const addRange = () => {
    const newRanges = [...ranges, newColorRange()];
    setRanges(newRanges);
    setModalsVisibility([...modalsVisibility, false]);
  };

  const removeRange = (idx: number) => {
    const newRanges = [...ranges];
    const newModalsVisibility = [...modalsVisibility];

    if (idx > -1) {
      newRanges.splice(idx, 1);
      newModalsVisibility.splice(idx, 1);
    }
    setRanges(newRanges);
    setModalsVisibility(newModalsVisibility);
  };

  const onUpdateRange = (index: number, key: string, value: string) => {
    const range: ColorRange = ranges[index];
    if (!["color", "min", "max"].includes(key)) return;
    if (key === "color") range[key] = value;
    if (key === "min") range[key] = Number.parseInt(value) / 100;
    if (key === "max") range[key] = Number.parseInt(value) / 100;

    const newRanges = ranges.map((x, idx) => {
      if (idx === index) return range;
      return x;
    });
    setRanges(newRanges);
  };
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Min</TableCell>
              <TableCell>Max</TableCell>
              <TableCell>Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ranges.map((range, idx) => (
              <TableRow key={idx.toString()}>
                <TableCell>{range.min}</TableCell>
                <TableCell>{range.max}</TableCell>
                <TableCell
                  id={`color-${idx}-cell`}
                  onClick={(e: React.BaseSyntheticEvent) => {
                    console.log(e.target.id);
                    if (e.target.id.includes(`color-${idx}`))
                      updateModalVisibility(idx, true);
                    else console.log("clicked somewhere else");
                  }}
                >
                  <TextField
                    id={`color-${idx}-text`}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          position="start"
                          id={`color-${idx}-adornment`}
                        >
                          <span
                            id={`color-${idx}-span`}
                            style={{
                              backgroundColor: range.color,
                              width: "20px",
                              height: "20px",
                            }}
                          ></span>
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                    value={range.color}
                  />
                  <ColorPickerModal
                    color={range.color}
                    onClose={() => updateModalVisibility(idx, false)}
                    onChange={(color) => {
                      onUpdateRange(idx, "color", color);
                    }}
                    visible={modalsVisibility[idx]}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => removeRange(idx)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={addRange}>Add range</Button>
      <Button onClick={onClickSave}>Save</Button>
    </div>
  );
};

export default MapColorRanges;
