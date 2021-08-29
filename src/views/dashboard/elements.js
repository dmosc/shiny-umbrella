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
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  //height: 400px;
  color: white;
  font-weight: bold;
  overflow: scroll;
  flex-wrap: wrap;
`;

const KeywordsSection = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 20px;
  padding: 20px;

  > * {
    margin: 2px;
  }
`;

const Controls = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

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
  WordSection,
  TextSection,
  Controls,
  Image,
  NotFoundContainer,
  NotFoundText,
  WordSmall,
  CurrentWordSmall,
  KeywordsSection,
};
