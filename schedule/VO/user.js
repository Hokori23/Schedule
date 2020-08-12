class user {
    constructor(id, name, createdTime, activatedTime, power) {
        this.id = id; /* @String */
        this.name = name; /* @String */
        this.createdTime = createdTime; /* @String */
        this.activatedTime = activatedTime; /* @String */
        this.power = power /* @Number */
    }

    //解构
    destruct() {
        let { id, name, createdTime, activatedTime, power } = this;
        let res = [id, name, createdTime, activatedTime, power];

        //取出空元素
        for (let i = 0; i < res.length; i++) {
            if (res[i] === undefined || res[i] === '') {
                res.splice(i, 1);
                i--;
            }
        }
        return res;
    }
}

class userRegister extends user {
    constructor(id, name, password, createdTime, activatedTime, power) {
        super(id, name, createdTime, activatedTime, power);
        this.password = password
    }

    //解构
    destruct() {
        let { id, name, password, createdTime, activatedTime, power } = this;
        let res = [id, name, password, createdTime, activatedTime, power];

        //取出空元素
        for (let i = 0; i < res.length; i++) {
            if (res[i] === undefined || res[i] === '') {
                res.splice(i, 1);
                i--;
            }
        }
        return res;
    }
}

class userLogin extends userRegister {
    constructor(id, password, activatedTime) {
        super(id, '', password, '', activatedTime, 0);
    }
}

class userEdit extends user {
    constructor(id, name, activatedTime) {
        super(id, name, '', activatedTime, 0);
    }

    //解构
    destruct() {
        let { id, name, activatedTime } = this;
        let res = [name, activatedTime, id];

        //取出空元素
        for (let i = 0; i < res.length; i++) {
            if (res[i] === undefined || res[i] === '') {
                res.splice(i, 1);
                i--;
            }
        }
        return res;
    }
}

module.exports = { user, userRegister, userLogin, userEdit }