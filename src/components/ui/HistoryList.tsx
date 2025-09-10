import { useEffect, useRef, type PropsWithChildren } from "react";
import styled from "styled-components";

interface HistoryListProps extends PropsWithChildren {}
interface HistoryListIndexProps extends PropsWithChildren {}
interface HistoryListMoveProps extends PropsWithChildren {}

const ListWrapper = styled.div`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  grid-auto-rows: min-content;
  overflow-y: auto;
  scrollbar-gutter: stable;
  scrollbar-width: thin;
  scrollbar-color: darkgray transparent;

  font-size: 2.2rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr 3fr 3fr;
  }
`;
const IndexListItem = styled.div`
  background-color: #33312e;
  border-right: 2px solid #3c3b3a;
  text-align: center;
  align-content: center;
  color: #bababa;
  font-weight: normal;
  font-size: 1.6rem;
`;

const MoveListItem = styled.div`
  padding-left: 1rem;
  margin: 0.5rem 0;
  font-size: 1.8rem;
`;

const HistoryList = ({ children }: HistoryListProps) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [children]);

  return <ListWrapper ref={listRef}>{children}</ListWrapper>;
};

HistoryList.Index = ({ children }: HistoryListIndexProps) => {
  return <IndexListItem>{children}</IndexListItem>;
};

HistoryList.Move = ({ children }: HistoryListMoveProps) => {
  return <MoveListItem>{children}</MoveListItem>;
};

export default HistoryList;
