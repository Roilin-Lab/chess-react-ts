import type { FC } from "react";
import ChessBoard from "./ChessBoard";
import ChessPanel from "./ChessPanel";

import { ChessboardProvider } from "../contexts";

import styled from "styled-components";

interface ChessLayoutProps {}

const Layout = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: auto;
  height: auto;
  justify-content: center;
  gap: 2rem;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ChessLayout: FC<ChessLayoutProps> = ({}) => {
  return (
    <Layout>
      <ChessboardProvider>
        <ChessBoard></ChessBoard>
        <ChessPanel></ChessPanel>
      </ChessboardProvider>
    </Layout>
  );
};

export default ChessLayout;
