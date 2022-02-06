import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInState, userState } from "./atoms";
import About from "./components/About";
import Header from "./components/Header";
import Home from "./components/Home";
import ModalWindow from "./components/ModalWindow";
import Search from "./components/Search";

function Router() {
  const loggedInRecoil = useRecoilValue(loggedInState);
  const userRecoil = useRecoilValue(userState);

  return (
    <BrowserRouter>
      <Header loggedIn={loggedInRecoil} user={userRecoil} />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path={["/login", "/join"]}>
          <ModalWindow />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
