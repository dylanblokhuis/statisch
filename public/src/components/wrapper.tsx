import { h } from 'preact';
import styled from 'styled-components';

const Main = styled.main`
  padding: 15px 25px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
`;

function Wrapper({ children }: { children: any }) {
  return (
    <Main>
      {children}
    </Main>
  );
}

export default Wrapper;
