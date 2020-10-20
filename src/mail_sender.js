const nodemailer = require('nodemailer');

module.exports = {
    async sendEmail(notesMessage) {

        const transporter = nodemailer.createTransport({
            service: 'gmail', //just put here the e-mail service configuration
            auth: {
              user: 'youremail@domain.com',
              pass: 'yourpassword'
            }
          });
          
        const mailOptions = {
            from: 'youremail@domain.com',
            to: notesMessage.owner,
            subject: 'This is yours Take Your Notes list',
            html: await this.generateHtml(notesMessage.notes)
        }
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    },

    async generateHtml(notes) {

        console.log(notes)

        let html = '<html><head></head><body><h2>Take Your Notes</h2></br></br>'

        for(n in notes) {
            console.log(notes[n])
            html += `<p><b>Title:</b> ${notes[n].title}</p></br>`
            html += `<p><b>Description:</b> ${notes[n].description}</p></br>`
        }

        html += '</body></html>'

        return html
    }
}