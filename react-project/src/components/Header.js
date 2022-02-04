import { Link, Route, Switch, useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loggedInState, userState } from "../atoms";
import ModalWindow from "./ModalWindow";

const Wrapper = styled.header`
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: pink;
`;

const Column = styled.div`
  display: flex;
`;

const Logo = styled.img`
  width: 50%;
`;

const Item = styled.div`
  padding: 10px;
  border-radius: 20px;
  margin: 0 5px;
  background-color: green;
`;

function Header({ loggedIn, user }) {
  const history = useHistory();
  const setLoggedInRecoil = useSetRecoilState(loggedInState);
  const setUserRecoil = useSetRecoilState(userState);

  async function onLogout() {
    fetch("/api/logout");
    setLoggedInRecoil(false);
    setUserRecoil(null);
    history.go(0);
  }

  return (
    <>
      <Wrapper>
        <Column>
          <Logo src="https://see.fontimg.com/api/renderfont4/3zqgy/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjMUExOTE5IiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/Qm9va1NoZWx2ZXM/gorilaz-personal-use-1-bold.png"></Logo>
        </Column>
        {loggedIn ? (
          <Column>
            <Item>
              <Link to="/search">Search</Link>
            </Item>
            <Item onClick={onLogout}>Logout</Item>
          </Column>
        ) : (
          <Column>
            <Item>
              <Link to="/login">Login</Link>
            </Item>
            <Item>
              <Link to="/join">Join</Link>
            </Item>
          </Column>
        )}
      </Wrapper>
      <Switch>
        <Route path={["/login", "/join"]}>
          <ModalWindow />
        </Route>
      </Switch>
    </>
  );
}

export default Header;
