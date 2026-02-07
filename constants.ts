import { Word } from './types';

export const MAX_HEALTH = 3;
export const POINTS_CHOICE = 15;
export const POINTS_SPELL = 25;
export const POINTS_LEVEL_COMPLETE = 50;
export const POINTS_GAME_COMPLETE = 200;

export const VOCABULARY_LEVELS: Word[][] = [
    // Level 1 - Basic
    [
        { english: "basic", chinese: "基本的；基础", fake: "篮球；足球" },
        { english: "balance", chinese: "平衡；均衡", fake: "银行；金融" },
        { english: "business", chinese: "商业；生意", fake: "忙碌；繁忙" }
    ],
    // Level 2 - Daily
    [
        { english: "appear", chinese: "出现；显得", fake: "苹果；梨子" },
        { english: "avoid", chinese: "避免；避开", fake: "声音；噪音" },
        { english: "breathe", chinese: "呼吸", fake: "打破；打碎" }
    ],
    // Level 3 - Descriptive
    [
        { english: "broad", chinese: "宽阔的；广泛的", fake: "广播；播放" },
        { english: "ancient", chinese: "古代的；古老的", fake: "祖先；前辈" },
        { english: "average", chinese: "平均；普通的", fake: "奖励；奖品" }
    ],
    // Level 4 - Action
    [
        { english: "achieve", chinese: "实现；达到", fake: "到达；抵达" },
        { english: "attack", chinese: "攻击；袭击", fake: "吸引；诱惑" },
        { english: "attract", chinese: "吸引；引起", fake: "攻击；进攻" }
    ],
    // Level 5 - Abstract
    [
        { english: "advantage", chinese: "优点；好处", fake: "冒险；探险" },
        { english: "amount", chinese: "数量；总额", fake: "安装；设置" },
        { english: "against", chinese: "反对；违反", fake: "年龄；年纪" }
    ],
    // Level 6 - Behavioral
    [
        { english: "arrange", chinese: "安排；整理", fake: "争论；辩论" },
        { english: "behave", chinese: "表现；行为", fake: "相信；认为" },
        { english: "challenge", chinese: "挑战；质疑", fake: "改变；变化" }
    ],
    // Level 7 - Character
    [
        { english: "character", chinese: "性格；角色", fake: "特征；特点" },
        { english: "circumstance", chinese: "情况；环境", fake: "循环；周期" }
    ],
    // Level 8 - Comprehensive
    [
        { english: "achieve", chinese: "实现；达到", fake: "完成；结束" },
        { english: "character", chinese: "性格；角色", fake: "人物；角色" },
        { english: "circumstance", chinese: "情况；环境", fake: "环境；周围" }
    ]
];