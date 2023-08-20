import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  // width: calc(100vh * 0.001 + 5);
  // height: calc(100vh * 0.001 + 5);

  color: #fff;
  text-align: center;
  background-image: url('./bg.jpg');
  background-position: center;
`;

const BodyModel = styled.div`
  position: absolute;
  inset: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: calc(100vh * 0.001 + 5);
  height: calc(100vh * 0.001 + 5);
  // width: 100%;
  // height: 100%;

  cursor: pointer;
  background-color: transparent;
`;

export { Container, BodyModel };