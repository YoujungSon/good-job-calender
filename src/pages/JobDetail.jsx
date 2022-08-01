import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { loadJobList, loadCategoryList, loadJobDetails, addScrap } from "../redux/modules/job";

import buttonText from "../assets/img/btn/buttonText.png";
import backBtn from "../assets/img/btn/backBtn.png";
import coverimg from "../assets/img/cover/cover2.png";
import msg from "../assets/img/btn/msg.png";
const JobDetail = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const params = useParams();

  const id = params.id;

  const jobDetail = useSelector((state) => state.job.details.data);

  // console.log(jobDetail);

  useEffect(() => {
    dispatch(loadJobDetails(id));
  }, [id]);

  function getDate(whatDay) {
    //날짜문자열 형식은 자유로운 편

    const week = ["일", "월", "화", "수", "목", "금", "토"];

    const dayOfWeek = week[new Date(whatDay).getDay()];

    return dayOfWeek;
  }

  const [isScrap, setIsScrap] = React.useState(false);

  return (
    <MainWrap>
      <Header src={coverimg} />

      <MainWrapper>
        <CompanyWrap>
          <CompanyName>{jobDetail?.companyName}</CompanyName>
          <CompanySize>{jobDetail?.companyType}</CompanySize>
        </CompanyWrap>

        <JobTitle>{jobDetail?.title}</JobTitle>

        <Line />
        <JobInfoFlex>
          <JobInfo>
            <InfoTitle>모집마감일자</InfoTitle>
            <InfoDetails style={{ fontWeight: "800" }}>
              {jobDetail?.deadline.split(" ")[0] === "2122-01-01"
                ? "상시채용"
                : jobDetail?.deadline.split(" ")[0] + " " + "(" + getDate(jobDetail?.deadline.split(" ")[0]) + ")"}
            </InfoDetails>
          </JobInfo>

          <JobInfo>
            <InfoTitle>지원 자격</InfoTitle>
            <InfoDetails>{jobDetail?.career}</InfoDetails>
          </JobInfo>

          <JobInfo>
            <InfoTitle>직무</InfoTitle>
            <InfoDetails>{jobDetail?.job[0]}</InfoDetails>
          </JobInfo>

          <JobInfo>
            <InfoTitle>지역</InfoTitle>
            <InfoDetails>{jobDetail?.city}</InfoDetails>
          </JobInfo>
        </JobInfoFlex>

        <BtnWrap>
          <BackBtn onClick={() => navigate("/job")}>
            <img src={backBtn} alt="뒤로가기" />
            관심없어요
          </BackBtn>
          <ScrapBtn
            scrap={jobDetail?.isScrap}
            onClick={() => {
              dispatch(addScrap(id));
            }}
          >
            <MsgImg src={msg} alt="뒤로가기" />
            캘린더로 스크랩
          </ScrapBtn>
        </BtnWrap>

        <JobKoreabtn
          onClick={() => {
            window.open(jobDetail?.url);
          }}
        >
          <img src={buttonText} alt="잡코리아공고링크연결" />
          자세한 공고 잡코리아에서 확인
        </JobKoreabtn>
      </MainWrapper>
    </MainWrap>
  );
};

const MainWrap = styled.div`
  position: relative;
  background: #ecf1f8;
  height: 100vh;
`;

const Header = styled.img`
  width: 100%;
  height: 230px;
  border-radius: 0px 0px 18px;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 48px);
  background: var(--blue1);
  padding: 40px 24px;
`;

const CompanyWrap = styled.div`
  height: 23px;
  display: flex;
  justify-content: space-between;
  line-height: 24px;
  margin-bottom: 12px;
`;

const CompanyName = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #3284ff;
`;

const CompanySize = styled.div`
  width: auto;
  height: 23px;
  padding: 3px 6px;
  gap: 10px;
  margin-right: 5px;
  background: #a6c9ff;
  border-radius: 19px;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
`;

const JobTitle = styled.div`
  width: 100%;
  padding: 15px 0;
  font-weight: 500;
  font-size: 20px;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Line = styled.hr`
  width: 100%;
  border: 1px solid #d1d1d1;
  margin-bottom: 28px;
`;

const JobInfo = styled.div`
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
`;
const JobInfoFlex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const InfoTitle = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: #3284ff;
`;

const InfoDetails = styled.p`
  font-weight: 500;
  font-size: 16px;
  color: #111111;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
`;

const BackBtn = styled.div`
  padding: 18px 30px;
  background: #d1d1d1;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: #9a9a9a;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BackBtnImg = styled.img`
  width: 99px;
  margin: auto;
`;

const MsgImg = styled.img`
  position: absolute;
  top: -65px;
  left: 50%;
  transform: translateX(-50%);
`;
const ScrapBtn = styled.div`
  position: relative;
  padding: 18px 30px;
  font-weight: 500;
  background: transparent;
  background-color: ${(props) => (props.scrap ? "var(--blue4)" : "transparent")};
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
  border: 2px solid #3284ff;
  color: ${(props) => (props.scrap ? "white" : "#3284ff")};
`;

const JobKoreabtn = styled.div`
  background: #3284ff;
  border-radius: 6px;
  display: flex;
  gap: 10px;
  cursor: pointer;
  padding: 18px 50px;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
  margin-top: 16px;
`;

export default JobDetail;
