import { h } from 'preact';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../context/user-context';
import Wrapper from './wrapper';

const List = styled.ul`
  display: flex;
  list-style: none;
  margin-bottom: 0;
  padding-left: 0;

  li {
    margin-right: 25px;
    
    a {
      color: ${(props) => props.theme.color.accent};
      font-weight: 600;
      font-size: 18px;
      text-decoration: none;    
      
      &[aria-current] {
        font-weight: 700;
      }
      
      &:hover {
        text-decoration: underline;
      }
    } 
  }
`;

function Header() {
  const { user } = useUser();

  return (
    <nav className="container my-3">
      <Wrapper className="d-flex justify-content-between align-items-center">
        <List>
          <li>
            <NavLink exact to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/domains">Domains</NavLink>
          </li>
        </List>

        <div>
          {user?.email}
        </div>
      </Wrapper>

    </nav>
  );
}

export default Header;
