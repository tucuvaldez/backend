import app from "./server.js";

const PORT = process.env.PORT || 8081;
const server = app.listen(PORT, () => {
  console.log(`Server connected on port: http://localhost:${PORT}`);
});
server.on("error", (error) => console.log(`Server error: ${error}`));
