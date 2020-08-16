const CONFIG = require('../ecosystem.config')
const { isUndef, isDef } = require('../func')
const SERVICE = require('../SERVICE/subjectService')
const VO = require('../VO/subject')

const listen = (APP) => {
  const path = `${CONFIG.apps[0].baseUrl}/subject`

  //添加--科目
  APP.post(path, async (req, res) => {
    if (!req.get('Authorization')) {
      res.status(401).end()
      return
    }

    let { name, type } = req.body

    if (isUndef(name) || isUndef(type)) {
      res.status(400).json({
        errcode: 1,
        msg: '参数错误, {name, type}'
      })
      return
    }

    let user = {
      activatedTime: req.reqTime,
      id: req.user_id
    }

    let result = await SERVICE.add(user, new VO(name, type))
    if (isDef(result)) {
      res.status(200).json(result)
    } else {
      res.status(403).end()
    }
  })

  //删除--科目
  APP.delete(path, async (req, res) => {
    if (!req.get('Authorization')) {
      res.status(401).end()
      return
    }

    let { name } = req.query

    if (isUndef(name)) {
      res.status(400).json({
        errcode: 1,
        msg: '参数错误, {name}'
      })
      return
    }

    let user = {
      activatedTime: req.reqTime,
      id: req.user_id
    }

    let result = await SERVICE.remove(user, name)
    if (isDef(result)) {
      res.status(200).json(result)
    } else {
      res.status(403).end()
    }
  })

  //查询--科目
  //有科目名则查找，无则遍历
  APP.get(path, async (req, res) => {
    let { name } = req.query
    let result = null
    let user = {
      activatedTime: req.reqTime,
      id: req.user_id
    }
    if (isDef(name)) {
      result = await SERVICE.query(user, name)
    } else {
      result = await SERVICE.queryAll(user)
    }
    res.status(200).json(result)
  })

  //编辑--科目
  APP.put(path, async (req, res) => {
    if (!req.get('Authorization')) {
      res.status(401).end()
      return
    }

    let { name, type, oldname } = req.body

    if (isUndef(name) || isUndef(type) || isUndef(oldname)) {
      res.status(400).json({
        errcode: 1,
        msg: '参数错误, {name, type, oldname}'
      })
      return
    }

    let user = {
      activatedTime: req.reqTime,
      id: req.user_id
    }
    let result = await SERVICE.edit(user, new VO(name, type), oldname)
    if (isDef(result)) {
      res.status(200).json(result)
    } else {
      res.status(403).end()
    }
  })
}

module.exports = listen
