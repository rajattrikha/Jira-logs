console.log("Om Namah Shivay!");

$(document).ready(() => {
  $(".add-time").on("click", (e) => logTime($(e.target)));
});

function clearField($textField) {
  $textField.val("");
}

function logTime($button) {
  const $parentContainer = $button.parents(".input-group");
  const $textField = $parentContainer.find("input[type=text]");
  const time = $textField.val();
  const issueKey = $button.data("issuekey");

  if (time == "" || !isTimeValid(time)) {
    toastr.error("Please enter valid input");
    clearField($textField);
    return;
  }

  $.post("/", { issueKey: issueKey, timeSpent: time })
    .done((response) => {
      if (response.status == "success") {
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
  let isValid = false;
  const unit = time[time.length - 1];
  if (unit == "d" || unit == "h" || unit == "m") {
    isValid = true;
  }
  return isValid;
}
