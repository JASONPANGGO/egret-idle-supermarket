/**
 * 常量配置表 (框架层)
 * @file {G_Const.ts}
 * @description 框架层常量配置放这里，一般改动不大，只做拓展多。
 * @description {config.js} 业务层常量配置放 config.js，方便：经常改动、开发时调整配置 (打包时直接替换文件即可)。
 */
var gConst;
(function (gConst) {
    /** 指派事件类型 */
    gConst.eventType = {
        /** 流程事件 */
        GAME_READY: "gameReady",
        GAME_START: "gameStart",
        GAME_RETRY: "gameRetry",
        GAME_END: "gameEnd",
        GAME_CLOSE: "gameClose",
        INSTALL: "install",
        /** 通用事件 */
        RESIZE_VIEW: "resizeView",
        ROTATE_VIEW: "rotateView",
        GUIDE_TOUCH_ONE: "guideTouchOne",
        GUIDE_STOP: "guideStop",
        IN_COMPLETE: "inComplete",
        IN_LOOP_COMPLETE: "inLoopComplete",
        OUT_COMPLETE: "outComplete",
        OUT_LOOP_COMPLETE: "outLoopComplete",
        CHOOSE_COMPLETE: "chooseComplete",
        CHOOSE_LOOP_COMPLETE: "chooseLoopComplete",
        ONE_STEP_COMPLETE: "oneStepComplete",
        ONE_STEP_FAIL: "oneStepFail",
        ONCE_COMPLETE: "onceComplete",
        ONCE_FAIL: "onceFail",
        ALL_COMPLETE: "allComplete",
        ALL_FAIL: "allFail",
        USE_UP: "useUp",
        TOUCH_TAP: "touchTap",
        TOUCH_BEGIN: "touchBegin",
        TOUCH_MOVE: "touchMove",
        TOUCH_END: "touchEnd",
        RIGHT_ANSWER: "rightAnswer",
        SHOW_GUIDE: "showGuide",
        HIDE_GUIDE: "hideGuide",
        /** UI事件 */
        OPEN_TRAN: "openTran",
        CLOSE_TRAN: "closeTran",
        OPEN_END: "openEnd",
        CLOSE_END: "closeEnd",
        OPEN_PEOPLE: "openPeople",
        CLOSE_PEOPLE: "closePeople",
        /** 游戏场景事件 */
        SHOW_BLACK: "showBlack",
        HIDE_BLACK: "hideBlack",
        SHOW_SCENE0: "showScene0",
        HIDE_SCENE0: "hideScene0",
        SHOW_SCENE1: "showScene1",
        HIDE_SCENE1: "hideScene1",
        SHOW_SCENE2: "showScene2",
        HIDE_SCENE2: "hideScene2",
        /** 对象事件 */
        CLOSE: "close",
        REMOVE_OBJ: "removeObj",
        CLICK_OBJ: "clickObj",
        /** 业务事件 */
        SHOW_CURTAIN_FULL: "showCurtainFull",
        SHOW_CAR_START: "showCarStart",
        FEED_COMPLETE: "feedComplete",
        BAR_COVER_IN_GIRL: "barCoverInGirl",
        SHOW_ITEMS: "showItems",
        ADD_PATTERN: "addPattern",
        UPDATE_GOLD: "updateGold",
        LV_TO_MAX: "lvToMax",
        START_PARTILCLE: "startPartilcle",
        START_PLAY_KEY: "startPlayKey",
        MOVE_KEY: "moveKey",
    };
    /** 方位 */
    gConst.direction = {
        CENTER_CENTER: "centerCenter",
        LEFT_TOP: "leftTop",
        CENTER_TOP: "centerTop",
        RIGHT_TOP: "rightTop",
        RIGHT_CENTER: "rightCenter",
        RIGHT_BOTTOM: "rightBottom",
        CENTER_BOTTOM: "centerBottom",
        LEFT_BOTTOM: "leftBottom",
        LEFT_CENTER: "leftCenter",
    };
    /** 设备类型对应整体缩放倍数 */
    gConst.mobileByScale = (_a = {},
        //竖屏
        _a[1 /* VERTICAL */] = (_b = {},
            _b[1 /* IPHONE_X */] = 1,
            _b[2 /* IPHONE_8 */] = 1,
            _b[3 /* IPAD */] = 0.8,
            _b),
        //横屏
        _a[0 /* HORIZONTAL */] = (_c = {},
            _c[1 /* IPHONE_X */] = 1,
            _c[2 /* IPHONE_8 */] = 1,
            _c[3 /* IPAD */] = 0.8,
            _c),
        _a);
    /** 选项ID对应名字（如：龙骨） */
    gConst.itemIdByName = {
        "1": "pork",
        "2": "fish",
        "3": "fruit",
        "4": "bakery",
        "5": "clothing",
    };
    /** 单元格皮肤 */
    gConst.cellSkin = (_d = {},
        _d[1 /* RED */] = "Red",
        _d[2 /* YELLOW */] = "Yellow",
        _d[3 /* GREEN */] = "Green",
        _d[4 /* BLUE */] = "Blue",
        _d);
    /** 单元格名称 */
    gConst.cellName = (_e = {},
        _e[1 /* RED */] = "red",
        _e[2 /* YELLOW */] = "yellow",
        _e[3 /* GREEN */] = "green",
        _e[4 /* BLUE */] = "blue",
        _e);
    /** 单元格颜色 */
    gConst.cellColor = (_f = {},
        _f[1 /* RED */] = 0xFF505C,
        _f[2 /* YELLOW */] = 0xFFCE64,
        _f[3 /* GREEN */] = 0x63CE81,
        _f[4 /* BLUE */] = 0x6E8CBD,
        _f);
    /** 人物表情动作名 */
    gConst.peopleFaceName = (_g = {},
        _g[11 /* SMILE */] = "smile",
        _g[12 /* HAPPY */] = "happy",
        _g[13 /* SLEEPY */] = "sleepy",
        _g[14 /* ANGRY */] = "angry",
        _g);
    /** 状态名称 */
    gConst.stateName = (_h = {},
        _h[0 /* IDLE */] = "idle",
        _h[1 /* DROP_DOWN */] = "dropDown",
        _h[2 /* WALK */] = "walk",
        _h[3 /* STAND */] = "stand",
        _h[4 /* DIE */] = "die",
        _h[5 /* SHOT */] = "shot",
        _h);
    /** 选项ID对应类型 */
    gConst.itemIdByType = (_j = {},
        _j[0 /* WHOLE */] = "start",
        _j[1 /* BRACELET */] = "a",
        _j[2 /* COLLAR */] = "b",
        _j[3 /* EYE */] = "c",
        _j[4 /* FULL */] = "end",
        _j);
    gConst.boardItems = [
        {
            id: 1,
            name: 'pork'
        },
        {
            id: 2,
            name: 'fish'
        },
        {
            id: 3,
            name: 'fruit'
        },
        {
            id: 4,
            name: 'bakery'
        },
        {
            id: 5,
            name: 'clothing'
        }
    ];
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
})(gConst || (gConst = {}));
//# sourceMappingURL=G_Const.js.map