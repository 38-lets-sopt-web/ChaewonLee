import styled from '@emotion/styled'

const Button = styled.button`
  padding: 10px 20px;
  background-color: hotpink;
  font-size: 24px;
  border: none;
  color: white;
  font-weight: bold;
  &:hover {
    color: black;
  }
`

function App() {
  return <Button>Emotion 버튼 테스트</Button>
}

export default App
