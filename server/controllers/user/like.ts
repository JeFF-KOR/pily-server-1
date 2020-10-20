/*
ISSUE

로그인 한 유저의 좋아요 및 좋아요 해제 구현.
Group: server
Type:feature
Detail: 'fill me'
TODO
 Job1 : 좋아요 구성하기.
 Job2 : 좋아요 해제 구성하기.
 Job3 : 권한이 없는 (로그인 안된) 유저의 좋아요 관련 요청시 거부하기

 */

 /*
 1. likes
  if (isloggedIn) {
  const a = findOne(where: id: id)
  if (islikes) {
    res.status(200).send({wqeqwe});
  } else {
    res.status(404).send({2313213});
  }
}

2. unlikes
  if (isLoggedIn) {
    const a = findOne({where: { id : id}});
    if (islikes === a.likes) {
      res.status(200).send({weqe})
    } else {
      res.status(404).send({eqwewqe})
    }
  }

3. unauthorized user
  if (!isLoggedIn) {
    res.status(403).send("로그인이 필요합니다.")
  }

 */

// 사용자가 좋아요를 누르면 좋아요 한 feed나 magazine을 like 테이블에 저장

// 좋아요 
const likesFeedAndMagazine = async (req, res) => {
   if (!isLoggedIn) { // req.user로 검증..?
     res.status(403).json({ message: "로그인이 필요합니다."});
   } else {
     const  = await Use    
   }
 }

// 안좋아요
const unlikesFeedAndMagazine = async (req, res) => {
  
}

//좋아요 한 목록보기
const likeList = async (req, res) => {

}