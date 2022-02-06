import styled from "styled-components";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loggedInState, userState } from "../atoms";
import Main from "./Main";

// const Main2 = styled.main``;

// const Aside = styled.aside``;

function Home() {
  const [loggedInRecoil, setLoggedInRecoil] = useRecoilState(loggedInState);
  const SetUserRecoil = useSetRecoilState(userState);

  useEffect(() => {
    (async () => {
      const { loggedIn, user } = await fetch("/api/session").then((res) =>
        res.json()
      );
      setLoggedInRecoil(loggedIn);
      SetUserRecoil(user);
    })();
  }, []);

  return <>{loggedInRecoil ? <Main /> : null}</>;
}

export default Home;
