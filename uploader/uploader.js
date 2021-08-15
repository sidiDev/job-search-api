const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploader = (data) => {

    return new Promise((resolve, reject) => {

        cloudinary.uploader.upload(data, {
            public_id: `${Date.now()}`, 
            resource_type: "auto" 
        }).then(res => resolve(res))
          .catch(err => reject(err))

    })
}

module.exports = uploader