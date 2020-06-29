console.log("Om Namah Shivay!");

$(document).ready(() => {
    $(".add-time").on("click", (e) => logTime($(e.target)));
});

function logTime($button) {
    const $parentContainer = $button.parents(".input-group");
    const $textField = $parentContainer.find("input[type=text]")
    const time = $textField.val();
    const issueKey = $button.data("issuekey");

    if (time == "" || !isTimeValid(time)) {
        toastr.error("Something is wrong");
        return;
    }

    $.ajax({
        url: "/",
        method: "POST",
        contentType: 'application/json',
        data: JSON.stringify({ issueKey: issueKey, timeSpent: time }),
        success: (response) => {
            if (response.status == 'success') {
                toastr.success(response.message);
            }
            else {
                toastr.error(response.message);
            }

            $textField.val("");
        }
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