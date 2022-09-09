import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backBtn from "../assets/img/icon/Back.svg";
import nextCursorBtn from "../assets/img/btn/nextCursor.png";
import previousCursorBtn from "../assets/img/btn/previousCursor.png";
import { useEffect } from 'react';
import axios from 'axios';
import { getCookie } from '../shared/Cookie';

const ZZim = () => {
  const navigate = useNavigate()

  useEffect(()=>{
    const myToken = getCookie("token");
    const getZzim = async() =>{
      const head = {
        headers: {Authorization: `Bearer ${myToken}`}
      }
      await axios.get("https://goodjobcalendar.shop/api/schedule/scrap",head)
                .then((res)=>{
                  console.log(res.data.data)
                })
    }
    getZzim()
  },[])

  return (
    <MainWrapper>
      <UpBar>
        <BackBtn src={backBtn} onClick={() => navigate(-1)} />
        <Main>
          공고찜
        </Main>
      </UpBar>
      <MiddleButton>
        <div>스크랩순</div>
        <div>|</div>
        <div>날짜순</div>
      </MiddleButton>

      <JobCard
              // key={idx}
              // onClick={() => navigate(`/jobDetail/${tasksData.postingId}`)}
            >
              <CompanyName>터그코리아</CompanyName>
              <JobTitle>터크코리아㈜ 영업지원 신입/경력 직원 채용</JobTitle>
              <DetailInfo>
                <JobTagsWrap>
                  <JobTags>신입·경력</JobTags>
                  <JobTags>중소·중견기업</JobTags>
                </JobTagsWrap>

                <EndTime>
               ~ 2122-01-01
                  {/* {tasksData.deadline.split(" ")[0] === "2122-01-01"
                    ? "상시채용"
                    : "~" + tasksData.deadline.split(" ")[0]} */}
                </EndTime>
              </DetailInfo>
            </JobCard>


      <BottomBox>
          <img src={previousCursorBtn} alt="이전"/>
          <img src={nextCursorBtn} alt="이후"/>
      </BottomBox>
    </MainWrapper>
  )
}

export default ZZim

const MainWrapper = styled.div`
  background-color: var(--blue1);
  height: 100vh;
  overflow: hidden;

`;

const UpBar = styled.div`
  height: 56px;
  background: #3284ff;
  display: flex;
  position: relative;
`;

const BackBtn = styled.img`
  width: 14px;
  height: 14px;
  cursor: pointer;
  position: fixed;
  left: 4%;
  top: 20px;
`;

const Main = styled.div`
  font-weight: 700;
  color: #ffffff;
  margin: auto;
  font-size: 12.1px;
  letter-spacing: 1px;
`;

const MiddleButton =styled.div`
  display: flex;
  width: 113px;
  padding: 24px 16px 24px 256px; 
  gap: 8px;
  div{
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    color: var(--gray3);
  }
`

const BottomBox =styled.div`
  position: fixed;
  bottom: 30px;
  left: 16px;
`

const JobCard = styled.div`
  background: white;
  border-radius: 15px;
  margin: 6px auto;
  cursor: pointer;
  padding: 21px 22px 20px 19px;
  width: 302px;
`;

const CompanyName = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: #777777;
  margin-bottom: 3px;
`;

const JobTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #111111;
  margin-bottom: 16px;
  width: 300px;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DetailInfo = styled.div`
  height: 14px;
  display: inline-block;
  display: flex;
  justify-content: space-between;
`;

const JobTagsWrap = styled.div`
  display: flex;
  margin-left: 2px;
`;

const JobTags = styled.div`
  width: auto;
  height: 14px;
  font-weight: 500;
  font-size: 12px;
  margin-right: 8px;
  color: #9a9a9a;
`;

const EndTime = styled.div`
  height: 14px;
  font-weight: 500;
  font-size: 12px;
  color: #74a0e3;
`;