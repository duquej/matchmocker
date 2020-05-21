function generateConfirmationHTMLForAccepter(data) {
  return `<p>Hey ${data.accepter.name}! You have accepted ${data.name}'s request for an interview on ${data.datetime}. Here is the relevant information below:</p>
    <ul>
    <li>Date and Time: ${data.datetime}</li>
    <li>Interview Topic: ${data.topic} </li>
    <li>Video Chat :ink: ${data.zoomlink} </li>
    <li>Google Doc Link: ${data.doclink} </li>
    <li>Interviewee: ${data.name}</li>
    <li>Interviewee Email: ${data.email}</li>

    </ul>
    <br>
    <p>Cheers, </p>
    <p>MatchMocker Team </p>
     
    `;
}

function generateConfirmationHTMLForRequester(data) {
  return `
    <p>Hey ${data.email}! ${data.accepter.name} has accepted your interview request for ${data.datetime}! Here is the relevant information below:</p> 
    <ul>
    <li>Date and Time: ${data.datetime}</li>
    <li>Interview Topic: ${data.topic} </li>
    <li>Video Chat :ink: ${data.zoomlink} </li>
    <li>Google Doc Link: ${data.doclink} </li>
    <li>Interviewer: ${data.accepter.name}</li>
    <li>Interviewer Email: ${data.accepter.email}</li>
    </ul>
    <br>
    <p>Cheers,</p>
    <p>MatchMocker Team</p>
    `;
}

module.exports = {
  generateConfirmationHTMLForRequester,
  generateConfirmationHTMLForAccepter,
};
