console.log('Om Namah Shivay!');

$(document).ready(() => {
  $('.add-time').on('click', (e) => logTime($(e.target)));
  $('.change-transition-button').on('click', (e) =>
    changeTransitionButtonClick($(e.target))
  );
  $('.change-transition').on('click', 'a.dropdown-item', (e) =>
    changeTransition($(e.target))
  );
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
        window.location.reload();
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

function changeTransitionButtonClick($element) {
  const issueKey = $element.parents('.change-transition').data('key');
  $.getJSON('/transitions', { issueKey: issueKey })
    .done((response) => {
      if (response.status == 'success') {
        $(`#dropdownContainer${issueKey} .loader`).css('display', 'none');
        const options = generateOptions(response.data.transitions);
        $(`#dropdownContainer${issueKey}`).html(options);
      } else {
        toastr.error(response.message);
      }
    })
    .fail((err) => {
      toastr.error(err.responseJSON.message);
    });
}

function generateOptions(transitions) {
  const options = [];

  transitions.forEach((t) => {
    options.push(
      `<a class='dropdown-item' href='javascript:void(0)' id=${t.id}>${t.to.name}</a>`
    );
  });

  return options.join('');
}

function changeTransition($element) {
  const id = $element.attr('id');
  const issueKey = $element.parents('.change-transition').data('key');
  $.ajax({
    url: '/transitions',
    method: 'POST',
    data: JSON.stringify({
      issueKey: issueKey,
      transition: {
        id: id,
      },
    }),
    contentType: 'application/json',
  })
    .done((response) => {
      if (response.status == 'success') {
        toastr.success(response.message);
        $element.parent().siblings('.btn').text($element.text());
      } else {
        toastr.error(response.message);
      }
    })
    .fail((err) => {
      toastr.error(err.responseJSON.message);
    });
}
