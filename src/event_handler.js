const mailSender = require('./mail_sender')

module.exports = {
    async eventHandle (notes) {
        mailSender.sendEmail(notes)
    },
}