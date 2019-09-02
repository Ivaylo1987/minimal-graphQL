
import { app } from './grapql/server';
const port = 3000;

app.listen(port, () => {
  console.log(`Graphal listening on http://localhost:${port}`)
});
