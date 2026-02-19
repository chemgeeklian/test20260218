import { Scene } from './types';

// The game script data structure
export const SCENES: Record<string, Scene> = {
  start: {
    id: 'start',
    type: 'story',
    lines: [
      "你在大街上举白纸，结果被巡逻的晶哥抓住了！",
      "情急之下，你大吼："
    ],
    options: [
      { label: "我是习近平的初中同学！", nextId: 'middle_school' },
      { label: "我是习近平的高中同学！", nextId: 'high_school' }
    ]
  },
  high_school: {
    id: 'high_school',
    type: 'gameover',
    lines: [
      "（我是习近平的高中同学！）",
      "没想到晶哥一听哈哈大笑：小笔崽子傻了吧，习近平根本没有高中同学！",
      "你被晶哥带走了。"
    ]
  },
  middle_school: {
    id: 'middle_school',
    type: 'story',
    lines: [
      "（我是习近平的初中同学！）",
      "晶哥一听，惊掉了下巴：您真是习总书记的同学？",
      "“当然！不信你把我突进沼气池里。”",
      "晶哥：不行不行，最近假货太多了，我要测试一下！",
      "晶哥：既然你是他的初中同学，那你一定去过梁家河罢！",
      "晶哥：那我问你，下面哪本书不在梁家河大图书馆里？"
    ],
    options: [
      { label: "《三国演义》", nextId: 'book_fail' },
      { label: "《飞鸟集》", nextId: 'book_fail' },
      { label: "《习近平谈治国理政》", nextId: 'book_success' }
    ]
  },
  book_fail: {
    id: 'book_fail',
    type: 'gameover',
    lines: [
      "晶哥一听大怒：你身为总书记的同学，连他的书单都没读过？！",
      "晶哥气愤地把你拷走了。"
    ]
  },
  book_success: {
    id: 'book_success',
    type: 'story',
    lines: [
      "（《习近平谈治国理政》）",
      "晶哥：你说得对！《习近平谈治国理政》是总书记离开梁家河后总结的先进经验，所以不在梁家河图书馆里。",
      "你松了一口气，没想到晶哥又说：",
      "“为了确定你真的不是假冒的，我要亲自带你到梁家河测试一下！”",
      "你倒吸了一口凉气。",
      "晶哥带你去了梁家河，你们来到一处圆顶形的装置前。",
      "晶哥指着圆顶形的装置问你：“这是什么？”"
    ],
    options: [
      { label: "两弹一星", nextId: 'two_bombs_victory' },
      { label: "沼气池", nextId: 'septic_tank' }
    ]
  },
  two_bombs_victory: {
    id: 'two_bombs_victory',
    type: 'victory',
    lines: [
      "（两弹一星）",
      "晶哥一听就不高兴了：“如果两弹一星在梁家河搞，习主席坐过的马桶就被冷凝水汽突飞了！”",
      "眼看晶哥又要拷你，你连忙灵机一动：",
      "“冤枉啊！我和习主席一样，只有小学学历，不知道冷凝水是什么！”",
      "“和……习主席一样，只……只有小学学历？”",
      "晶哥瞠目结舌，显然被你问住了。",
      "哑口无言的晶哥无法反驳，只能放走你了。"
    ]
  },
  septic_tank: {
    id: 'septic_tank',
    type: 'story',
    lines: [
      "（沼气池）",
      "晶哥：答对了！现在沼气池堵了，你打算怎么办？"
    ],
    options: [
      { label: "突开沼气池就跑", nextId: 'run_away' },
      { label: "仔细调查沼气池堵了的原因", nextId: 'investigate_fail' }
    ]
  },
  investigate_fail: {
    id: 'investigate_fail',
    type: 'gameover',
    lines: [
      "（仔细调查沼气池堵了的原因）",
      "你运用在大学学到的工业工程知识，仔细调查了89.64秒，",
      "没想到这时，沼气池突然爆炸了！！！",
      "你被沼气炸上了天，光荣牺牲。",
      "天堂里，长者对你蛤蛤大笑：Naive！连习近平都不如，做人不能太书呆子啊！"
    ]
  },
  run_away: {
    id: 'run_away',
    type: 'story',
    lines: [
      "（突开沼气池就跑）",
      "沼气池堵了，形式十分严峻，必须赶紧突开！",
      "你拿了根铁棍子，突开沼气池就跑。",
      "幸好你跑得快！避免了满脸喷粪的下场。",
      "晶哥：没想到你居然跑得这么快！",
      "“当然！我跟习主席一样，身体可好了，每天游泳十公里！”",
      "晶哥：哦？那你能扛两百斤麦子走十里山路不换肩吗？",
      "“能！当然能！”",
      "晶哥：那我测试你一下。不过这里没有麦子了，你要选择扛——"
    ],
    options: [
      { label: "两箱铁柱", nextId: 'iron_fail' },
      { label: "两箱棉花", nextId: 'cotton_victory' }
    ]
  },
  iron_fail: {
    id: 'iron_fail',
    type: 'gameover',
    lines: [
      "（两箱铁柱）",
      "你当然做不到扛两箱铁柱走十里山路不换肩，走了一半就气喘吁吁露馅了。",
      "晶哥：果然你小子在吹牛皮",
      "你被晶哥拷走了。"
    ]
  },
  cotton_victory: {
    id: 'cotton_victory',
    type: 'victory',
    lines: [
      "（两箱棉花）",
      "聪明的你成功扛两箱棉花走十里山路不换肩！",
      "一套操作下来，晶哥被你搞得心服口服，只能放你走了。"
    ]
  }
};