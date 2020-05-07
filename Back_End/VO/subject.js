class subject {
    constructor(name, type) {
        this.name = name; /* @String */
        this.type = type; /* @Number */
    }

    //解构
    destruct() {
        let { name, type } = this;
        let res = [name, type];

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
module.exports = subject