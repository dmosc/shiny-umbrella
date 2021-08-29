import styled from 'styled-components';

const Word = styled.div`
  display: flex;
  padding: 5px 0;
  justify-content: center;
  font-weight: bold;
  font-size: xxx-large;
  color: #f54747;
`;

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

export {Word, TextSection, KeywordsSection, WordSmall, CurrentWordSmall};
