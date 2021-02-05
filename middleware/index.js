module.exports = {
	sendMessage: function(req, res, next) {
		var transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			secureConnection: true,
			port: 465,
			service: "gmail",
			auth: {
				user: process.env.NODEMAILER_ADDRESS,
				pass: process.env.NODEMAILER_PASSKEY
			}
		})
		var messageText = 'New contact messsage from <b>'+req.body.contact.name+"</b> ( "+req.body.contact.email+"): "+req.body.contact.message
		var mailOptions = {
			from: process.env.NODEMAILER_ADDRESS,
			to: process.env.NODEMAILER_ADDRESS,
			subject: "SolivagusPhoto - " + req.body.contact.subject,
		//text: req.body.contact.message,
		html: messageText
	}
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			req.flash("error","There was a problem sending your message.  Please try again later.");
			res.redirect("/contact");
		} else {
			req.flash("success","Thank you for your message.");
			res.redirect("/contact");
		}
	})
	
},

isAdmin: function(req, res, next) {

}
}