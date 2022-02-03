import { Link, useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import Header from "./Header";

const Main = styled.main``;

const Btn = styled.button``;

const Section = styled.section``;

const Title = styled.h3``;

const Shelve = styled.div``;

const Main2 = styled.main``;

const Aside = styled.aside``;

function Home() {
  return (
    <>
      <Header />
      <Main>
        <Btn>+</Btn>
        <Section>
          <Title></Title>
          <Shelve></Shelve>
        </Section>
      </Main>
      <Aside></Aside>
    </>
  );
}

export default Home;
