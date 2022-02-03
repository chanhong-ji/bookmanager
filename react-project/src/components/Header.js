import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isLoggedInState } from "../atoms";
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
`;

function Header() {
  const [isloggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  return (
    <>
      <Wrapper>
        <Column>
          <Logo src="https://see.fontimg.com/api/renderfont4/3zqgy/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjMUExOTE5IiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/Qm9va1NoZWx2ZXM/gorilaz-personal-use-1-bold.png"></Logo>
        </Column>
        {isloggedIn ? (
          <Column>
            <Item>
              <Link to="/search">Search</Link>
            </Item>
            <Item>
              <Link to="/logout">Logout</Link>
            </Item>
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
      <ModalWindow />
    </>
  );
}

export default Header;
