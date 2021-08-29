import styled from 'styled-components';

const TextSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  color: white;
  font-weight: bold;
  height: 40vh;
  overflow: scroll;
  flex-wrap: wrap;
  box-shadow: 0px 5px 5px #0f0f0f;
`;

const KeywordsSection = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 20px 0;

  > * {
    margin: 2px;
    font-weight: bold;
  }
`;

const Controls = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  position: absolute;
  top: 85vh;
  left: 0;

  > * {
    margin: 20px 15px;
  }
`;

const Image = styled.img`
  margin-top: 20px;
  margin: '10px auto';
  height: 200px;
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const NotFoundText = styled.p`
  text-align: center;
  color: white;
  font-size: 22px;
`;

const WordSmall = styled.span`
  padding: 1px;
`;

const CurrentWordSmall = styled(WordSmall)`
  background-color: green;
`;

export {
  TextSection,
  Controls,
  Image,
  NotFoundContainer,
  NotFoundText,
  WordSmall,
  CurrentWordSmall,
  KeywordsSection,
};
