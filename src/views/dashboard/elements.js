import styled from 'styled-components';

const WordSection = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: xxx-large;
  color: #f54747;
`;

const TextSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
  height: 400px;
  color: white;
  font-weight: bold;
  overflow: scroll;
`;

const KeywordsSection = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  > * {
    margin: 2px;
  }
`;

const Controls = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export {WordSection, TextSection, KeywordsSection, Controls};
