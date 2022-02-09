import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loggedInState, shelvesState, userState } from "./atoms";
import About from "./components/About";
import Header from "./components/Header";
import Main from "./components/Main";
import ModalWindow from "./components/ModalWindow";
import Search from "./components/Search";

function Router() {
  const [loggedInRecoil, setLoggedInRecoil] = useRecoilState(loggedInState);
  const [userRecoil, setUserRecoil] = useRecoilState(userState);
  const [shelvesRecoil, setShelvesRecoil] = useRecoilState(shelvesState);

  // 세션에서 로그인 여부 & 리코일 가져오기 (최초)
  useEffect(() => {
    (async () => {
      // 로그인 정보 리코일에 저장
      const { loggedIn, user } = await fetch("/api/session").then((res) =>
        res.json()
      );
      setLoggedInRecoil(loggedIn);
      setUserRecoil(user);

      // shelves 정보 가져와 리코일에 저장.
      const shelves = await fetch("/api/shelves").then((res) => res.json());
      shelves[0] === undefined
        ? setShelvesRecoil([{ category: "new", books: [] }])
        : setShelvesRecoil(shelves);
    })();
  }, []);

  // shelves 변동값 생기면 서버에 반영시키기
  useEffect(() => {
    if (loggedInRecoil) {
      (async () => {
        fetch("/api/shelves", {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(shelvesRecoil),
        });
        console.log("get from /api/shelves with shelves change");
      })();
    }
  }, [shelvesRecoil, loggedInRecoil]);

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
          {loggedInRecoil ? <Main /> : <About />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
