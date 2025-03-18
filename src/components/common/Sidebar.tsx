import { NavLink as RouterNavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { useState } from "react";

const SidebarContainer = styled.div<{ isExpanded: boolean }>`
  width: ${(props) => (props.isExpanded ? "200px" : "80px")};
  height: 100vh;
  background-color: #008cba;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  transition: width 0.3s ease-in-out;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  margin-top: 30px;

  h2 {
    text-align: center;
  }
`;

const NavLink = styled(RouterNavLink)<{ isExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 60px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    color: rgb(16, 16, 16);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const navContents = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/board", label: "게시판", icon: "📃" },
  { href: "/video", label: "동영상", icon: "🎥" },
  { href: "/store", label: "스토어", icon: "🛒" },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SidebarContainer
      isExpanded={isExpanded}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <NavLinks>
        <h2 style={{ display: isExpanded ? "block" : "none" }}>Homepage</h2>
        {navContents.map((content) => (
          <NavLink key={content.href} to={content.href} isExpanded={isExpanded}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              {content.icon}
              <p style={{ display: isExpanded ? "block" : "none", marginLeft: "10px" }}>
                {content.label}
              </p>
            </div>
          </NavLink>
        ))}
      </NavLinks>
    </SidebarContainer>
  );
}
