
const GAME_DATA = {
  characters: [
    {
      id: "hogeng",
      label: "조사원 4",
      name: "호갱(본명: 안건호)",
      status: "실종",
      description: "2026년 7월에 입사한 신규 직원으로 애인이 용감한 탑이 좋다고 하여 입사하게 되었다. 마지막 통신은 03:17에 종료되었으며 실종되기 전 “지원 부탁드려요요오오오.”라는 말을 남겼다."
    },
    {
      id: "gamja",
      label: "조사원 12",
      name: "감자(본명: 이원희)",
      status: "실종 추정",
      description: "2026년 6월에 입사한 직원. 자신은 웹 소설 애독자라서 괴이 정도는 괜찮다며 들어간 이후 실종된 것으로 확인. 현재 식량을 보유하고 있으며 호갱과 같이 있을 가능성이 높다."
    },
    {
      id: "lazy",
      label: "미확인 사용자",
      name: "귀차니즘(본명: 엄성현)",
      status: "생존 가능",
      description: "괴이에 휘말린 일반인. 야르 고등학교 2 학년으로 추정되며 애인이 있다."
    }
  ],

  rules: [
    { id:"elevator", title:"야간 엘리베이터 이용 수칙", place:"전국 일기 협회 별관", lines:[
      "오후 11 시 17 분 이후 엘리베이터의 4 층 버튼을 누르지 마십시오.",
      "문이 열렸는데 복도가 붉다면 내리지 말고 닫힘 버튼을 정확히 세 번 누르십시오.",
      "거울에 본인 외의 사람이 비치면 이름을 묻지 마십시오. 그 사람은 당신이 찾는 실종자도, 그 무엇도 아닙니다."
    ]},
    { id:"canteen", title:"폐쇄 구내식당 생존 수칙", place:"지하 식당 B2", lines:[
      "냉장고 안 감자 봉지가 말을 걸어도 대답하지 마십시오.",
      "식량을 배식하는 사람이 당신이 찾는 실종자라면 왼손에 상처가 있는지 확인하십시오.",
      "메뉴판에 ‘오늘의 직원’이 적혀 있으면 식당을 즉시 떠나십시오."
    ]},
    { id:"school", title:"야르 고등학교 2학년 7반 수칙", place:"야르 고등학교", lines:[
      "야간 학습 중 비어 있는 자리에 이름표가 생겨도 읽지 마십시오.",
      "방송에서 귀하의 이름을 세 번 부르면 창문을 열지 말고 책상 밑에 숨으십시오.",
      "교복을 입지 않은 학생이 부모에게 연락해야 한다고 말하면 휴대 전화를 빌려주되 화면을 보지 마십시오."
    ]},
    { id:"diary", title:"검은 일기 열람 수칙", place:"자료보관실 17번", lines:[
      "첫 장은 반드시 마지막 장을 확인한 뒤 읽으십시오.",
      "본인의 필체로 적힌 문장이 있어도 소리 내어 읽지 마십시오.",
      "일기 속 날짜가 오늘과 같아지는 순간 책을 덮고 이름을 잊으십시오."
    ]},
    { id:"hall", title:"무한 복도 통과 수칙", place:"별관 3층", lines:[
      "같은 문을 세 번째 보게 되면 뒤돌아보지 마십시오.",
      "복도 끝에서 ‘똑똑. 거기 있으신가요.' 와 같은 소리가 들리면 소리의 반대 방향으로 걸으십시오.",
      "바닥에 감자칩 봉지가 놓여 있다면 생존자가 가까이 있다는 뜻입니다."
    ]},
    { id:"phone", title:"미등록 통신 응답 수칙", place:"통신실", lines:[
      "03:17에 걸려오는 전화는 받지 마십시오.",
      "받았다면 상대가 먼저 이름을 말할 때까지 침묵하십시오.",
      "상대가 귀차니즘이라고 밝히면 ‘애인은 안전하다’고 두 번만 말하십시오."
    ]},
    { id:"mirror", title:"거울 속 직원 확인 수칙", place:"세면실", lines:[
      "거울 속 직원의 사원증 번호가 역순이면 시선을 내리십시오.",
      "거울 속 직원이 도움을 청해도 손을 내밀지 마십시오.",
      "거울이 먼저 웃으면 조명을 끄고 17 초 동안 숨을 참으십시오."
    ]},
    { id:"rain", title:"비 오는 날 출입 수칙", place:"협회 정문", lines:[
      "비가 오지 않는데 우산이 젖어 있다면 건물에 들어가지 마십시오.",
      "경비원이 방문 목적을 묻지 않고 이름부터 묻는다면 거짓 이름을 대십시오.",
      "빗물에 얼굴이 비치지 않는 사람을 따라가면 세 번째 실종자를 만날 수 있습니다."
    ]},
    { id:"exit", title:"괴이 구역 탈출 수칙", place:"공통", lines:[
      "동시에 세 사람의 목소리가 들리면 가장 늦게 말한 사람을 믿으십시오.",
      "수칙서가 아홉 장 모이기 전에는 출구 표시를 믿지 마십시오.",
      "누군가 남아야 한다는 문구가 나타나면 단말기를 종료하지 말고 다른 선택지를 찾으십시오."
    ]}
  ],

  endings: {
    bad_hogeng: "대체된 조사자",
    bad_elevator: "4층의 신규 직원",
    bad_canteen: "냉장고 속 목소리",
    bad_school: "세 번째 줄",
    true_all: "세 사람의 일기",
    alone: "남겨진 조사자"
  },

  cases: {
    case1: {
      code:"NDA-0317",
      title:"03:17 무한 복도",
      summary:"호갱의 마지막 통신이 끊긴 별관 3 층을 조사한다.",
      start:"s1",
      scenes:{
        s1:{ messages:[
          ["SYSTEM","별관 3층에서 조사원 04의 사원증 신호가 감지됩니다."],
          ["UNKNOWN","지원 부탁드려요요오오오. 넘 배고프고 힘드러여."]
        ], choices:[
          {text:"소리가 난 방향으로 간다", next:"s2", effects:{investigation:2,danger:2}},
          {text:"반대 방향으로 이동한다", next:"s3", effects:{investigation:2,recovery:8}, rule:"hall"},
          {text:"엘리베이터를 확인한다", next:"s4", effects:{investigation:1}, rule:"elevator"},
          {text:"통신으로 호갱의 이름을 부른다", next:"s5", effects:{danger:1,hogeng:1}}
        ]},
        s2:{ messages:[
          ["SYSTEM","복도 끝에서 호갱과 같은 얼굴의 사람이 서 있습니다."],
          ["호갱?","흐아아아앙. 기다렸잖아요."]
        ], choices:[
          {text:"손을 잡는다", wrong:true, end:"손이 지나치게 차갑습니다. 이제 당신의 사원증 이름이 호갱으로 바뀌게 됩니다.", effects:{danger:4}, ending:"bad_hogeng"},
          {text:"사원증 번호를 묻는다", end:"상대는 번호를 대답하지 못하고 사라졌습니다. 진짜 호갱의 음성이 남았습니다.", effects:{investigation:3,recovery:12,hogeng:2}, flag:"진짜 호갱 생존 신호", character:"hogeng", rule:"mirror"},
          {text:"도망친다", wrong:true, end:"처음 위치로 돌아왔습니다.", effects:{danger:1}}
        ]},
        s3:{ messages:[
          ["SYSTEM","소리의 반대편에서 구겨진 일기 한 장을 발견했습니다."],
          ["호갱","제 일기 읽지 마세요. 읽으면 죽을 거임."]
        ], choices:[
          {text:"일기를 읽는다", end:"일기에는 ‘다음 조사자는 나를 이름으로 불러 달라’고 적혀 있습니다.", effects:{investigation:2,recovery:15,hogeng:2}, flag:"호갱의 일기 조각", character:"hogeng", rule:"diary"},
          {text:"읽지 않고 봉인한다", end:"봉인 직후 안쪽에서 두드리는 소리가 멎었습니다.", effects:{recovery:8}},
          {text:"“호갱”이라고 부른다", end:"멀리서 ‘이번에는 찾았네요’라는 목소리가 들렸습니다.", effects:{hogeng:3,danger:1}, flag:"호갱의 응답", character:"hogeng"}
        ]},
        s4:{ messages:[["SYSTEM","엘리베이터 표시층이 4와 04를 번갈아 표시합니다."]], choices:[
          {text:"4층 버튼을 누른다", wrong:true, end:"문이 열리자 복도에 당신의 실종 보고서가 붙어 있었습니다.", effects:{danger:4}, ending:"bad_elevator"},
          {text:"닫힘 버튼을 세 번 누른다", end:"엘리베이터 틈에서 수칙서 한 장이 떨어졌습니다.", effects:{investigation:2,recovery:14}, rule:"elevator"},
          {text:"거울을 가린다", end:"거울 뒤에 호갱의 사원증이 붙어 있었습니다.", effects:{investigation:1,hogeng:1}, flag:"호갱 사원증", character:"hogeng"}
        ]},
        s5:{ messages:[
          ["호갱","...제 이름을 아직 기억하네요."],
          ["SYSTEM","통신 위치가 지하 식당으로 이동했습니다."]
        ], choices:[
          {text:"지하 식당으로 간다", end:"두 사람의 신호가 같은 장소에서 겹칩니다.", effects:{investigation:2,hogeng:2,gamja:1}, flag:"호갱-감자 동시 신호", character:"hogeng", rule:"canteen"},
          {text:"현재 위치를 계속 묻는다", wrong:true, end:"상대는 ‘당신 뒤’라고만 반복했습니다.", effects:{danger:2}},
          {text:"통신을 보관한다", end:"통신 원본을 저장했습니다.", effects:{recovery:10}, archive:"호갱 03:17 통신"}
        ]}
      }
    },

    case2: {
      code:"NDA-B2",
      title:"폐쇄 구내 식당",
      summary:"배고플 게 분명한 감자의 흔적을 추적한다.",
      start:"a1",
      scenes:{
        a1:{ messages:[
          ["SYSTEM","지하 식당 냉장고에서 사람의 체온이 감지됩니다."],
          ["감자","엇, 조사원 님! 배고프면 들어오세요. 음식은 아직 많아요."]
        ], choices:[
          {text:"냉장고를 연다", next:"a2", effects:{investigation:2,danger:1}},
          {text:"식당 방송을 확인한다", next:"a3", effects:{investigation:1}, rule:"canteen"},
          {text:"감자에게 호갱의 위치를 묻는다", next:"a4", effects:{gamja:2}},
          {text:"메뉴판을 확인한다", next:"a5", effects:{investigation:1}}
        ]},
        a2:{ messages:[
          ["SYSTEM","냉장고 안에는 감자 봉지와 사람의 신체 장기들이 유리병에 보관된 채로 있습니다."],
          ["감자","그거 말 걸죠? 대답하면 안 돼용."]
        ], choices:[
          {text:"감자 봉지에 대답한다", wrong:true, end:"봉지 안에서 당신이 그토록 원했던 대답이 들렸습니다.", effects:{danger:4}, ending:"bad_canteen"},
          {text:"말없이 문을 닫는다", end:"문 뒤에 감자가 남긴 수칙서가 붙어 있었습니다.", effects:{investigation:2,recovery:12,gamja:2}, flag:"감자의 생존 메모", character:"gamja", rule:"canteen"},
          {text:"손자국을 따라간다", end:"비상 창고에서 감자의 배낭과 식량을 발견했습니다.", effects:{investigation:3,gamja:1}, flag:"감자의 배낭", character:"gamja"}
        ]},
        a3:{ messages:[
          ["방송","오늘의 직원은 조사원 12입니다."],
          ["감자","메뉴판 보지 마요. 저거 나 아니에요."]
        ], choices:[
          {text:"방송실로 간다", wrong:true, end:"방송실에는 마이크 대신 사람의 손이 놓여 있었습니다.", effects:{danger:2,investigation:2}},
          {text:"식당을 즉시 떠난다", end:"출구 앞에서 감자가 던진 통조림을 발견했습니다.", effects:{recovery:10,gamja:2}, flag:"감자의 통조림", character:"gamja"},
          {text:"“진짜 감자는 어디 있지?”라고 묻는다", end:"누군가 귓가로 아주 빠른 세기로 중얼거립니다. ‘호갱 옆’이라는 단어를 낚았습니다.", effects:{gamja:3,danger:1}, flag:"감자의 위치 단서", character:"gamja"}
        ]},
        a4:{ messages:[
          ["감자","호갱이랑 같이 있었어요. 그런데 복도가 우리를 밀쳤어요."],
          ["감자","식량은 반씩 나누었으니 반드시 살아 있을 거예요."]
        ], choices:[
          {text:"반드시 둘 다 찾겠다고 약속한다", end:"감자는 웃으며 비상 창고 암호를 알려 주었습니다.", effects:{gamja:4,hogeng:1,recovery:10}, flag:"비상창고 1204", character:"gamja"},
          {text:"호갱만 먼저 찾겠다고 한다", wrong:true, end:"감자와의 통신이 끊겼습니다.", effects:{gamja:-2,hogeng:2}},
          {text:"감자에게 현재 식량을 묻는다", end:"남은 식량은 정확히 두 사람분입니다.", effects:{investigation:2,gamja:1}}
        ]},
        a5:{ messages:[["SYSTEM","메뉴판: 오늘의 직원 / 감자 / 귀하"]], choices:[
          {text:"메뉴판을 찢는다", wrong:true, end:"찢어진 조각마다 당신의 이름이 적혀 있습니다. 조식과 중식, 석식으로 당신을 배분하기 위해 곧 그들이 찾아올 것입니다.", effects:{danger:2}},
          {text:"눈을 감고 출구로 간다", end:"발 아래에서 수칙서 한 장을 밟았습니다.", effects:{recovery:9}, rule:"canteen"},
          {text:"감자의 이름을 지운다", wrong:true, end:"식당 안 모든 음식이 썩기 시작했습니다.", effects:{gamja:-3,danger:1}}
        ]}
      }
    },

    case3: {
      code:"NDA-YAHR",
      title:"야르 고등학교 2학년 7반",
      summary:"귀차니즘으로 추정되는 일반인의 통신을 추적한다.",
      start:"b1",
      scenes:{
        b1:{ messages:[
          ["SYSTEM","야르 고등학교 야간 자율학습 방송망에 접속했습니다."],
          ["귀차니즘","댁들이 일기 단체인지 뭔지인지 맞아요? 저 집에 가야 하는데요. 롤 승급전인데, 아."]
        ], choices:[
          {text:"신원을 확인한다", next:"b2", effects:{investigation:2,lazy:1}},
          {text:"애인에 대해 묻는다", next:"b3", effects:{lazy:2}},
          {text:"학교 수칙서를 찾는다", next:"b4", effects:{investigation:2,recovery:8}, rule:"school"},
          {text:"통신을 끊는다", wrong:true, end:"통신은 끊겼지만 휴대 전화에 ‘왜 먼저 끊음?’라는 문자가 도착합니다.", effects:{danger:-1}}
        ]},
        b2:{ messages:[
          ["귀차니즘","2 학년인 건 맞는데 반은 잘 모르겠어요. 교실이 계속 바뀌거든요."],
          ["SYSTEM","상대 위치가 2-7, 2-8, 2-7 순으로 반복됩니다."]
        ], choices:[
          {text:"2학년 7반으로 안내한다", end:"귀차니즘은 교실 문에서 자신의 이름표를 발견했습니다.", effects:{lazy:2,investigation:2}, flag:"귀차니즘 위치 확인", character:"lazy"},
          {text:"복도로 나오라고 한다", wrong:true, end:"복도 방송이 귀차니즘의 이름을 세 번 부르기 시작합니다.", effects:{danger:2}},
          {text:"일단 책상 밑에 숨으라고 한다", end:"방송이 멎고 통신이 안정되었습니다.", effects:{lazy:3,recovery:10}, flag:"귀차니즘 생존 신호", character:"lazy", rule:"school"}
        ]},
        b3:{ messages:[["귀차니즘","애인한테 연락해야 해요. 근데 제 휴대 전화 화면에 제가 아니라 다른 사람이 보여요."]], choices:[
          {text:"휴대 전화 화면을 보지 말라고 한다", end:"귀차니즘은 지시에 따랐고 화면 속 인물이 사라졌습니다.", effects:{lazy:4,recovery:10}, flag:"귀차니즘 신뢰", character:"lazy", rule:"phone"},
          {text:"애인의 이름을 묻는다", wrong:true, end:"통화 너머에서 모르는 사람이 애인의 이름을 먼저 대답했습니다. "마틴."", effects:{danger:2,lazy:-1}},
          {text:"‘애인은 안전하다’고 두 번 말한다", end:"귀차니즘이 안도했고 통신실 위치를 전송했습니다.", effects:{lazy:3,investigation:2}, flag:"통신실 좌표", character:"lazy", rule:"phone"}
        ]},
        b4:{ messages:[
          ["SYSTEM","교탁 아래에서 찢어진 수칙서가 발견됩니다."],
          ["UNKNOWN","세 번째 줄은 읽지 마."]
        ], choices:[
          {text:"세 번째 줄까지 읽는다", wrong:true, end:"세 번째 줄에는 당신의 현재 행동이 적혀 있었습니다.", effects:{danger:3}, ending:"bad_school"},
          {text:"두 번째 줄까지만 읽는다", end:"수칙서 복원에 성공했습니다.", effects:{recovery:15,investigation:2}, rule:"school"},
          {text:"수칙서를 귀차니즘에게 읽어준다", end:"귀차니즘은 ‘그 목소리, 교내에서 들은 목소리가 아니에요’라고 답했습니다.", effects:{lazy:3,danger:1}, flag:"교내 방송 정체", character:"lazy"}
        ]}
      }
    }
  }
};
