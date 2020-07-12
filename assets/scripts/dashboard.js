console.log('Om Namah Shivay!');

$(document).ready(() => {
  $('.add-time').on('click', (e) => logTime($(e.target)));
});

function clearField($textField) {
  $textField.val('');
}

function logTime($button) {
  const $parentContainer = $button.parents('.input-group');
  const $textField = $parentContainer.find('input[type=text]');
  const time = $textField.val().trim();
  const issueKey = $button.data('issuekey');

  if (time == '' || !isTimeValid(time)) {
    toastr.error('Please enter valid input');
    $textField.addClass('is-invalid');
    return;
  } else {
    $textField.removeClass('is-invalid');
  }

  $.ajax({
    url: '/',
    method: 'POST',
    data: JSON.stringify({ issueKey: issueKey, timeSpent: time }),
    contentType: 'application/json',
  })
    .done((response) => {
      if (response.status == 'success') {
        toastr.success(response.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toastr.error(response.message);
      }
    })
    .fail((err) => {
      console.log(err);
      toastr.error(err.responseJSON.message);
    })
    .always(() => {
      clearField($textField);
    });
}

function isTimeValid(time) {
  const unit = time.slice(time.length - 1);
  const value = time.slice(0, -1);

  if (unit == 'd' || unit == 'h' || unit == 'm') {
    return true;
  }
  return false;
}
