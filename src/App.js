import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const App = () => {
  const [list, setList] = useState([]);

  const fetcer = async () => {
    const res = await axios.get("http://localhost:4000/data");
    const newList = res.data;
    const a = newList.sort((a, b) => b.comments - a.comments);
    console.log(a);
    setList(a);

    return;
  };

  useEffect(() => {
    fetcer();
  }, []);

  const convertDate = (date) => {
    console.log(date);
    const convertedDate = date.split("T")[0];
    return convertedDate;
  };

  return (
    <Wrapper>
      <ContentInner>
        {list.map((item) => (
          <ItemWrapper key={item.id}>
            <div>issueNumber : {item.number}</div>
            <div>Title : {item.title}</div>
            <div>date : {convertDate(item.created_at)}</div>
            <div>comments : {item.comments}</div>
          </ItemWrapper>
        ))}
      </ContentInner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentInner = styled.div`
  width: 30vw;
  border: 1px solid black;
  padding: 20px;
  overflow: auto;
`;

const ItemWrapper = styled.div`
  width: 100%;
  height: 200px;

  border: 1px solid black;
  margin: 10px 0px;
  & > div {
    margin: 20px;
  }
`;

export default App;
