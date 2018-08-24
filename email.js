const nodemail = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const html = `
<style>
		table { width: 100%;  border-spacing: 0; border-bottom: 1px solid #000; border-left: 1px solid #000;}
		table td{ border-right: 1px solid #000; border-top: 1px solid #000; font-size: 16px;}
		p{ text-indent: 2em; font-size: .5em; font-size: 18px;}
	</style>
	<h1 align="center">缴款通知函</h1>

	<p>致【填写对方公司名称】：</p>

	<p>感谢贵司使用我公司大数据分析服务，根据贵司与我公司签订的《填写具体协议名称》的约定，我公司特通知贵司：贵司预充值费用即将使用完毕，如需继续使用服务，建议贵司尽快充值，以免影响业务。</p>

	<p>截至   年  月  日，可用余额为人民币          元。若由于时间差等原因，您在收到本函之前已经完成充值，请忽略本函。</p>

	<p>如有疑问，可联系我公司商务经理：XXX，联系方式：</p>

	<p>我公司收款账户信息如下：</p>

	<table cellspacing="0" cellpadding="8">
		<tr>
			<td align="center" rowspan="3">银行账号</td>
			<td>账户名称</td>
			<td>浙江孚临科技有限公司</td>
		</tr>
		<tr>
			<td>开户银行</td>
			<td>中国工商银行股份有限公司杭州科创支行</td>
		</tr>
		<tr>
			<td>银行账号</td>
			<td>1202220909900133046</td>
		</tr>
	</table>
	<p>(贵司汇款后请务必将汇款单通过电子邮件等方式告知我公司商务经理，以便我公司确认到账后为贵司开具发票) </p>
	<p>特此通知</p>
	<p align="right">浙江孚临科技有限公司</p>
	<p align="right">年 月 日</p>
`
const smt = nodemail.createTransport(smtpTransport({
  host: "smtp.qq.com", // 主机
  port: 465,
  secure: true,
  auth: {
    user: '604389771',
    pass: 'kuvvgyxnrclwbcge'
  }
}));

smt.verify((err, sucess) => {
  if (err) {
    console.log(err)
  } else {
    console.log('OK')
  }
})
// tfhbibtpwyqybddc
// aznqaqunahfvbcjj

const sendMail =  (to, subject, content) => {
  smt.sendMail({
    from: '604389771@qq.com',
    to: to,
    subject: subject,
    html: html
  }, (err, response) => {
    if (err) {
      console.log(err)
    } else {
      console.log('发送成功')
    }
  })
}

sendMail('ccnj333@sina.com', '测试邮件主题', 'Hello')