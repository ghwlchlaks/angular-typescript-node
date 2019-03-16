# 프로젝트 주요 스펙

- Front-end : Angular + Bootstrap + ng-bootstrap + typescript
- Back-end : Node.ts + MongoDB 

# 실행 방법

**클라이언트**
### step 1  
`cd angular`

### step 2
```
Run `ng serve --aot` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Prodution server
`ng build --prod`

### Angular + Angular universal + Product Build
`npm run build:ssr`

### Angular + Angular universal + Product Build + Run
`npm run serve:ssr`
```

**서버**

```
npm run watch-ts
```

### another terminal 
```
npm run watch-node
```

# [Back-end]  
## 1. 기능 구현  

**사용한 모듈**  

- axios : api 요청 시 사용되는 모듈
- cors : 개발시 cross-domain 이슈를 해결하기위해서 사용하는 모듈
- mongoose : api 데이터를 저장하기위해 사용하는 모듈

## 2. 스키마 (옵션은 생략)  
**(1) top10 모델**  
> entries: [{  
> uid - 유저 고유 id  
> username - 유저 아이디  
> kills - 유저 kills 전적  
> wins - 유저 wins 전적  
> matches - 유저 matches 전적  
> minutes - 유저 minutes 전적   
> score - 유저 score 전적   
> kd - 유저 kd 전적  
> platform - 유저 platform  
> rank - 유저 rank  
> }]  
> lastupdate - 마지막 업데이트 시간  

**(2) 유저 상세 전적 모델**  
> platforms - 유저 platform(ps4, pc, xbox)      
> seasons - 유저 시즌  
> uid - 유저 uid   
> username - 유저 아이디  
> platform - 유저 platform(ps4, pc, xbox)    
> timestamp - 최근 게임 시간  
> stats - {   
> kills_solo: 솔로 킬  
> placetop1_solo: top1 솔로    
> placetop10_solo: top10 솔로   
> placetop25_solo: top25 솔로     
> matchesplayed_solo: 솔로 게임 수  
> kd_solo: 솔로 kd
> winrate_solo: 솔로 승리 %  
> score_solo: 솔로 총점   
> minutesplayed_solo: 솔로 게임 시간   
> lastmodified_solo: 마지막 수정 시간   
> kills_duo: 듀오 킬  
> placetop1_duo: top1 듀오   
> placetop5_duo: top5 듀오  
> placetop12_duo: top12 듀오  
> matchesplayed_duo: 듀오 게임 수  
> kd_duo: 듀오 kd   
> winrate_duo: 듀오 승리 %   
> score_duo: 듀오 총점  
> minutesplayed_duo: 듀오 게임 시간  
> lastmodified_duo: 마지막 수정 시간  
> kills_squad: 스쿼드 kill   
> placetop1_squad: top1 스쿼드  
> placetop3_squad: top3 스쿼드   
> placetop6_squad: top6 스쿼드  
> matchesplayed_squad: 스쿼드 게임 수  
> kd_squad: 스쿼드 kd  
> winrate_squad: 스쿼드 승리 %   
> score_squad: 스쿼드 종점  
> minutesplayed_squad: 스쿼드 게임 시간   
> lastmodified_squad: 마지막 수정 시간  
> }  
