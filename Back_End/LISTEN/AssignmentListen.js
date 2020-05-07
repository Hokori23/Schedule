const SERVICE = require("../SERVICE/assignmentService");
const VO = require("../VO/assignment");

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
     * [name,deadLine]查询某个科目在deadLine前的所有作业
     * [deadLine]查询全部科目在deadLine前的所有作业
     * [name]查询某个科目的所有作业
     * [null]查询所有科目的所有作业
     */
    APP.get(path, async(req, res) => {
        let { name, deadLine } = req.query;
        let result = null;
        let user = {
            activatedTime: req.reqTime,
            id: req.user_id,
        };
        if (name && deadLine) {
            result = await SERVICE.queryNameBeforeDeadLine(name, deadLine);
        } else if (deadLine) {
            result = await SERVICE.queryBeforeDeadLine(deadLine);
        } else if (name) {
            result = await SERVICE.query(user, name);
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