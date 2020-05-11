class assignment {
    constructor(name, info, deadLine, lastModified, author) {
        this.name = name; /* @String */
        this.info = info; /* @String */
        this.deadLine = deadLine; /* @String TimeStamp*/
        this.lastModified = lastModified; /* @String TimeStamp*/
        this.author = author; /* @String */
    }

    //解构
    destruct() {
        let { name, info, deadLine, lastModified, author } = this;
        let res = [name, info, deadLine, lastModified, author];

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

class assignmentDelete {
    constructor(name, deadLine) {
        this.name = name;
        this.deadLine = deadLine;
    }

    //解构
    destruct() {
        let { name, deadLine } = this;
        let res = [name, deadLine];

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
class assignmentEdit extends assignment {
    constructor(name, info, deadLine, lastModified, author) {
        super(name, info, deadLine, lastModified, author)
    }

    //解构
    destruct() {
        let { name, info, deadLine, lastModified, author } = this;
        let res = [info, lastModified, author, deadLine, name];

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
module.exports = { assignment, assignmentDelete, assignmentEdit }