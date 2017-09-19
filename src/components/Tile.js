import styled, { css } from "styled-components";

export default styled.span`
  display: inline-block;
  height: 12.5%;
  width: 12.5%;
  position: absolute;
  ${({ background, top, left }) => css`
    background: ${background};
    top: ${top};
    left: ${left};
  `};
`;
