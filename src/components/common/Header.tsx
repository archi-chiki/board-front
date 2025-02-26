import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled.div`
  background-color: #008cba;
  color: white;
  height: 120px;
  padding: 10px 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
  flex-grow: 1;
`;

const NavLink = styled(RouterNavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 5px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &.active {
    color: rgb(16, 16, 16);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const navContents = [
  { href: "/", label: "Home" },
  { href: "/board", label: "게시판" },
  { href: "/video", label: "동영상" },
  { href: "/store", label: "스토어" },
];

export const Header = () => {
  return (
    <Container>
      <Title>Home Page</Title>
      <NavLinks>
        {navContents.map((content) => (
          <NavLink
            key={content.href}
            to={content.href}
            className={({ isActive }) => (isActive ? "active" : "")} // 활성화 상태에 따라 클래스 추가
          >
            {content.label}
          </NavLink>
        ))}
      </NavLinks>
    </Container>
  );
};
