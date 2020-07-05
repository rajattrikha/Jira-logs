$(document).ready(() => {
  $('#btn').on('click', (e) => {
    const code = $('#code').val();
    $.ajax({
      url: '/authorize',
      method: 'POST',
      data: JSON.stringify({ oauth_verifier: code }),
      contentType: 'application/json',
    })
      .done((response) => {})
      .fail((err) => {
        console.log(err);
      })
      .always(() => {});
  });
});
