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

  /** Remove text highlighting **/

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /** Transition **/

  transition: all .2s ease;

  /** Custom **/
  ${({ colour, background, top, left, targetted }) => css`
    background: ${background};
    animation: ${targetted
      ? "flicker .1s linear 0s infinite alternate;"
      : "none"};
    color: ${colour};
    top: ${top};
    left: ${left};
  `};

  @keyframes flicker {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
`;
