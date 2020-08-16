const CONFIG = require('../ecosystem.config')
const { isUndef, isDef } = require('../func')
const SERVICE = require('../SERVICE/userService')
const VO = require('../VO/user')

const listen = (APP) => {
  const path = `${CONFIG.apps[0].baseUrl}/user`

  //注册--用户
  APP.post(path, async (req, res) => {
    let { id, name, password } = req.body

    if (isUndef(id) || isUndef(name) || isUndef(password)) {
      console.log('clear Authorization in Register')
      res.set('Authorization', 0)
      res.status(400).json({
        errcode: 1,
        msg: '参数错误, {id, name, password}'
      })
      return
    }

    //0:游客权限，1:可修改作业，2:可修改科目
    let result = await SERVICE.register(
      new VO.userRegister(id, name, password, req.reqTime, req.reqTime, 1)
    )

    res.status(200).json(result)
  })

  //登录或查找--用户
  //有密码则登录，无密码则查找，若都无则遍历
  APP.get(path, async (req, res) => {
    let { id, password } = req.query
    let result = null
    if (isDef(password)) {
      result = await SERVICE.login(new VO.userLogin(id, password, req.reqTime))
      if (result.errcode !== 10002) {
        console.log('clear Authorization in Login')
        res.set('Authorization', 0)
      }
    } else {
      if (isDef(id)) {
        result = await SERVICE.queryNoPassWord(id)
      } else {
        result = await SERVICE.queryAll()
      }
    }

    res.status(200).json(result)
  })

  //注销--用户
  //需要id和[password]
  APP.delete(path, async (req, res) => {
    let { id, password } = req.query

    if (isUndef(id)) {
      res.status(400).json({
        errcode: 1,
        msg: '参数错误, {id, [password]}'
      })
      return
    }

    let result = await SERVICE.remove(
      new VO.userLogin(id, password, req.reqTime),
      req.user_id
    )
    if (isDef(result)) {
      res.status(200).json(result)
    } else {
      res.status(403).end()
    }
  })

  //修改昵称--用户
  APP.put(path, async (req, res) => {
    let { id, name } = req.body
    if (isUndef(id) || isUndef(name)) {
      res.status(400).json({
        errcode: 1,
        msg: '参数错误, {id, name}'
      })
      return
    }

    if (id !== req.user_id) {
      res.status(403).end()
    } else {
      let result = await SERVICE.edit(new VO.userEdit(id, name, req.reqTime))
      res.status(200).json(result)
    }
  })
}

module.exports = listen
