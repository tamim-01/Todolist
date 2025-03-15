import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export function Input({
  label,
  error,
  type,
  id,
  name,
  style,
  placeholder,
  onChangeHandler,
  stateValue,
  required,
}) {
  return (
    <TextField
      required={required}
      error={error}
      id={id || "outlined-required"}
      label={label}
      name={name}
      value={stateValue}
      onChange={onChangeHandler}
      placeholder={placeholder}
      type={type}
      className="w-full p-6 md:p-0"
      InputLabelProps={{
        style: { color: "#4ade80" }, // Green text for labels
      }}
      InputProps={{
        style: { color: "#ffffff" }, // White text for input
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#4ade80", // Green border
          },
          "&:hover fieldset": {
            borderColor: "#4ade80", // Green border on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4ade80", // Green border when focused
          },
        },
      }}
    />
  );
}

export function PasswordInput({
  label,
  error,
  id,
  name,
  placeholder,
  onChangeHandler,
  stateValue,
  required,
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      required={required}
      error={error}
      id={id || "outlined-password-input"}
      label={label}
      name={name}
      value={stateValue}
      onChange={onChangeHandler}
      placeholder={placeholder}
      type={showPassword ? "text" : "password"}
      className="w-full p-6 md:p-0"
      InputLabelProps={{
        style: { color: "#4ade80" }, // Green text for labels
      }}
      InputProps={{
        style: { color: "#ffffff" }, // White text for input
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              style={{ color: "#4ade80" }} // Green icon
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#4ade80", // Green border
          },
          "&:hover fieldset": {
            borderColor: "#4ade80", // Green border on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "#4ade80", // Green border when focused
          },
        },
      }}
    />
  );
}
