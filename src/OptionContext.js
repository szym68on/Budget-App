import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";
const options = [
  { id: uuidv4(), imgPath: "./img/image.png", price: 50, name: "Netflix" },
  { id: uuidv4(), imgPath: "./img/amazon.png", price: 10, name: "Amazon" },
  { id: uuidv4(), imgPath: "./img/facebook.png", price: 1, name: "Facebook" },
  { id: uuidv4(), imgPath: "./img/google.png", price: 5, name: "Google" },
  { id: uuidv4(), imgPath: "./img/spotify.png", price: 30, name: "Spotify" },
];
export const OptionContext = createContext(options);
