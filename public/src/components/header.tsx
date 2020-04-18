import { h } from 'preact';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  list-style: none;
  background: #fff;
  padding: 15px 25px;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
  
  li {
    margin-right: 25px;
    
    a {
      color: ${(props) => props.theme.color.accent};
      font-weight: 600;
      font-size: 18px;
      text-decoration: none;    
      
      &[aria-current] {
        font-weight: 800;
      }
      
      &:hover {
        text-decoration: underline;
      }
    } 
  }
`;

function Header() {
  return (
    <nav className="container">
      <List>
        <li>
          <NavLink exact to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/domains">Domains</NavLink>
        </li>
      </List>
    </nav>
  );
}

export default Header;
