


import { css } from '@emotion/react';
import { Theme } from '@mui/material/styles';

// Global styles with Rubik font
export const globalStyles = (theme: Theme) => css`
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');
  
  body {
    font-family: 'Rubik', sans-serif;
    margin: 0;
    padding: 0;
    direction: ltr; // Changed to left-to-right for English
    background-color: #f8fafc;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const courseCardContainerStyles = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const courseTitleStyles = (theme: Theme) => css`
  text-align: center;
  margin-bottom: 16px;
  color: #1e3a8a;
  font-weight: 600;
`;

export const headerQuoteStyles = (theme: Theme) => css`
  font-style: italic;
  color: #64748b;
  text-align: center;
  margin-bottom: 32px;
`;

export const pageHeaderStyles = (theme: Theme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;