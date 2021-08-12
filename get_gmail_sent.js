function getSentMail() {
  const THREADS = GmailApp.search('in:sent',0,100);

  THREADS.forEach((thread) => {
    let mails = thread.getMessages();

    mails.forEach((mail) => {
      let mail_date = mail.getDate();
      let mail_subject = mail.getSubject();
      let mail_plainBody = mail.getPlainBody();

      // get sheet
      const sheet = SpreadsheetApp.getActiveSheet();
      const lastRow = sheet.getLastRow() + 1;

      // set value
      sheet.getRange(lastRow, 1).setValue(mail_date);
      sheet.getRange(lastRow, 2).setValue(mail_subject);
      sheet.getRange(lastRow, 3).setValue(mail_plainBody);
    });

  });
}
