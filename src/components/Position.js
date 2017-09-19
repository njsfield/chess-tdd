import styled, { css } from "styled-components";

export default styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  line-height: .5rem;
  cursor: pointer;
  height: 12.5%;
  width: 12.5%;
  position: absolute;
  transition: all .2s ease;
  ${({ color, background, top, left }) => css`
    background: ${background};
    color: ${color};
    top: ${top};
    left: ${left};
  `};
`;
