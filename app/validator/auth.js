const Joi = require('joi') 
const schema = {
    authPOST: Joi.object().keys({ 
        email: Joi.string().required().error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case 'any.empty':
                case 'any.required':
                  err.message = 'กรุณากรอกชื่ออีเมล'
                  break
                default:
                  break
              }
            })
            return errors
          }),
        password: Joi.string().required().error(errors => {
            errors.forEach(err => {
              switch (err.type) {
                case 'any.empty':
                case 'any.required':
                  err.message = 'กรุณากรอกรหัสผ่าน'
                  break
                default:
                  break
              }
            })
        }),
        name: Joi.string().required().error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case 'any.empty':
              case 'any.required':
                err.message = 'กรุณากรอกชื่อและนามสกุล'
                break
              default:
                break
            }
          })
          return errors
        }),
        mobile_number: Joi.string().required().error(errors => {
          errors.forEach(err => {
            switch (err.type) {
              case 'any.empty':
              case 'any.required':
                err.message = 'กรุณากรอกเบอร์โทรศัพท์'
                break
              default:
                break
            }
          })
          return errors
        }),
      }) 
}
module.exports = schema