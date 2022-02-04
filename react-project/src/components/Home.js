import styled from "styled-components";
import Header from "./Header";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loggedInState, userState } from "../atoms";
import Main from "./Main";

// const Main2 = styled.main``;

const Aside = styled.aside``;

function Home() {
  const [loggedInRecoil, setLoggedInRecoil] = useRecoilState(loggedInState);
  const [userRecoil, SetUserRecoil] = useRecoilState(userState);
  useEffect(() => {
    (async () => {
      const { loggedIn, user } = await fetch("/api/session").then((res) =>
        res.json()
      );
      setLoggedInRecoil(loggedIn);
      SetUserRecoil(user);
    })();
  }, []);

  return (
    <>
      <Header loggedIn={loggedInRecoil} user={userRecoil} />
      <Main></Main>
      <Aside></Aside>
    </>
  );
}

export default Home;
