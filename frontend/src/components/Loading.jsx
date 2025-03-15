import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for the spinner animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled components for the loading spinner and container

const Spinner = styled.div`
  border: 4px solid rgba(0, 255, 0, 0.3); // Green border with transparency
  border-top: 4px solid #00ff00; // Bright green border
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite; // Spin animation
`;

const LoadingText = styled.p`
  color: #00ff00; // Green text
  font-size: 1.5rem;
  margin-top: 20px;
`;

const Logo = styled.img`
  width: 100px; // Adjust the size of the logo
  margin-bottom: 20px;
`;

// Loading Component
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Spinner />
      <LoadingText>Loading...</LoadingText>
    </div>
  );
};

export default Loading;
