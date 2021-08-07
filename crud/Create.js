module.exports = class Create {
    constructor(module, data) {
        this.module = module
        this.data = data
    }

    save() {
        const newModule = new this.module(this.data)
        return new Promise((resolve, reject) => {
            newModule.save((err, doc) => {
                if (err) reject(new TypeError(err))
                else resolve({success: true, doc})
            })
        })
    }
}