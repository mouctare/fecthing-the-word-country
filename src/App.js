import Home from "./pages/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import News from "./pages/News";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/a-propos" component={About} />
        <Route path="/news" component={News} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
