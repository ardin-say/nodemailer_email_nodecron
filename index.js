/* SmtpJS.com - v3.0.0 */
var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };


const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const config = require('./config.js')
const OAuth2 = google.auth.OAuth2
const cron = require('node-cron');

cron.schedule('* * * * * *', () => {

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret)
OAuth2_client.setCredentials( { refresh_token : config.refreshToken } )

function send_mail(name, recipient) {
    const accessToken = OAuth2_client.getAccessToken()

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: config.user,
            clientId: config.clientId,
            clientSecret: config.clientSecret,
            refreshToken: config.refreshToken,
            accessToken: accessToken
        }
    })

    const mail_options = {
        from: `THE G.O.A.T <${config.user}>`,
        to: recipient,
        subject: 'A Message From The G.O.A.T',
        html: get_html_message(name)
    }


    transport.sendMail(mail_options, function(error, result) {
        if (error) {
            console.log('Error: ', error)
        } else {
            console.log('Success: ', result)
        }
        transport.close()
    })
}

function get_html_message(name) {
    return `
        <h3> ${name}! You're Awesome. </h3>
    `
}

send_mail('sayeed anwar 9.16', 'sayeedanwar2061@gmail.com')

});