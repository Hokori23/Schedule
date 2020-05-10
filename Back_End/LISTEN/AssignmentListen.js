const SERVICE = require("../SERVICE/assignmentService");
const VO = require("../VO/assignment");
const proofXSS = (info) => {
    return info.replace(/[<>&"']/g, function(c) {
        return {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#039",
        }[c];
    });
};

const timeStampFloor = (timeStamp) => {
    let time = null;
    if (timeStamp) {
        time = new Date(timeStamp);
    } else {
        time = new Date();
    }
    let floorTime = new Date(time.getFullYear(), time.getMonth(), time.getDate());
    return floorTime.getTime();
};
const listen = (APP) => {
    const path = "/schedule/assignment";

    //添加--作业
    APP.post(path, async(req, res) => {
        let { name, info, deadLine } = req.body;

        if (!name || !info || !deadLine) {
            res.status(400).json({
                errcode: 1,
                msg: "参数错误, {name, info, deadLine}",
            });
            return;
        }
        if (!req.user_id) {
            res.status(401).end()
            return;
        }
        name = proofXSS(name);
        info = proofXSS(info);

        let user = {
            activatedTime: req.reqTime,
            id: req.user_id,
        };
        let result = await SERVICE.add(
            user,
            new VO.assignment(name, info, deadLine, req.reqTime, req.user_name)
        );
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(403).end();
        }
    });

    //删除--作业
    APP.delete(path, async(req, res) => {
        let { name, deadLine } = req.query;

        if (!name || !deadLine) {
            res.status(400).json({
                errcode: 1,
                msg: "参数错误, {name, deadLine}",
            });
            return;
        }

        let user = {
            activatedTime: req.reqTime,
            id: req.user_id,
        };
        let result = await SERVICE.remove(
            user,
            new VO.assignmentDelete(name, deadLine)
        );
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(403).end();
        }
    });

    //编辑--作业
    APP.put(path, async(req, res) => {
        let { name, info, deadLine } = req.body;

        deadLine = timeStampFloor(Number(deadLine));
        name = proofXSS(name);
        info = proofXSS(info);
        if (!name || !info || !deadLine) {
            res.status(400).json({
                errcode: 1,
                msg: "参数错误, {name, info, deadLine}",
            });
            return;
        }

        let user = {
            activatedTime: req.reqTime,
            id: req.user_id,
        };
        let result = await SERVICE.edit(
            user,
            new VO.assignmentEdit(name, info, deadLine, req.reqTime, req.user_name)
        );
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(403).end();
        }
    });

    //查询作业
    /*
     * [name,startLine,deadLine]查询在某个科目period的所有作业
     * [name,startLine]查询某个科目在startLine后的所有作业
     * [name,deadLine]查询某个科目在deadLine前的所有作业
     * [name]查询某个科目的所有作业
     * [startLine,deadLine]查询全部科目在period的所有作业
     * [startLine]查询全部科目在startLine后的所有作业
     * [deadLine]查询全部科目在deadLine前的所有作业
     * [null]查询所有科目的所有作业
     */
    APP.get(path, async(req, res) => {
        let { name, startLine, deadLine } = req.query;
        let result = null;
        let user = {
            activatedTime: req.reqTime,
            id: req.user_id,
        };
        if (startLine) {
            startLine = timeStampFloor(Number(startLine));
            startLine--;
        }
        if (deadLine) {
            deadLine = timeStampFloor(Number(deadLine));
            deadLine++;
        }
        //Check params
        if (name && startLine && deadLine) {
            result = await SERVICE.queryNameInPeriod(user, name, startLine, deadLine);
        } else if (name && deadLine) {
            result = await SERVICE.queryNameBeforeDeadLine(user, name, deadLine);
        } else if (name && startLine) {
            result = await SERVICE.queryNameAfterStartLine(user, name, startLine);
        } else if (name) {
            result = await SERVICE.query(user, name);
        } else if (startLine && deadLine) {
            result = await SERVICE.queryInPeriod(user, startLine, deadLine);
        } else if (startLine) {
            result = await SERVICE.queryAfterStartLine(user, startLine);
        } else if (deadLine) {
            result = await SERVICE.queryBeforeDeadLine(user, deadLine);
        } else {
            result = await SERVICE.queryAll(user);
        }
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(403).end();
        }
    });
};
module.exports = listen;