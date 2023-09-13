import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerModalProps {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
  visible: boolean;
}
const ColorPickerModal = (props: ColorPickerModalProps) => {
  const { color, onChange, onClose, visible } = props;
  const [currentColor, setCurrentColor] = useState<string>(color);
  return (
    <>
      <Modal
        open={visible}
        onClose={onClose}
        className="colorPickerModal"
        style={{
          /*align-self: baseline;*/
          width: "235px",
        }}
      >
        <Box>
          <HexColorPicker
            className={"mb-3"}
            color={currentColor}
            onChange={setCurrentColor}
          />
          <Button
            onClick={() => {
              onChange(currentColor);
              onClose();
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ColorPickerModal;
