import styled from 'styled-components';

const TextSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  margin: 5px;
  color: white;
  font-weight: bold;
  height: 40vh;
  overflow: scroll;
  flex-wrap: wrap;
  scroll-behavior: smooth;
  box-shadow: 0 0 5px 1px #1f1f1f;
`;

const KeywordsSection = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 10px 0;

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
  top: 87vh;
  left: 0;

  > * {
    margin: 20px 15px;
  }
`;

const InformationSection = styled.div`
  display: flex;
  color: honeydew;
  margin-top: 10px;
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
  cursor: pointer;
  padding: 3px;

  &:hover {
    color: yellow;
  }
`;

const CurrentWordSmall = styled(WordSmall)`
  color: yellow;
`;

export {
  TextSection,
  Controls,
  InformationSection,
  Image,
  NotFoundContainer,
  NotFoundText,
  WordSmall,
  CurrentWordSmall,
  KeywordsSection,
};
